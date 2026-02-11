import { Link } from "react-router";
import CustomSelect from "../../common/CustomSelect";
import { Calendar, Gauge, Settings, Fuel, ChevronLeft } from "lucide-react";
import "../../style/GlobalCarousel.css";
import "../../style/carPage.css";
import "../../style/cta.css";
import { GetCars } from "../../components/api/Cars";
import ImageCarouselGlobal from "../../components/ImageCarouselGlobal";
import { useState, useEffect } from "react";
export default function CarPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const carsPerPage = 6;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const { cars, loading } = GetCars();
  const filteredCars = cars.filter((car) => {
    const matchMake = selectedMake ? car.brand === selectedMake : true;
    const matchModel = selectedModel ? car.model === selectedModel : true;
    const matchYear = selectedYear
      ? String(car.year) === String(selectedYear)
      : true;

    return matchMake && matchModel && matchYear;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const conditionClassMap = {
    brandnew: "carspage-badge-brandnew",
    foreignused: "carspage-badge-foreign",
    nigerianused: "carspage-badge-nigerian",
  };

  const getConditionClass = (condition) => {
    if (!condition) return "carspage-badge-default";
    const key = condition.toLowerCase().replace(/\s+/g, "");
    return conditionClassMap[key] || "carspage-badge-default";
  };
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`accessories-page__pagination-button ${
            currentPage === i
              ? "accessories-page__pagination-button--active"
              : ""
          }`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="carspage-container">
      {/* Header */}
      <header className="carspage-header">
        <div className="carspage-header-inner">
          <Link to="/">
            <ChevronLeft className="icon" />
          </Link>
          <h1 className="carspage-title">E-BEST</h1>
          <p className="carspage-subtitle">Premium Automotive Collection</p>
        </div>
      </header>

      {/* Cars Grid */}
      <div className="carspage-grid-wrapper">
        <div className="carspage-search-wrapper">
          <div className="carspage-search-bar">
            {/* MAKE */}
            <CustomSelect
              options={[...new Set(cars.map((c) => c.brand))]}
              placeholder="Select Make"
              value={selectedMake}
              onChange={(value) => {
                setSelectedMake(value);
                setSelectedModel(""); // reset model when make changes
                setCurrentPage(1);
              }}
            />

            {/* MODEL */}
            <CustomSelect
              options={[
                ...new Set(
                  cars
                    .filter((c) =>
                      selectedMake ? c.name === selectedMake : true,
                    )
                    .map((c) => c.name),
                ),
              ]}
              placeholder="Select Model"
              value={selectedModel}
              onChange={(value) => {
                setSelectedModel(value);
                setCurrentPage(1);
              }}
            />

            {/* YEAR */}
            <CustomSelect
              options={[...new Set(cars.map((c) => c.year))].sort(
                (a, b) => b - a,
              )}
              placeholder="Select Year"
              value={selectedYear}
              onChange={(value) => {
                setSelectedYear(value);
                setCurrentPage(1);
              }}
            />

            <button
              className="carspage-search-btn"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </button>
          </div>
        </div>

        <h2 className="carspage-section-title">Available Vehicles</h2>
        <div className="carspage-grid">
          {currentCars.map((car) => (
            <div key={car.id} className="carspage-card">
              <div className="carspage-card-image-wrapper">
                <ImageCarouselGlobal
                  images={Array.isArray(car.images) ? car.images : []}
                  altText={car.name}
                  containerClassName="carspage-carousel"
                />
                <span
                  className={`carspage-badge ${getConditionClass(car.condition)}`}
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
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="carspage-card-actions cta-row">
                  <Link
                    to={`/cars/${car.id}`}
                    className="carspage-button btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    className="carspage-button carspage-button--secondary btn-outline"
                    onClick={() => {
                      const message = `Hello, I am interested in the vehicle: ${car.name}. Could you provide more details?`;
                      const whatsappURL = `https://wa.me/+2348133369509?text=${encodeURIComponent(
                        message,
                      )}`;
                      window.open(whatsappURL, "_blank");
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cars.length > carsPerPage && (
          <div className="carspage-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="accessories-page__pagination-button"
            >
              Previous
            </button>

            {renderPagination()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="accessories-page__pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
