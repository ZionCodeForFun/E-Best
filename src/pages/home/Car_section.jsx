// import React from "react";
// import "../../style/car-section.css";
// const Car_section = () => {
//   return (
//     <div className="car-section-container">
//       <article className="wrapper">
//         <section className="car-section-title">
//           <h2>Featured cars for sale</h2>
//         </section>
//         <section className="car-section-holder">
//           <div className="card">
//             <div className="img-holder">
//               {" "}
//               <img
//                 src="data:image/jpeg;base64,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"
//                 alt=""
//               />
//             </div>
//             <div className="car-infor-holder">
//               <h5>₦20,000,000</h5>
//               <div className="car-name-holder">
//                 <p>
//                   Toyota corolla<span>|</span>2025
//                 </p>

//                 <button>View Details</button>
//               </div>
//             </div>

//           </div>
//         </section>
//         <div className="veiw-more-holder">
//           <button>View More Cars</button>
//         </div>
//       </article>
//     </div>
//   );
// };

// export default Car_section;
import { CarCard } from "../../components/CarCard";

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
  return (
    <section className="cars-section">
      <div className="cars-container">
        <h1 className="section-title">Cars for Sale</h1>
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
          <button className="view-more-btn">View More Cars</button>
        </div>
      </div>
    </section>
  );
}
