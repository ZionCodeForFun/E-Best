import { useEffect, useState } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/Accessories.css";

const Accessories = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [featureInput, setFeatureInput] = useState("")
  // ===== FORM STATE (PERSISTED) =====
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("adminAccessoryForm");
    return saved
      ? JSON.parse(saved)
      : {
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
  });
  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm(prev => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()],
    }));
    setFeatureInput("");
  };

  // Remove feature
  const removeFeature = (index) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // ===== MODALS =====
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // ===== FETCH =====
  const fetchAccessories = async () => {
    const { data, error } = await superbase
      .from("accessories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setItems(data || []);
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // ===== PERSIST FORM =====
  useEffect(() => {
    localStorage.setItem("adminAccessoryForm", JSON.stringify(form));
  }, [form]);

const uploadImages = async (files) => {
  const urls = [];

  for (let i = 0; i < Math.min(files.length, 5); i++) {
    const file = files[i];
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `accessories/${fileName}`;

    // Upload file
    const { error } = await superbase.storage
      .from("accessories")
      .upload(filePath, file, { upsert: false });
    if (error) continue;

    // Get public URL
    const { data } = superbase.storage
      .from("accessories")
      .getPublicUrl(filePath);

    if (data && data.publicUrl) {
      urls.push(data.publicUrl);
    }
  }

  return urls;
};

  // ===== FORM SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let imageUrls = [];
      if (form.images.length) imageUrls = await uploadImages(form.images);

      if (editingId) {
        // UPDATE
        const { error } = await superbase
          .from("accessories")
          .update({
            name: form.name,
            brand: form.brand,
            type: form.type,
            price: form.price,
            description: form.description,
            shortDescription: form.shortDescription,
            badge: form.badge,
            features: form.features,
            ...(imageUrls.length && { images: imageUrls }),
          })
          .eq("id", editingId);

        if (error) throw error;
        setModal({ open: true, type: "success", message: "Accessory updated successfully" });
      } else {
        // INSERT
        if (!form.images.length) throw new Error("Please upload at least one image");
        const { error } = await superbase.from("accessories").insert([
          {
            name: form.name,
            brand: form.brand,
            type: form.type,
            price: form.price,
            description: form.description,
            shortDescription: form.shortDescription,
            badge: form.badge,
            features: form.features,
            images: imageUrls,
          },
        ]);
        if (error) throw error;
        setModal({ open: true, type: "success", message: "Accessory added successfully" });
      }

      // Reset form
      setForm({
        name: "",
        brand: "",
        type: "",
        price: "",
        description: "",
        shortDescription: "",
        badge: "",
        features: [],
        images: [],
      });
      setEditingId(null);
      localStorage.removeItem("adminAccessoryForm");
      fetchAccessories();
    } catch (err) {
      setModal({ open: true, type: "error", message: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  // ===== DELETE =====
  const confirmDelete = async () => {
    await superbase.from("accessories").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchAccessories();
  };

 
  return (
    <div className="admin-accessories">
      <h1>Accessories Management</h1>

      {/* ===== FORM ===== */}
      <form className="admin-accessories__form" onSubmit={handleSubmit}>
        <input placeholder="Accessory Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
          <option value="">Select Type</option>
          <option value="Electronics">Electronics</option>
          <option value="Safety">Safety</option>
          <option value="Interior">Interior</option>
          <option value="Exterior">Exterior</option>
          <option value="Others">Others</option>
        </select>
        <input type="number" placeholder="Price (₦)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
        <textarea placeholder="Full Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Badge (e.g. Hot, New, popular)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />

        {/* FEATURES */}
        <div className="features-input-wrapper">
        <input
          type="text"
          placeholder="Enter feature (If any)"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFeature();
            }
          }}
        />
        <button type="button" onClick={addFeature}>
          Add
        </button>
      </div>

      <div className="features-list">
        {Array.isArray(form.features) &&
          form.features.map((f, i) => (
            <span key={i} className="feature-item">
              {f}{" "}
              <button type="button" onClick={() => removeFeature(i)}>
                ×
              </button>
            </span>
          ))}
      </div>
      

        <input type="file" multiple accept="image/*" onChange={(e) => setForm({ ...form, images: [...form.images, ...Array.from(e.target.files)].slice(0, 5) })} />
        <small>Upload up to 5 images</small>

        <button disabled={loading}>{loading ? "Saving..." : editingId ? "Update Accessory" : "Add Accessory"}</button>
      </form>

      {/* ===== LIST OF EXISTING ITEMS ===== */}
      <div className="admin-accessories__list">
        {items.map((item) => (
          <div key={item.id} className="admin-accessories__card">
            <div className="images">{item.images?.map((img, i) => (<img key={i} src={img} alt={`${item.name}-${i}`} />))}</div>
            <h4>{item.name}</h4>
            <p>{item.brand}</p>
            <p className="type">{item.type}</p>
            <p className="short-description">{item.shortDescription}</p>
            <p className="badge">{item.badge}</p>
            <div className="features-list">
              {Array.isArray(item.features) && item.features.map((f, i) => <span key={i} className="feature-item">{f}</span>)}
            </div>
            <p className="price">₦{item.price}</p>
            <button className="edit-btn" onClick={() => setEditingId(item.id) & setForm(item)}>Edit</button>
            <button className="delete-btn" onClick={() => setDeleteId(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* ===== DELETE MODAL ===== */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Accessory?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={confirmDelete}>Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== STATUS MODAL ===== */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className={modal.type}>{modal.type.toUpperCase()}</h3>
            <p>{modal.message}</p>
            <button className="btn-cancel" onClick={() => setModal({ ...modal, open: false })}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;
