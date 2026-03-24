import { useState, useEffect, useRef } from "react";
import { superbase } from "../../SuperbaseClient";
import "../admin/adminStyles/DealerAdmin.css";
import imageCompression from "browser-image-compression";
const DealersAdmin = () => {
  const fileInputRef = useRef(null);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dealersPerPage = 6;
  const emptyForm = {
    name: "",
    email: "",
    phone_number: "",
    state: "",
    city: "",
    address: "",
    country: "Nigeria",
    profile_image: null,
    is_active: true,
  };
  const [formm, setFormm] = useState(() => {
    const saved = localStorage.getItem("dealerForm");
    return saved ? JSON.parse(saved) : emptyForm;
  });
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("dealerForm", JSON.stringify(formm));
  }, [formm]);

  const fetchDealers = async () => {
    try {
      const { data: dealersData, error: dealersError } = await superbase
        .from("dealers")
        .select("*")
        .is("deleted_at", null)
        .order("registered_at", { ascending: false });

      if (dealersError) throw new Error(dealersError.message);

      const dealersWithCounts = await Promise.all(
        dealersData.map(async (dealer) => {
          if (!dealer.phone_number)
            return {
              ...dealer,
              cars_listed: 0,
              accessories_listed: 0,
              total_listed: 0,
            };

          const { count: carsCount } = await superbase
            .from("cars")
            .select("*", { count: "exact", head: true })
            .is("deleted_at", null)
            .eq("dealer_number", dealer.phone_number);

          // Count accessories
          const { count: accessoriesCount } = await superbase
            .from("accessories")
            .select("*", { count: "exact", head: true })
            .is("deleted_at", null)
            .eq("dealer_number", dealer.phone_number);

          return {
            ...dealer,
            cars_listed: carsCount || 0,
            accessories_listed: accessoriesCount || 0,
            total_listed: (carsCount || 0) + (accessoriesCount || 0),
          };
        }),
      );

      setDealers(dealersWithCounts);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching dealers:", err.message);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const uploadImage = async (file) => {
    try {
      // compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const fileName = `${Date.now()}-${file.name.split(".")[0]}.webp`;
      const filePath = `dealers/${fileName}`;

      const { error } = await superbase.storage
        .from("dealers-images")
        .upload(filePath, compressedFile, { upsert: true });

      if (error) throw new Error(error.message);

      const { data } = superbase.storage
        .from("dealers-images")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error("Dealer image compression error:", err);
      throw err;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profileUrl = form.profile_image;
      if (form.profile_image instanceof File) {
        profileUrl = await uploadImage(form.profile_image);
      }

      const payload = {
        name: form.name,
        email: form.email,
        phone_number: form.phone_number,
        state: form.state,
        city: form.city,
        address: form.address,
        country: form.country,
        profile_image: profileUrl,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error } = await superbase
          .from("dealers")
          .update(payload)
          .eq("id", editingId);
        if (error) throw new Error(error.message);
        setMessage({ type: "success", text: "Dealer updated successfully!" });
      } else {
        const { error } = await superbase.from("dealers").insert([payload]);
        if (error) throw new Error(error.message);
        setMessage({ type: "success", text: "Dealer added successfully!" });
      }

      setForm(emptyForm);
      setEditingId(null);
      localStorage.removeItem("dealerForm");

      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchDealers();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (dealer) => {
    setEditingId(dealer.id);

    setForm({
      name: dealer.name || "",
      email: dealer.email || "",
      phone_number: dealer.phone_number || "",
      state: dealer.state || "",
      city: dealer.city || "",
      address: dealer.address || "",
      country: dealer.country || "Nigeria",
      profile_image: dealer.profile_image || null,
      is_active: dealer.is_active ?? true,
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await superbase
        .from("dealers")
        .update({ deleted_at: new Date().toISOString() }) // soft delete
        .eq("id", deleteId);

      if (error) throw new Error(error.message);

      setMessage({ type: "success", text: "Dealer moved to trash!" });
      setDeleteId(null);
      fetchDealers();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };
  const filteredDealers = dealers.filter((dealer) => {
    const query = search.toLowerCase();
    return (
      dealer.name?.toLowerCase().includes(query) ||
      dealer.phone_number?.toLowerCase().includes(query)
    );
  });
  const indexOfLastDealer = currentPage * dealersPerPage;
  const indexOfFirstDealer = indexOfLastDealer - dealersPerPage;
  const currentDealers = filteredDealers.slice(
    indexOfFirstDealer,
    indexOfLastDealer,
  );

  const totalPages = Math.ceil(filteredDealers.length / dealersPerPage);
  return (
    <div className="admin-dealers">
      <h1>Dealers Management</h1>

      <input
        type="text"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="car-search"
      />
      {/* ===== Form ===== */}
      <form className="dealer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dealer Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, profile_image: e.target.files[0] })
          }
        />

        <label className="active-checkbox">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Active
        </label>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Dealer" : "Add Dealer"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="dealer-list">
        {currentDealers.map((dealer) => (
          <div key={dealer.id} className="dealer-card">
            <img
              src={dealer.profile_image || "/default-avatar.png"}
              alt={dealer.name}
              loading="lazy"
              className="dealer-image"
            />
            <h3>{dealer.name}</h3>
            <p>
              <strong>Email</strong>: {dealer.email || "N/A"}
            </p>
            <p>
              <strong>Phone</strong>: {dealer.phone_number}
            </p>
            <p>
              <strong> Location</strong>: {dealer.city}, {dealer.state}
            </p>
            <p>
              <strong>Cars Listed</strong>: {dealer.cars_listed}
            </p>
            <p>
              <strong>Accessories Listed</strong>: {dealer.accessories_listed}
            </p>
            <p>
              <strong>Total Items: {dealer.total_listed}</strong>
            </p>
            <p>
              <strong>Status</strong>:{" "}
              {dealer.is_active ? "Active" : "Inactive"}
            </p>
            <div className="dealer-actions">
              <button onClick={() => handleEdit(dealer)}>Edit</button>
              <button onClick={() => setDeleteId(dealer.id)} className="danger">
                Trash
              </button>
            </div>
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
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: "#c1121f" }}>Comfirm Delete</h3>
            <p>This will be move to Trash</p>

            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                className="dealer-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button className="dealer-danger" onClick={handleDelete}>
                Yes, Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealersAdmin;
