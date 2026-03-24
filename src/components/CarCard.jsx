
import { ImageCarousel } from "./ImageCaousel";
import { useNavigate } from "react-router-dom";
import "../style/cta.css";

export function CarCard({ images, name, year, price, id, is_sold }) {
  const navigate = useNavigate();
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
    <div className={`car-card ${is_sold ? "sold" : ""}`}>
      <div className="car-card-image">
        <ImageCarousel images={imageArray} />
        {is_sold && (
          <div className="sold-overlay">
            <span>SOLD</span>
          </div>
        )}
      </div>

      <div className="car-card-content">
        <h3 className="car-name">{name}</h3>
        <p className="car-year">{year}</p>
        <p className="car-price">{formatPrice(price)}</p>

        <div className="car-card-actions">
          <button
            className={`car-card-cta-primary ${is_sold ? "btn-disabled" : ""}`}
            onClick={() => navigate(`/cars/${id}`)}
            disabled={is_sold}
          >
            {is_sold ? "Unavailable" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
}