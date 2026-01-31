import { useParams, Link } from "react-router";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Gauge,
  Calendar,
  Fuel,
  Settings,
  MessageCircle,
  ClipboardCheck,
  Check,
  X,
  AirVent,
  Armchair,
  Camera,
  Circle,
  Power,
  Bluetooth,
  Sun,
  Flame,
} from "lucide-react";
import { getCarById } from '../../components/CarPageCard';
import "../../style/carDetails.css";

const iconMap = {
  "air-vent": AirVent,
  armchair: Armchair,
  camera: Camera,
  circle: Circle,
  power: Power,
  bluetooth: Bluetooth,
  sun: Sun,
  flame: Flame,
};

export default function CarDetailsPage() {
  const { carId } = useParams();
  const car = carId ? getCarById(carId) : undefined;
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!car) {
    return (
      <div className="not-found">
        <h1>Car Not Found</h1>
        <Link to="/car-page" className="btn btn-primary">Back to Cars</Link>
      </div>
    );
  }

  const conditionClasses = {
    "Brand New": "badge-brand-new",
    "Foreign Used": "badge-foreign-used",
    "Nigerian Used": "badge-nigerian-used",
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: (i) => <button className="slider-dot">{i + 1}</button>,
  };

  const whatsappLink = `https://wa.me/2348133369509?text=${encodeURIComponent(
    `Hello, I'm interested in the ${car.name} (ID: ${car.id}).`
  )}`;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

  return (
    <div className="car-details-page">
      {/* Header */}
      <header className="car-header">
        <div className="container">
          <Link to="/car-page" className="back-link">
            <ChevronLeft className="icon" />
            Back to Cars
          </Link>
        </div>
      </header>

      {/* Image Slider */}
      <section className="car-slider">
        <Slider {...sliderSettings}>
          {car.images.map((img, idx) => (
            <div key={idx} className="slide">
              <img src={img} alt={`${car.name} ${idx + 1}`} />
            </div>
          ))}
        </Slider>
        <span className={`car-badge ${conditionClasses[car.condition]}`}>{car.condition}</span>
      </section>

      {/* Main Content */}
      <div className="container main-content">
        <div className="grid-two-columns">
          {/* Left Column */}
          <div>
            <h1 className="car-name">{car.name}</h1>
            <p className="car-brand">{car.brand} • {car.model}</p>

            {/* Quick Specs */}
            <div className="car-specs-grid">
              <Spec icon={<Calendar />} label="Year" value={car.year} />
              <Spec icon={<Gauge />} label="Mileage" value={car.mileage} />
              <Spec icon={<Settings />} label="Transmission" value={car.transmission} />
              <Spec icon={<Fuel />} label="Fuel Type" value={car.fuelType} />
              <Spec icon={<MapPin />} label="Location" value={car.location} />
            </div>
          </div>

          {/* Right Column */}
          <div className="price-card">
            <p className="price-label">Price</p>
            <p className="price-value">{formatPrice(car.price)}</p>

            <div className="card-buttons">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="icon" /> Contact on WhatsApp
              </a>
              <button className="btn btn-outline">
                <ClipboardCheck className="icon" /> Book Inspection
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="card-section">
          <h2>Vehicle Description</h2>
          <p>{car.description}</p>
        </section>

        {/* Key Features */}
        <section className="card-section">
          <h2>Key Features</h2>
          <div className="car-features">
            {car.features.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div key={i} className={`feature-card ${f.enabled ? "enabled" : "disabled"}`}>
                  {Icon && <Icon className="icon" />}
                  <span>{f.name}</span>
                  {f.enabled ? <Check className="icon-check" /> : <X className="icon-x" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* Specifications Table */}
        <section className="card-section">
          <h2>Specifications</h2>
          <table className="spec-table">
            <tbody>
              {Object.entries(car.specifications).map(([key, value], i) => value && (
                <tr key={i}>
                  <td>{formatKey(key)}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Safety Checks */}
        <section className="card-section">
          <h2>Safety & Condition Report</h2>
          <div className="safety-grid">
            {Object.entries(car.safetyChecks).map(([key, value], i) => (
              <div key={i} className="safety-card">
                <div className={`safety-icon ${value ? "safe" : "unsafe"}`}>
                  {value ? <Check /> : <X />}
                </div>
                <span>{formatKey(key)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>


    </div>
  );
}

// Sub-components
function Spec({ icon, label, value }) {
  return (
    <div className="spec">
      {icon}
      <div>
        <p className="spec-label">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

// Helpers
function formatKey(str) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

// Custom Arrows
function CustomPrevArrow({ onClick }) {
  return (
    <button className="slick-prev" onClick={onClick} aria-label="Previous">
      <ChevronLeft className="icon" />
    </button>
  );
}
function CustomNextArrow({ onClick }) {
  return (
    <button className="slick-next" onClick={onClick} aria-label="Next">
      <ChevronRight className="icon" />
    </button>
  );
}

