import { useState, useEffect, useRef } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/Accessories.css";

const Accessories = () => {
  const fileInputRef = useRef(null);

  const emptyForm = {
    name: "",
    brand: "",
    type: "",
    price: "",
    description: "",
    shortDescription: "",
    badge: "",
    features: [],
    images: [],
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
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // Persist form
  useEffect(() => {
    localStorage.setItem("adminAccessoryForm", JSON.stringify(form));
  }, [form]);

  // Fetch accessories
  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    const { data, error } = await superbase
      .from("accessories")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems(data || []);
  };

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

  // ===== FEATURE HANDLERS =====
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

  // ===== SUBMIT =====
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
          .update({ ...form, images: finalImages })
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
            images: imageUrls,
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

  // ===== DELETE =====
  const confirmDelete = async () => {
    if (!deleteId) return;
    await superbase.from("accessories").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchAccessories();
  };

  return (
    <div className="admin-accessories">
      <h1>Accessories Management</h1>

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
          type="number"
          placeholder="Price (₦)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
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

        {/* Image Upload */}
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

        {/* Preview */}
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
          <button type="button" className="posting-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      {/* List */}
      <div className="admin-accessories__list">
        {items.map((item) => (
          <div key={item.id} className="admin-accessories__card">
            <div className="images">
              {item.images?.map((img, i) => (
                <img key={i} src={img} alt={`${item.name}-${i}`} />
              ))}
            </div>
            <h4>{item.name}</h4>
            <p>{item.brand}</p>
            <p className="type">{item.type}</p>
            <p className="short-description">{item.shortDescription}</p>
            <p className="badge">{item.badge}</p>
            <div className="features-list">
              {Array.isArray(item.features) &&
                item.features.map((f, i) => <span key={i}>{f}</span>)}
            </div>
            <p className="price">₦{item.price}</p>
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
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Accessory?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUS MODAL */}
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
