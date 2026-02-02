// import { CarPageCard } from "../../components/CarPageCard";
// import {ArrowLeft, MessageCircle } from "lucide-react";
// import "../../style/carPage.css";
// import { useNavigate } from "react-router-dom";
// const carsData = [
//   {
//     id: 1,
//     name: "Mercedes S-Class",
//     year: 2023,
//     mileage: "12,000 km",
//     condition: "Brand New",
//     images: [
//       "https://images.unsplash.com/photo-1758216383800-7023ee8ed42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3Njk3Mzg4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1615966996783-5d361a011237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzY5NjkxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1715598147171-12a86aad5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZWFyJTIwdmlld3xlbnwxfHx8fDE3Njk2ODM0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 2,
//     name: "Range Rover Sport",
//     year: 2022,
//     mileage: "25,000 km",
//     condition: "Foreign Used",
//     images: [
//       "https://images.unsplash.com/photo-1758217209786-95458c5d30a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXYlMjB2ZWhpY2xlfGVufDF8fHx8MTc2OTc2ODgwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3aGVlbHN8ZW58MXx8fHwxNzY5NjgxNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1715598147171-12a86aad5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZWFyJTIwdmlld3xlbnwxfHx8fDE3Njk2ODM0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 3,
//     name: "Porsche 911 Carrera",
//     year: 2024,
//     mileage: "8,000 km",
//     condition: "Brand New",
//     images: [
//       "https://images.unsplash.com/photo-1696581084306-591db2e1af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzY5NzE4OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3aGVlbHN8ZW58MXx8fHwxNzY5NjgxNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1752774581629-464238ee6996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBiYXl8ZW58MXx8fHwxNzY5Njc5NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 4,
//     name: "Toyota Camry XLE",
//     year: 2021,
//     mileage: "45,000 km",
//     condition: "Nigerian Used",
//     images: [
//       "https://images.unsplash.com/photo-1708226633190-d5b9fe523b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRveW90YSUyMGNhbXJ5fGVufDF8fHx8MTc2OTc2ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1615966996783-5d361a011237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzY5NjkxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1715598147171-12a86aad5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZWFyJTIwdmlld3xlbnwxfHx8fDE3Njk2ODM0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 5,
//     name: "Honda Accord Sport",
//     year: 2023,
//     mileage: "18,000 km",
//     condition: "Foreign Used",
//     images: [
//       "https://images.unsplash.com/photo-1593545567849-0411b5721b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvbmRhJTIwYWNjb3JkfGVufDF8fHx8MTc2OTc2ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1615966996783-5d361a011237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzY5NjkxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3aGVlbHN8ZW58MXx8fHwxNzY5NjgxNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 6,
//     name: "BMW 5 Series",
//     year: 2022,
//     mileage: "32,000 km",
//     condition: "Foreign Used",
//     images: [
//       "https://images.unsplash.com/photo-1554961650-1dc5eb7030fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwbWVyY2VkZXMlMjBiZW56fGVufDF8fHx8MTc2OTc2ODgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1615966996783-5d361a011237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzY5NjkxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1752774581629-464238ee6996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBiYXl8ZW58MXx8fHwxNzY5Njc5NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 7,
//     name: "BMW X5 M Sport",
//     year: 2023,
//     mileage: "15,000 km",
//     condition: "Brand New",
//     images: [
//       "https://images.unsplash.com/photo-1611249237487-21a5d8b84983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBibXclMjBjYXJ8ZW58MXx8fHwxNzY5NzY4ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3aGVlbHN8ZW58MXx8fHwxNzY5NjgxNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1715598147171-12a86aad5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZWFyJTIwdmlld3xlbnwxfHx8fDE3Njk2ODM0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
//   {
//     id: 8,
//     name: "Nissan Altima SV",
//     year: 2020,
//     mileage: "58,000 km",
//     condition: "Nigerian Used",
//     images: [
//       "https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwbmlzc2FuJTIwc2VkYW58ZW58MXx8fHwxNzY5NzY4ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1710083521061-c1b1701c5d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2NzMyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1615966996783-5d361a011237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzY5NjkxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       "https://images.unsplash.com/photo-1715598147171-12a86aad5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZWFyJTIwdmlld3xlbnwxfHx8fDE3Njk2ODM0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     ],
//   },
// ];

