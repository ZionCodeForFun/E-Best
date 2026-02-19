import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { superbase } from "../../SuperbaseClient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronLeft,
  MapPin,
  Gauge,
  Calendar,
  Fuel,
  Settings,
  MessageCircle,
  AirVent,
  Armchair,
  Camera,
  Circle,
  Power,
  Bluetooth,
  Sun,
  Flame,
  PhoneCall,
} from "lucide-react";
import "../../style/carDetails.css";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GoHash } from "react-icons/go";


export default function CarDetailsPage() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (carId) fetchCar();
  }, [carId]);

  const fetchCar = async () => {
    try {
      const { data, error } = await superbase
        .from("cars")
        .select("*")
        .eq("id", parseInt(carId))
        .single(); // .single() because we want one row

      if (error) throw error;

      // Make sure images is an array
      const parsedCar = {
        ...data,
        images: Array.isArray(data.images)
          ? data.images
          : JSON.parse(data.images || "[]"),
      };

      setCar(parsedCar);
    } catch (err) {
      console.error("Error fetching car:", err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Loading car details...</p>;

  if (!car) {
    return (
      <div className="not-found">
        <h1>Car Not Found</h1>
        <Link to="/car-page" className="btn btn-primary">
          Back to Cars
        </Link>
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

    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: (i) => <button className="slider-dot">{i + 1}</button>,
  };
  const phone = "+2348133369509";
  const telLink = `tel:${phone}`;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  const currentUrl = window.location.href;
  const whatsappMessage = `
Hello, I'm interested in this vehicle:

${car.name}
Price: ${formatPrice(car.price)}

View details here:
${currentUrl}
`;

  const whatsappLink = `https://wa.me/2348133369509?text=${encodeURIComponent(whatsappMessage)}`;
  const RequestReoptMessage = `
Hello, I'm interested in this vehicle, could you provide the inspection report?:

${car.name}
Price: ${formatPrice(car.price)}

View details here:
${currentUrl}
`;

  const whatsappLinkForReport = `https://wa.me/2348133369509?text=${encodeURIComponent(RequestReoptMessage)}`;

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
        <span className={`car-badge ${conditionClasses[car.condition] || ""}`}>
          {car.condition}
        </span>
      </section>

      {/* Main Content */}
      <div className="container main-content">
        <div className="grid-two-columns">
          {/* Left Column */}
          <div>
            <h1 className="car-name">{car.name}</h1>
            <p className="car-brand">
              {car.brand} • {car.model}
            </p>

            {/* Quick Specs */}
            <div className="car-specs-grid">
              <Spec icon={<Calendar />} label="Year" value={car.year} />
              <Spec icon={<Gauge />} label="Mileage" value={car.mileage} />
              <Spec
                icon={<Settings />}
                label="Transmission"
                value={car.transmission}
              />
              <Spec icon={<Fuel />} label="Fuel Type" value={car.fuel} />
              <Spec icon={<MapPin />} label="Location" value={car.location} />
              <Spec
                icon={<IoColorPaletteOutline style={{ fontSize: 25 }} />}
                label="Color"
                value={car.color}
              />
              <Spec
                icon={<GoHash style={{ fontSize: 25 }} />}
                label="Lot"
                value={car.lot}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="price-card">
            <p className="price-label">Price</p>
            <p className="price-value">{formatPrice(car.price)}</p>

            <div className="card-buttons">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="car-details-btn car-details-btn-primary"
              >
                <MessageCircle className="message-icon" /> Contact on WhatsApp
              </a>
              <a href={telLink}>
                <button className="car-details-btn car-details-btn-btn-outline">
                  <PhoneCall className="phone-icon " /> Contact on phone
                </button>
              </a>
            </div>
          </div>
        </div>

        <section className="card-section">
          <h2>Vehicle Description</h2>
          <p>{car.features}</p>
          <a href={whatsappLinkForReport} target="_blank" rel="noopener noreferrer">
            Request for inspection report?
          </a>
        </section>
      </div>
    </div>
  );
}

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
