import { useState, useEffect, useRef } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/car.css";
const formatNumberWithCommas = (value) => {
  if (!value) return "";
  const number = value.toString().replace(/,/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Cars = () => {
  const fileInputRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [message, setMessage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [is_sold, setIs_sold] = useState(false);

  const emptyForm = {
    name: "",
    price: "",
    year: "",
    mileage: "",
    lot: "",
    brand: "",
    color: "",
    transmission: "",
    fuel: "",
    condition: "",
    location: "",
    features: "",
    dealer_number: "",
    dealer_name: "",
    images: [],
    isSold: false,
  };

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("adminCarForm");
    return saved ? JSON.parse(saved) : emptyForm;
  });
  useEffect(() => {
    const lastRun = localStorage.getItem("lastCleanup");

    const now = new Date().getTime();

    if (!lastRun || now - lastRun > 24 * 60 * 60 * 1000) {
      superbase.rpc("delete_old_sold_cars");
      localStorage.setItem("lastCleanup", now);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminCarForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data, error } = await superbase
      .from("cars")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (!error) setCars(data || []);
    setFilteredCars(data || []);
  };
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setFilteredCars(cars);
      return;
    }

    const lower = term.toLowerCase();
    const filtered = cars.filter(
      (car) =>
        (car.name && car.name.toLowerCase().includes(lower)) ||
        (car.lot && car.lot.toString().includes(lower)) ||
        (car.dealer_number && car.dealer_number.toLowerCase().includes(lower)),
    );
    setFilteredCars(filtered);
  };

  const uploadImages = async (files) => {
    const urls = [];
    for (let i = 0; i < Math.min(files.length, 10); i++) {
      const file = files[i];
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `cars/${fileName}`;
      const { error } = await superbase.storage
        .from("cars-images")
        .upload(filePath, file, { upsert: false });
      if (error) continue;
      const { data } = superbase.storage
        .from("cars-images")
        .getPublicUrl(filePath);
      if (data && data.publicUrl) urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = form.images.length
        ? await uploadImages(form.images)
        : null;

      if (editingId) {
        let finalImages = existingImages;
        if (form.images.length) finalImages = await uploadImages(form.images);

        const { error } = await superbase
          .from("cars")
          .update({
            ...form,
            price: Number(form.price),
            isSold: is_sold,
            sold_at: is_sold ? new Date().toISOString() : null,
            images: finalImages,
          })
          .eq("id", editingId);
        if (error) throw new Error(error.message);
        setMessage({ type: "success", text: "Car updated successfully!" });
      } else {
        const { error } = await superbase.from("cars").insert([
          {
            ...form,
            price: Number(form.price),
            isSold: is_sold,
            images: imageUrls || [],
          },
        ]);

        if (error) throw new Error(error.message);
        setMessage({ type: "success", text: "Car added successfully!" });
      }

      // Reset form
      setForm(emptyForm);
      setEditingId(null);
      setExistingImages([]);
      setPreviewImages([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      localStorage.removeItem("adminCarForm");
      await fetchCars();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  const handleEdit = (car) => {
    setEditingId(car.id);
    setForm({ ...car, images: [] });
    setExistingImages(car.images || []);
    setPreviewImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async () => {
    if (!deleteCarId) return;

    try {
      const { error } = await superbase
        .from("cars")
        .update({ deleted_at: new Date().toISOString() }) // soft delete
        .eq("id", deleteCarId);

      if (error) throw new Error(error.message);

      setMessage({ type: "success", text: "Car moved to trash!" });
      setDeleteCarId(null);
      fetchCars(); // refresh the list
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setExistingImages([]);
    setPreviewImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    localStorage.removeItem("adminCarForm");
  };

  return (
    <div className="admin-cars">
      <h1>Cars Management</h1>
      <input
        type="text"
        placeholder="Search by Lot, Phone or Car Name..."
        value={searchTerm}
        onChange={handleSearch}
        className="car-search"
      />
      <form className="car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Car Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Brand / Model"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price (₦)"
          value={formatNumberWithCommas(form.price)}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (!isNaN(rawValue)) {
              setForm({ ...form, price: rawValue });
            }
          }}
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Mileage"
          value={form.mileage}
          onChange={(e) => setForm({ ...form, mileage: e.target.value })}
        />
        <input
          type="number"
          placeholder="Lot Number(6 digits)"
          value={form.lot}
          onChange={(e) => setForm({ ...form, lot: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />

        <select
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
          required
        >
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <select
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          required
        >
          <option value="">Select Condition</option>
          <option value="Brand New">Brand New</option>
          <option value="Foreign Used">Foreign Used</option>
          <option value="Nigerian Used">Nigerian Used</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          value={form.fuel}
          onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <textarea
          placeholder="Features / Description"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dealer's Name (Optional)"
          value={form.dealer_name}
          onChange={(e) => setForm({ ...form, dealer_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dealer's Number (Optional)"
          value={form.dealer_number}
          onChange={(e) => setForm({ ...form, dealer_number: e.target.value })}
        />
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={(e) => {
            const newFiles = Array.from(e.target.files);
            const totalFiles = [...form.images, ...newFiles].slice(0, 10);
            setForm({ ...form, images: totalFiles });
            setPreviewImages(totalFiles.map((f) => URL.createObjectURL(f)));
          }}
        />
        <small>{form.images.length} image(s) selected (max 10)</small>
        <label className="sold-checkbox">
          <input
            type="checkbox"
            checked={is_sold}
            onChange={(e) => setIs_sold(e.target.checked)}
          />
          Mark as Sold
        </label>

        <div className="image-previews">
          {previewImages.map((src, idx) => (
            <div key={idx} className="preview-wrapper">
              <img src={src} alt={`preview-${idx}`} />
              <button
                type="button"
                onClick={() => {
                  const newFiles = [...form.images];
                  newFiles.splice(idx, 1);
                  setForm({ ...form, images: newFiles });

                  const newPreviews = [...previewImages];
                  newPreviews.splice(idx, 1);
                  setPreviewImages(newPreviews);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Car" : "Add Car"}
          </button>
          <button
            type="button"
            className="posting-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="car-list">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="card-content">
              <div className="car-images">
                {car.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${car.name}-${idx}`} />
                ))}
              </div>
              <h3>{car.name}</h3>
              <p>
                <strong>Brand:</strong> {car.brand}
              </p>
              <p className="price">{formatPrice(car.price)}</p>
              <div>
                <p>
                  <strong>Dealer's Name: </strong>
                  {car.dealer_name ? car.dealer_name : "E-Best"}
                </p>
                <p>
                  <strong>Dealer's Number: </strong>
                  {car.dealer_number ? car.dealer_number : "08133369509"}
                </p>
                <p>
                  <strong>Year: </strong>
                  {car.year}
                </p>
                <p>
                  <strong>Lot Number: </strong>
                  {car.lot}
                </p>
                <p>
                  <strong>Transmission: </strong>
                  {car.transmission}
                </p>
                <p>
                  <strong>Mileage: </strong>
                  {car.mileage}
                </p>
                <p>
                  <strong>Fuel Type: </strong>
                  {car.fuel}
                </p>
                <p>
                  <strong>color: </strong>
                  {car.color}
                </p>

                <p></p>
                <strong>Description: </strong>
                {car.features}
              </div>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(car)}>Edit</button>
              <button className="danger" onClick={() => setDeleteCarId(car.id)}>
                Trash
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRM */}
      {deleteCarId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Trash Car?</h3>
            <p>Car wwill be Move to trash.</p>
            <div className="modal-actions">
              <button className="modal-danger" onClick={handleDelete}>
                Trash
              </button>
              <button
                className="btn-cancel"
                onClick={() => setDeleteCarId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGE MODAL */}
      {message && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className={message.type}>{message.type.toUpperCase()}</h3>
            <p>{message.text}</p>
            <button className="btn-cancel" onClick={() => setMessage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
