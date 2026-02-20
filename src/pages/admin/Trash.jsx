import { useState, useEffect } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/Trash.css";

const Trash = () => {
  const [trashedDealers, setTrashedDealers] = useState([]);
  const [trashedCars, setTrashedCars] = useState([]);
  const [trashedAccessories, setTrashedAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [restoreId, setRestoreId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTable, setDeleteTable] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchTrash = async () => {
    setLoading(true);

    try {
      const [dealers, cars, accessories] = await Promise.all([
        superbase
          .from("dealers")
          .select("*")
          .not("deleted_at", "is", null)
          .order("deleted_at", { ascending: false }),

        superbase
          .from("cars")
          .select("*")
          .not("deleted_at", "is", null)
          .order("deleted_at", { ascending: false }),

        superbase
          .from("accessories")
          .select("*")
          .not("deleted_at", "is", null)
          .order("deleted_at", { ascending: false }),
      ]);

      setTrashedDealers(dealers.data || []);
      setTrashedCars(cars.data || []);
      setTrashedAccessories(accessories.data || []);
    } catch (err) {
      console.error("Error fetching trash:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (table, id) => {
    const { error } = await superbase
      .from(table)
      .update({ deleted_at: null })
      .eq("id", id);
    if (error) console.error(error.message);
    else fetchTrash();
    setRestoreId(null);
  };

  const handlePermanentDelete = async () => {
    if (!deleteId || !deleteTable) return;
    const { error } = await superbase
      .from(deleteTable)
      .delete()
      .eq("id", deleteId);
    if (error) console.error(error.message);
    else fetchTrash();
    setDeleteId(null);
    setDeleteTable(null);
  };

  // Pagination helpers
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  const allCards = [
    ...trashedDealers.map((item) => ({ ...item, type: "dealer" })),
    ...trashedCars.map((item) => ({ ...item, type: "car" })),
    ...trashedAccessories.map((item) => ({ ...item, type: "accessory" })),
  ];

  const paginatedCards = paginate(allCards);

  return (
    <div className="trash-page">
      <h1>Trash</h1>
      {loading ? (
        <p>Loading...</p>
      ) : allCards.length === 0 ? (
        <p>Trash is empty</p>
      ) : (
        <>
          <div className="trash-grid">
            {paginatedCards.map((card) => (
              <div key={`${card.type}-${card.id}`} className="trash-card">
                <h3>{card.name || "No Name"}</h3>

                <p>
                  <strong>Type:</strong> {card.type}
                </p>

                {/* PHONE OR LOT */}
                <p>
                  <strong>
                    {card.type === "dealer"
                      ? "Phone Number:"
                      : card.type === "car"
                        ? "Lot Number:"
                        : "Item ID:"}
                  </strong>{" "}
                  {card.phone_number || card.lot || card.id}
                </p>

                {/* IMAGE DISPLAY */}
                {card.image_url && (
                  <img
                    src={card.image_url}
                    alt={card.name}
                    className="trash-image"
                  />
                )}

                {/* MULTIPLE IMAGES (for cars if you stored array) */}
                {card.images && Array.isArray(card.images) && (
                  <div className="trash-image-group">
                    {card.images.map((img, i) => (
                      <img key={i} src={img} alt="car" />
                    ))}
                  </div>
                )}

                {/* EXTRA DETAILS */}
                {card.price && (
                  <p>
                    <strong>Price:</strong> ₦{card.price}
                  </p>
                )}
                {card.brand && (
                  <p>
                    <strong>Brand:</strong> {card.brand}
                  </p>
                )}

                {/* DELETE DATE */}
                {card.deleted_at && (
                  <p>
                    <strong>Deleted:</strong>{" "}
                    {new Date(card.deleted_at).toLocaleDateString()}
                  </p>
                )}

                <div className="trash-actions">
                  <button
                    onClick={() =>
                      setRestoreId({
                        table:
                          card.type === "dealer"
                            ? "dealers"
                            : card.type === "car"
                              ? "cars"
                              : "accessories",
                        id: card.id,
                      })
                    }
                  >
                    Restore
                  </button>

                  <button
                    className="danger"
                    onClick={() => {
                      setDeleteId(card.id);
                      setDeleteTable(
                        card.type === "dealer"
                          ? "dealers"
                          : card.type === "car"
                            ? "cars"
                            : "accessories",
                      );
                    }}
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages(allCards) > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages(allCards)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages(allCards)))
                }
                disabled={currentPage === totalPages(allCards)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Restore Modal */}

      {restoreId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to restore this item?</p>
            <button
              onClick={() => handleRestore(restoreId.table, restoreId.id)}
            >
              Yes, Restore
            </button>
            <button className="btn-cancel" onClick={() => setRestoreId(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Permanent Delete Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to permanently delete this item?</p>
            <button onClick={handlePermanentDelete}>Yes, Delete</button>
            <button className="btn-cancel" onClick={() => setDeleteId(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trash;
