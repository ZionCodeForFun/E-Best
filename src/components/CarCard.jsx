import { ImageCarousel } from "./ImageCaousel";
import { useNavigate } from "react-router-dom";
export function CarCard({ images, name, year, price, id }) {
  const navigate = useNavigate();
  return (
    <div className="car-card">
      <div className="car-card-image">
        <ImageCarousel images={images} />
      </div>
      <div className="car-card-content">
        <h3 className="car-name">{name}</h3>
        <p className="car-year">{year}</p>
        <p className="car-price">{price}</p>
        <button
          className="view-details-btn"
          onClick={() => navigate(`/cars/${id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
