import { CarCard } from "../../components/CarCard";
import { carsData } from "../../components/CarPageCard";
import { useNavigate } from "react-router-dom";

export function CarsSection() {
  const nav = useNavigate();
  return (
    <section className="cars-section">
      <div className="cars-container">
        <h2 className="section-title">Cars for Sale</h2>
        <div className="cars-grid">
          {carsData.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              images={car.images}
              name={car.name}
              year={car.year}
              price={car.price}
            />
          ))}
        </div>
        <div className="cta-container">
          <button className="view-more-btn" onClick={() => nav("/car-page")}>
            View More Cars
          </button>
        </div>
      </div>
    </section>
  );
}
