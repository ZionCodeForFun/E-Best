import { ImageCarousel } from "./ImageCaousel";
import { useNavigate } from "react-router-dom";
import "../style/cta.css";
export function CarCard({ images, name, year, price, id }) {
  const navigate = useNavigate();
  let imageArray = [];

  if (Array.isArray(images)) {
    imageArray = images;
  } else if (typeof images === "string") {
    try {
      imageArray = JSON.parse(images); // handles JSON string
    } catch {
      imageArray = [images]; // single image fallback
    }
  }

  return (
    <div className="car-card">
      <div className="car-card-image">
        <ImageCarousel images={imageArray} />
      </div>
      <div className="car-card-content">
        <h3 className="car-name">{name}</h3>
        <p className="car-year">{year}</p>
        <p className="car-price">₦{price}</p>
        <div className="car-card-actions">
          <button
            className="car-card-cta-primary"
            onClick={() => navigate(`/cars/${id}`)}
          >
            View Details
          </button>
          <button
            className="car-card-cta-secondary"
            onClick={() => {
              const message = `Hello, I am interested in the vehicle: ${name}. Could you provide more details?`;
              const whatsappURL = `https://wa.me/+2348133369509?text=${encodeURIComponent(
                message,
              )}`;
              window.open(whatsappURL, "_blank");
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
