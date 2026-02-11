import { useState, useEffect } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/car.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("adminCarForm");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          price: "",
          year: "",
          mileage: "",
          brand: "",
          color: "",
          transmission: "",
          fuel: "",
          condition: "",
          location: "",
          features: "",
          images: [],
        };
  });

  const [editingId, setEditingId] = useState(null);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [message, setMessage] = useState(null); // {type: 'success'|'error', text: ''}

  // Persist form while typing
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
      .order("created_at", { ascending: false });

    if (error) console.error(error.message);
    else setCars(data);
  };

  const uploadImages = async (files) => {
    const uploadedUrls = [];
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `cars/${fileName}`;

      const { error } = await superbase.storage
        .from("cars-images")
        .upload(filePath, file, { upsert: false });

      if (error) {
        console.error("Upload error:", error.message);
        continue;
      }

      const { data } = superbase.storage
        .from("cars-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }
    return uploadedUrls;
  };

  // Add / Update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = form.images.length ? await uploadImages(form.images) : null;

      if (editingId) {
        const { error } = await superbase
          .from("cars")
          .update({
            ...form,
            ...(imageUrls && { images: imageUrls }),
          })
          .eq("id", editingId);

        if (error) throw new Error(error.message);

        setMessage({ type: "success", text: "Car updated successfully!" });
      } else {
        const { error } = await superbase.from("cars").insert([
          {
            ...form,
            images: imageUrls || [],
          },
        ]);

        if (error) throw new Error(error.message);

        setMessage({ type: "success", text: "Car added successfully!" });
      }

      // Reset form
      const emptyForm = {
        name: "",
        price: "",
        year: "",
        mileage: "",
        brand: "",
        color: "",
        transmission: "",
        fuel: "",
        condition: "",
        location: "",
        features: "",
        images: [],
      };
      setForm(emptyForm);
      localStorage.removeItem("adminCarForm");
      setEditingId(null);
      await fetchCars();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Edit handler
  const handleEdit = (car) => {
    setEditingId(car.id);
    setForm({
      name: car.name,
      price: car.price,
      year: car.year,
      mileage: car.mileage,
      brand: car.brand,
      color: car.color,
      transmission: car.transmission,
      fuel: car.fuel,
      condition: car.condition,
      location: car.location,
      features: car.features,
      images: [],
    });
  };

  // Delete handler
  const handleDelete = async () => {
    if (!deleteCarId) return;
    try {
      const { error } = await superbase.from("cars").delete().eq("id", deleteCarId);
      if (error) throw new Error(error.message);

      setMessage({ type: "success", text: "Car deleted successfully!" });
      setDeleteCarId(null);
      await fetchCars();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="admin-cars">
      <h1>Cars Management</h1>

      {/* FORM */}
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
          type="number"
          placeholder="Price (₦)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          type="text"
          placeholder="Mileage"
          value={form.mileage}
          onChange={(e) => setForm({ ...form, mileage: e.target.value })}
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
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setForm({
              ...form,
              images: [...form.images, ...Array.from(e.target.files)].slice(0, 5),
            })
          }
        />
        <small>Select up to 5 images</small>

        <button disabled={loading}>{loading? "Saving..." :editingId ? "Update Car" : "Add Car"}</button>
      </form>

      {/* LIST */}
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-images">
              {car.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${car.name}-${idx}`} />
              ))}
            </div>
            <h3>{car.name}</h3>
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p className="price">₦{car.price}</p>
            <p>
              {car.year} | {car.mileage} | {car.color} | {car.transmission} |{" "}
              {car.fuel}
            </p>
            <p>{car.features}</p>

            <div className="actions">
              <button onClick={() => handleEdit(car)}>Edit</button>
              <button className="danger" onClick={() => setDeleteCarId(car.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteCarId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Car?</h3>
            <p>
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn-cancel" onClick={() => setDeleteCarId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS / ERROR MODAL */}
      {message && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className={message.type === "success" ? "success" : "error"}>
              {message.type === "success" ? "Success" : "Error"}
            </h3>
            <p>{message.text}</p>
            <button className="btn-cancel" onClick={() => setMessage(null)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
