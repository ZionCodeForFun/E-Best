import { useState, useEffect, useRef } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/Accessories.css";
const formatNumberWithCommas = (value) => {
  if (!value) return "";
  const number = value.toString().replace(/,/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Accessories = () => {
  const fileInputRef = useRef(null);

  const emptyForm = {
    name: "",
    brand: "",
    type: "",
    price: "",
    lot: "",
    description: "",
    shortDescription: "",
    badge: "",
    dealer_name: "",
    dealer_number: "",
    features: [],
    images: [],
    isSold: false,
  };

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("adminAccessoryForm");
    return saved ? JSON.parse(saved) : emptyForm;
  });

  const [featureInput, setFeatureInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPart, setFilteredPart] = useState([]);
  const [is_sold, setIs_sold] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // Persist form
  useEffect(() => {
    localStorage.setItem("adminAccessoryForm", JSON.stringify(form));
  }, [form]);
  useEffect(() => {
    const lastRun = localStorage.getItem("lastCleanupAccessories");

    const now = new Date().getTime();

    if (!lastRun || now - lastRun > 24 * 60 * 60 * 1000) {
      superbase.rpc("delete_old_sold_accessories");
      localStorage.setItem("lastCleanupAccessories", now);
    }
  }, []);

  // Fetch accessories
  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    const { data, error } = await superbase
      .from("accessories")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (!error) setItems(data || []);
    setFilteredPart(data || []);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    if (!term) {
      setFilteredPart(items);
      return;
    }
    const lower = term.toLowerCase();
    const filtered = items.filter(
      (items) =>
        (items.name && items.name.toLowerCase().includes(lower)) ||
      (items.lot && items.lot.toString().includes(lower)) ||
      (items.dealer_number &&
        items.dealer_number.toLowerCase().includes(lower)),
      );
      setFilteredPart(filtered);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPart.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPart.length / itemsPerPage);
  const uploadImages = async (files) => {
    const urls = [];
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `accessories/${fileName}`;
      const { error } = await superbase.storage
        .from("accessories")
        .upload(filePath, file, { upsert: false });
      if (error) continue;
      const { data } = superbase.storage
        .from("accessories")
        .getPublicUrl(filePath);
      if (data && data.publicUrl) urls.push(data.publicUrl);
    }
    return urls;
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm({
      ...form,
      features: [...(form.features || []), featureInput.trim()],
    });
    setFeatureInput("");
  };

  const removeFeature = (idx) => {
    const newFeatures = [...form.features];
    newFeatures.splice(idx, 1);
    setForm({ ...form, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = form.images.length ? await uploadImages(form.images) : [];

      if (editingId) {
        let finalImages = existingImages;
        if (form.images.length) finalImages = await uploadImages(form.images);

        const { error } = await superbase
          .from("accessories")
          .update({
            ...form,
            price: Number(form.price),
            isSold: is_sold,
            sold_at: is_sold ? new Date().toISOString() : null,
            images: finalImages,
          })
          .eq("id", editingId);
        if (error) throw new Error(error.message);

        setModal({
          open: true,
          type: "success",
          message: "Accessory updated successfully",
        });
      } else {
        if (!form.images.length)
          throw new Error("Please upload at least one image");

        const { error } = await superbase.from("accessories").insert([
          {
            ...form,
            price: Number(form.price),
            isSold: is_sold,
            images: imageUrls || [],
          },
        ]);

        if (error) throw new Error(error.message);

        setModal({
          open: true,
          type: "success",
          message: "Accessory added successfully",
        });
      }

      handleCancel(); // reset all after submit
      fetchAccessories();
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // ===== CANCEL =====
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPreviewImages([]);
    setExistingImages([]);
    setFeatureInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    localStorage.removeItem("adminAccessoryForm");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await superbase
        .from("accessories")
        .update({ deleted_at: new Date().toISOString() }) // soft delete
        .eq("id", deleteId);

      if (error) throw error;

      setDeleteId(null);
      fetchAccessories();
      setModal({
        open: true,
        type: "success",
        message: "Accessory moved to trash",
      });
    } catch (err) {
      console.error(err.message);
      setModal({
        open: true,
        type: "error",
        message: "Failed to delete accessory",
      });
    }
  };

  return (
    <div className="admin-accessories">
      <h1>Accessories Management</h1>
      <input
        type="text"
        placeholder="Search by Lot, Phone or Car Name..."
        value={searchTerm}
        onChange={handleSearch}
        className="car-search"
      />
      <form className="admin-accessories__form" onSubmit={handleSubmit}>
        <input
          placeholder="Accessory Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="">Select Type</option>
          <option value="Electronics">Electronics</option>
          <option value="Safety">Safety</option>
          <option value="Interior">Interior</option>
          <option value="Exterior">Exterior</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          value={formatNumberWithCommas(form.price)}
          placeholder="Price(₦)"
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (!isNaN(rawValue)) {
              setForm({ ...form, price: rawValue });
            }
          }}
          required
        />

        <input
          placeholder="Lot Number (6 digits)"
          value={form.lot}
          onChange={(e) => setForm({ ...form, lot: e.target.value })}
          required
        />
        <input
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Full Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Badge (e.g. Hot, New, Popular)"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
        />
        <input
          placeholder="Dealer's Name (Optional)"
          value={form.dealer_name}
          onChange={(e) => setForm({ ...form, dealer_name: e.target.value })}
        />
        <input
          placeholder="Dealer's Number (Optional)"
          value={form.dealer_number}
          onChange={(e) => setForm({ ...form, dealer_number: e.target.value })}
        />

        {/* Features */}
        <div className="features-input-wrapper">
          <input
            type="text"
            placeholder="Enter feature"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addFeature())
            }
          />
          <button type="button" onClick={addFeature}>
            Add
          </button>
        </div>
        <div className="admin-features-list">
          {Array.isArray(form.features) &&
            form.features.map((f, i) => (
              <span key={i} className="admin-feature-item">
                {f}{" "}
                <button type="button" onClick={() => removeFeature(i)}>
                  ×
                </button>
              </span>
            ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={(e) => {
            const newFiles = Array.from(e.target.files);
            const totalFiles = [...form.images, ...newFiles].slice(0, 5); // limit to 5
            setForm({ ...form, images: totalFiles });
            setPreviewImages(totalFiles.map((f) => URL.createObjectURL(f)));
          }}
        />
        <small>{form.images.length} image(s) selected (max 5)</small>

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
            {loading
              ? "Saving..."
              : editingId
                ? "Update Accessory"
                : "Add Accessory"}
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

      <div className="admin-accessories__list">
        {currentItems.map((item) => (
          <div key={item.id} className="admin-accessories__card">
            <div className="card-content">
              <div className="images">
                {item.images?.map((img, i) => (
                  <img key={i} src={img} alt={`${item.name}-${i}`} />
                ))}
              </div>
              <h2>{item.name}</h2>
              <p>
                <strong>Brand: </strong>
                {item.brand}
              </p>
              <p className="price">{formatPrice(item.price)}</p>
              <p>
                <strong>Dealer's Name: </strong>
                {item.dealer_name ? item.dealer_name : "E-Best"}
              </p>
              <p>
                <strong>Dealer's Number: </strong>
                {item.dealer_number ? item.dealer_number : "08133369509"}
              </p>
              <p>
                <strong>Lot Number: </strong>
                {item.lot}
              </p>
              <p className="type">
                <strong>Type: </strong>
                {item.type}
              </p>
              <p className="badge">
                <strong>badge: </strong>
                {item.badge}
              </p>
              <p className="short-description">
                <strong>Short Discriptions: </strong>
                {item.shortDescription}
              </p>
              <p>
                <strong>Features: </strong>
                {item.features}
              </p>
              <p className="short-description">
                <strong>Full Discriptions: </strong>
                {item.description}
              </p>
              <div className="features-list">
                {Array.isArray(item.features) &&
                  item.features.map((f, i) => <span key={i}>{f}</span>)}
              </div>
            </div>
            <button
              className="edit-btn"
              onClick={() => {
                setEditingId(item.id);
                setForm({ ...item, images: [] });
                setExistingImages(item.images || []);
                setPreviewImages([]);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Edit
            </button>
            <button className="delete-btn" onClick={() => setDeleteId(item.id)}>
              Trash
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Trash Accessory?</h3>
            <p>Accessories will be move to Trash.</p>
            <div className="modal-actions">
              <button className="modal-danger" onClick={confirmDelete}>
                Trash
              </button>
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className={modal.type}>{modal.type.toUpperCase()}</h3>
            <p>{modal.message}</p>
            <button
              className="btn-cancel"
              onClick={() => setModal({ ...modal, open: false })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;
