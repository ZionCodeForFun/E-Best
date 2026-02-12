import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CarCard } from "../../components/CarCard";
import { GetCars } from "../../components/api/Cars";
import { useNavigate } from "react-router-dom";
import "../../style/skeleton.css";
export function CarsSection() {
  const { cars, loading } = GetCars();
  const nav = useNavigate();
  const randomCars = [...cars].sort(() => 0.5 - Math.random()).slice(0, 4);

  if (loading) {
    return (
      <section className="cars-section">
        <div className="cars-container">
          <div className="cars-top-title">
            <div
              className="skeleton-heading"
              style={{ width: "300px", height: "32px", marginBottom: "12px" }}
            ></div>
            <div className="skeleton-tagline" style={{ width: "400px" }}></div>
          </div>
          <div className="product-cards-skeleton" style={{ marginTop: "2rem" }}>
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="product-card-skeleton">
                <div className="skeleton-image-wrapper"></div>
                <div className="skeleton-card-content">
                  <div className="skeleton-card-title"></div>
                  <div className="skeleton-card-subtitle"></div>
                  <div className="skeleton-card-price"></div>
                  <div className="skeleton-card-buttons">
                    <div className="skeleton-btn"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cars-section">
      <div className="cars-container">
        <div className="cars-top-title">
          <h2 className="section-title">Our Automotive Collection</h2>
          <p className="car-section-subtitle">
            Browse quality automobiles available for immediate purchase,
            carefully selected to match your needs and budget.
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
            View Automobile Inventory
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
