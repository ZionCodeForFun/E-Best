import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import "../../style/GlobalCarousel.css";
import "../../style/CarAccessPage.css";
import "../../style/cta.css";
import { ChevronLeft } from "lucide-react";
import { superbase } from "../../SuperbaseClient";
import CustomSelectAccess from "../../common/CustomSelectAccess";
import ImageCarouselGlobal from "../../components/ImageCarouselGlobal";
export default function AccessoriesListing() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  useEffect(() => {
    const fetchAccessories = async () => {
      setLoading(true);
      const { data, error } = await superbase
        .from("accessories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setAccessories(data);
      }
      setLoading(false);
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredAccessories = accessories.filter((acc) => {
    const matchBrand = selectedBrand ? acc.name === selectedBrand : true;
    const matchType = selectedType ? acc.type === selectedType : true;
    return matchBrand && matchType;
  });

  const totalPages = Math.ceil(filteredAccessories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccessories = filteredAccessories.slice(startIndex, endIndex);

  const handleCardClick = (id) => {
    navigate(`/car-accessories/${id}`);
  };

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
    <div className="accessories-page">
      <div className="accessories-page__container">
        <Link to="/">
          <ChevronLeft className="icon" />
        </Link>
        <div className="accessories-page__header">
          <h1 className="accessories-page__title"> Car Accessories</h1>
        </div>

        {/* Search Bar */}
        <div className="accessories-page__search-bar">
          <CustomSelectAccess
            options={[...new Set(accessories.map((a) => a.name))]}
            placeholder="Select Name"
            value={selectedBrand}
            onChange={(value) => {
              setSelectedBrand(value);
              setSelectedType("");
              setCurrentPage(1);
            }}
          />

          <CustomSelectAccess
            options={[
              ...new Set(
                accessories
                  .filter((a) =>
                    selectedBrand ? a.name === selectedBrand : true,
                  )
                  .map((a) => a.type),
              ),
            ]}
            placeholder="Select Type"
            value={selectedType}
            onChange={(value) => {
              setSelectedType(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="accessories-page__grid">
          {currentAccessories.map((accessory) => (
            <div key={accessory.id} className="accessories-page__card">
              <div className="accessories-page__card-image-wrapper">
                <ImageCarouselGlobal
                  images={
                    Array.isArray(accessory.images) ? accessory.images : []
                  }
                  altText={accessory.name}
                  containerClassName="accessories-page__carousel"
                />
                {accessory.badge && (
                  <span className="accessories-page__badge">
                    {accessory.badge}
                  </span>
                )}
              </div>
              <div className="accessories-page__card-content">
                <h3 className="accessories-page__card-name">
                  {accessory.name}
                </h3>
                <p className="accessories-page__card-description">
                  {accessory.shortDescription}
                </p>
                <p className="accessories-page__card-price">
                  ₦{accessory.price.toFixed(2)}
                </p>
                <div className="accessories-page__card-actions cta-row">
                  <button
                    className="accessories-page__button btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(accessory.id);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="accessories-page__button accessories-page__button--secondary btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Hello, I am interested in the accessory: ${accessory.name}. Could you provide more details?`;
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

        <div className="accessories-page__pagination">
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
      </div>
    </div>
  );
}
