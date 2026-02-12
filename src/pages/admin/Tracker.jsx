import { useEffect, useState } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/Trackers.css";

const Trackers = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // FORM STATE
  const [form, setForm] = useState({
    plan_name: "",
    tracker_price: "",
    dashcam_price: "",
    discount_percent: "",
    promo_badge: "limited offer",
    promo_expiry: "",
    tracker_features: "",
    dashcam_features: "",
    active: true,
  });

  // MODAL STATE
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // ===== FETCH PLANS =====
  const fetchPlans = async () => {
    const { data, error } = await superbase
      .from("trackers_plans")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setPlans(data || []);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        tracker_price: form.tracker_price,
        dashcam_price: form.dashcam_price,
        discount_percent: form.discount_percent || 0,
        promo_badge: form.promo_badge,
        promo_expiry: form.promo_expiry || new Date().toISOString(),
        tracker_features: form.tracker_features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        dashcam_features: form.dashcam_features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        active: form.active,
      };

      if (editingId) {
        await superbase
          .from("trackers_plans")
          .update(payload)
          .eq("id", editingId);

        setModal({
          open: true,
          type: "success",
          message: "Tracker plan updated successfully",
        });
      } else {
        await superbase.from("trackers_plans").insert({
          plan_name: form.plan_name,
          ...payload,
        });

        setModal({
          open: true,
          type: "success",
          message: "Tracker plan created successfully",
        });
      }

      // RESET FORM
      setForm({
        plan_name: "",
        tracker_price: "",
        dashcam_price: "",
        discount_percent: "",
        promo_badge: "limited offer",
        promo_expiry: "",
        tracker_features: "",
        dashcam_features: "",
        active: true,
      });

      setEditingId(null);
      fetchPlans();
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

  // ===== EDIT =====
  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setForm({
      plan_name: plan.plan_name,
      tracker_price: plan.tracker_price,
      dashcam_price: plan.dashcam_price,
      discount_percent: plan.discount_percent,
      promo_badge: plan.promo_badge,
      promo_expiry: plan.promo_expiry,
      tracker_features: plan.tracker_features.join(", "),
      dashcam_features: plan.dashcam_features.join(", "),
      active: plan.active,
    });
  };

  return (
    <div className="admin-trackers">
      <h1>Tracker Plans</h1>

      <div className="tracker-section">
        {/* ===== FORM ===== */}
        <form className="tracker-form" onSubmit={handleSubmit}>
          {!editingId && (
            <select
              value={form.plan_name}
              onChange={(e) => setForm({ ...form, plan_name: e.target.value })}
              required
            >
              <option value="">Select Plan</option>
              <option value="Exclusive">Exclusive</option>
              <option value="Premium">Premium</option>
              <option value="Advanced">Advanced</option>
            </select>
          )}

          <input
            type="number"
            placeholder="Tracker Only Price (₦)"
            value={form.tracker_price}
            onChange={(e) => setForm({ ...form, tracker_price: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Tracker + Dashcam Price (₦)"
            value={form.dashcam_price}
            onChange={(e) => setForm({ ...form, dashcam_price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Discount % (optional)"
            value={form.discount_percent}
            onChange={(e) =>
              setForm({ ...form, discount_percent: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Promo Badge (optional)"
            value={form.promo_badge}
            onChange={(e) => setForm({ ...form, promo_badge: e.target.value })}
          />

          <input
            type="datetime-local"
            placeholder="Promo Expiry (optional)"
            value={form.promo_expiry}
            onChange={(e) => setForm({ ...form, promo_expiry: e.target.value })}
          />

          <textarea
            placeholder="Tracker Features (comma separated)"
            value={form.tracker_features}
            onChange={(e) =>
              setForm({ ...form, tracker_features: e.target.value })
            }
            rows={3}
            required
          />

          <textarea
            placeholder="Dashcam Features (comma separated)"
            value={form.dashcam_features}
            onChange={(e) =>
              setForm({ ...form, dashcam_features: e.target.value })
            }
            rows={3}
          />

          <label>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Active
          </label>

          <button disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
          </button>
        </form>

        {/* ===== LIST BELOW FORM ===== */}
        <div className="tracker-plans">
          {plans.map((plan) => {
            const discountedTrackerPrice =
              plan.discount_percent && plan.discount_percent > 0
                ? Math.round(
                    plan.tracker_price -
                      (plan.tracker_price * plan.discount_percent) / 100
                  )
                : plan.tracker_price;

            const discountedDashcamPrice =
              plan.discount_percent && plan.discount_percent > 0
                ? Math.round(
                    plan.dashcam_price -
                      (plan.dashcam_price * plan.discount_percent) / 100
                  )
                : plan.dashcam_price;

            return (
              <div key={plan.id} className="plan-card">
                <h3>{plan.plan_name}</h3>

                {plan.discount_percent > 0 && plan.promo_badge ? (
                  <p className="promo-badge">
                    {plan.promo_badge.toUpperCase()} - {plan.discount_percent}%
                    OFF
                  </p>
                ) : null}

                <p>
                  <strong>Tracker Only:</strong> ₦{discountedTrackerPrice}
                </p>

                <p>
                  <strong>Tracker + Dashcam:</strong> ₦{discountedDashcamPrice}
                </p>

                <h4>Tracker Features:</h4>
                <ul>
                  {plan.tracker_features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <h4>Dashcam Features:</h4>
                <ul>
                  {plan.dashcam_features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <button onClick={() => handleEdit(plan)}>Edit</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== STATUS MODAL ===== */}
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

export default Trackers;