// export default function CarPage() {
//     const navigate = useNavigate()
//   const handleWhatsAppClick = () => {
//     const phoneNumber = "2348133369509";
//     const message = encodeURIComponent("Hello! I'm interested in your vehicles.");
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
//   };

//   return (
//     <div className="carsPage-app">
//       {/* Header */}
//       <header className="carsPage-header">

//         <div className="carsPage-container">
//                <div className="back-home">
//                   <button className="back-home-btn" onClick={() => navigate("/")}>
//                     <ArrowLeft size={20} />
//                     <span>Back to Home</span>
//                   </button>
//                 </div>
//           <h2 className="carsPage-logo">E-BEST</h2>
//           <p className="carsPage-tagline">Premium Automotive Solutions</p>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="carsPage-main">

//         <div className="carsPage-intro">
//           <h2 className="carsPage-title">Our Premium Collection</h2>
//           <p className="carsPage-subtitle">Browse our selection of quality vehicles</p>
//         </div>

//         <div className="carsPage-grid">
//           {carsData.map((car) => (
//             <CarPageCard key={car.id} car={car} />
//           ))}
//         </div>

//         <div className="carsPage-cta">
//           <button
//             onClick={handleWhatsAppClick}
//             className="carsPage-whatsapp-button"
//           >
//             <MessageCircle className="carsPage-whatsapp-icon" />
//             <span>Contact Us on WhatsApp</span>
//           </button>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="carsPage-footer">
//         <div className="carsPage-container">
//           <p>© 2024 E-BEST Automotive Solutions. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router";
import { carsData } from "../../components/CarPageCard";
import { Calendar, Gauge, Settings, Fuel, ChevronLeft } from "lucide-react";
import "../../style/carPage.css";

export default function CarPage() {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const conditionStyles = {
    "Brand New": "carspage-badge-brandnew",
    "Foreign Used": "carspage-badge-foreign",
    "Nigerian Used": "carspage-badge-nigerian",
  };

  return (
    <div className="carspage-container">
      {/* Header */}
      <header className="carspage-header">
        <div className="container goback2">
          <Link to="/" className="back-link">
            <ChevronLeft className="icon" />
            Back to Home
          </Link>
        </div>
        <div className="carspage-header-inner">
          <h1 className="carspage-title">E-BEST</h1>
          <p className="carspage-subtitle">Premium Automotive Collection</p>
        </div>
      </header>

      {/* Cars Grid */}
      <div className="carspage-grid-wrapper">
        <h2 className="carspage-section-title">Available Vehicles</h2>
        <div className="carspage-grid">
          {carsData.map((car) => (
            <div key={car.id} className="carspage-card">
              <div className="carspage-card-image-wrapper">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="carspage-card-image"
                />
                <span
                  className={`carspage-badge ${conditionStyles[car.condition]}`}
                >
                  {car.condition}
                </span>
              </div>
              <div className="carspage-card-content">
                <h3 className="carspage-card-name">{car.name}</h3>
                <p className="carspage-card-brand">
                  {car.brand} • {car.model}
                </p>
                <p className="carspage-card-price">{formatPrice(car.price)}</p>

                <div className="carspage-card-specs">
                  <div className="carspage-spec">
                    <Calendar className="carspage-icon" />
                    <span>{car.year}</span>
                  </div>
                  <div className="carspage-spec">
                    <Gauge className="carspage-icon" />
                    <span>{car.mileage}</span>
                  </div>
                  <div className="carspage-spec">
                    <Settings className="carspage-icon" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="carspage-spec">
                    <Fuel className="carspage-icon" />
                    <span>{car.fuelType}</span>
                  </div>
                </div>
                <Link to={`/cars/${car.id}`} className="carspage-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
