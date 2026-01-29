import { ImageCarousel } from "./ImageCaousel";

export function CarCard({ images, name, year, price }) {
  return (
    <div className="car-card">
      <div className="car-card-image">
        <ImageCarousel images={images} />
      </div>
      <div className="car-card-content">
        <h3 className="car-name">{name}</h3>
        <p className="car-year">{year}</p>
        <p className="car-price">{price}</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
}
