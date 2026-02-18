import { ImageCarousel } from "./ImageCaousel";
import { useNavigate } from "react-router-dom";
import "../style/cta.css";
import ContactModal from "./ContactModal";
import { useState } from "react";
export function CarCard({ images, name, year, price, id }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  let imageArray = [];

  if (Array.isArray(images)) {
    imageArray = images;
  } else if (typeof images === "string") {
    try {
      imageArray = JSON.parse(images);
    } catch {
      imageArray = [images]; 
    }
  }
   const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="car-card">
      <div className="car-card-image">
        <ImageCarousel images={imageArray} />
      </div>
      <div className="car-card-content">
        <h3 className="car-name">{name}</h3>
        <p className="car-year">{year}</p>
        <p className="car-price">{formatPrice(price)}</p>
        <div className="car-card-actions">
          <button
            className="car-card-cta-primary"
            onClick={() => navigate(`/cars/${id}`)}
          >
            View Details
          </button>
          <button
            className="car-card-cta-secondary"
            onClick={() => setModalOpen(true)}
          >
            Contact Us
          </button>
        </div>
        <ContactModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          phone="+2348133369509"
        />
      </div>
    </div>
  );
}
