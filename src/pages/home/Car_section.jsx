
import { CarCard } from "../../components/CarCard";
import { useNavigate } from "react-router-dom";
const carsData = [
  {
    id: 1,
    name: "Ferrari F8 Tributo",
    year: 2024,
    price: "₦20,000,000",
    images: [
      "https://images.unsplash.com/photo-1553985214-1c3f33cf3ecb?w=800",
      "https://images.unsplash.com/photo-1634053685988-f9125b725aa5?w=800",
      "https://images.unsplash.com/photo-1752774581629-464238ee6996?w=800",
      "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?w=800",
      "https://images.unsplash.com/photo-1696581081894-6c0561d88743?w=800",
    ],
  },
  {
    id: 2,
    name: "Mercedes-Benz S-Class",
    year: 2024,
    price: "₦20,700,000",
    images: [
      "https://images.unsplash.com/photo-1648197323414-4255ea82d86b?w=800",
      "https://images.unsplash.com/photo-1748214311838-576a62d44c7d?w=800",
      "https://images.unsplash.com/photo-1634053685988-f9125b725aa5?w=800",
      "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?w=800",
      "https://images.unsplash.com/photo-1752774581629-464238ee6996?w=800",
    ],
  },
  {
    id: 3,
    name: "Range Rover Sport",
    year: 2024,
    price: "₦20,700,000",
    images: [
      "https://images.unsplash.com/photo-1591412477476-21f0d23ff150?w=800",
      "https://images.unsplash.com/photo-1748214311838-576a62d44c7d?w=800",
      "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?w=800",
      "https://images.unsplash.com/photo-1752774581629-464238ee6996?w=800",
      "https://images.unsplash.com/photo-1634053685988-f9125b725aa5?w=800",
    ],
  },
  {
    id: 4,
    name: "Porsche 911 GT3",
    year: 2024,
    price: "₦20,700,000",
    images: [
      "https://images.unsplash.com/photo-1753899762863-af6e21e86438?w=800",
      "https://images.unsplash.com/photo-1634053685988-f9125b725aa5?w=800",
      "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?w=800",
      "https://images.unsplash.com/photo-1752774581629-464238ee6996?w=800",
      "https://images.unsplash.com/photo-1696581081894-6c0561d88743?w=800",
    ],
  },
];

export function CarsSection() {
  const nav = useNavigate()
  return (
    <section className="cars-section">
      <div className="cars-container">
        <h2 className="section-title">Cars for Sale</h2>
        <div className="cars-grid">
          {carsData.map((car) => (
            <CarCard
              key={car.id}
              images={car.images}
              name={car.name}
              year={car.year}
              price={car.price}
            />
          ))}
        </div>
        <div className="cta-container">
          <button className="view-more-btn" onClick={()=>nav('/car-page')}>View More Cars</button>
        </div>
      </div>
    </section>
  );
}
