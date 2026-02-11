import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CarCard } from "../../components/CarCard";
import { GetCars } from "../../components/api/Cars";
import { useNavigate } from "react-router-dom";
export function CarsSection() {
  const { cars, loading } = GetCars();
  const nav = useNavigate();
  const randomCars = [...cars].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <section className="cars-section">
      <div className="cars-container">
        <div className="cars-top-title">
          <h2 className="section-title">Our Automotive Collection</h2>
        <p className="car-section-subtitle">
          Browse quality automobiles available for immediate purchase, carefully
          selected to match your needs and budget.
        </p>
        </div>
        <div className="cars-grid">
          {randomCars.map((car) => (
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
            View Automobile Inventory<MdKeyboardDoubleArrowRight  />
          </button>
        </div>
      </div>
    </section>
  );
}
