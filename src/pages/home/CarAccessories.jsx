import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import ImageCarouselAccess from "../../components/ImageCarouselAccess";
import { superbase } from "../../SuperbaseClient";
import "../../style/CarAsseccories.css";
import "../../style/cta.css";
import "../../style/skeleton.css";
import ContactModal from "../../components/ContactModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function CarAccessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const navigate = useNavigate();

  const outerSliderRef = useRef(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      const { data, error } = await superbase
        .from("accessories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setAccessories(data || []);
      }
      setLoading(false);
    };

    fetchAccessories();
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    variableWidth: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    ref: outerSliderRef,
  };

  const handleCardClick = (id) => {
    navigate(`/car-accessories/${id}`);
  };

  const handleViewAllClick = () => {
    navigate("/car-accessories");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const featuredAccessories = accessories.slice(0, 4);

  if (loading) {
    return (
      <div className="home-accessories">
        <div className="home-accessories__header">
          <div
            className="skeleton-heading"
            style={{ width: "250px", height: "28px", margin: "0 auto 12px" }}
          ></div>
          <div
            className="skeleton-tagline"
            style={{ width: "400px", margin: "0 auto" }}
          ></div>
        </div>

        <div className="home-accessories__slider-container">
          <div className="slider-skeleton">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="product-card-skeleton">
                <div
                  className="skeleton-image-wrapper"
                  style={{ height: "220px" }}
                ></div>
                <div className="skeleton-card-content">
                  <div
                    className="skeleton-card-title"
                    style={{ marginBottom: "8px" }}
                  ></div>
                  <div
                    className="skeleton-card-subtitle"
                    style={{ marginBottom: "12px" }}
                  ></div>
                  <div
                    className="skeleton-card-price"
                    style={{ marginBottom: "12px" }}
                  ></div>
                  <div className="skeleton-card-buttons">
                    <div className="skeleton-btn"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <div
            className="skeleton-btn"
            style={{ maxWidth: "300px", margin: "0 auto", height: "44px" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-accessories">
      <div className="home-accessories__header">
        <h2 className="home-accessories__title">
          Quality Car Accessories & Parts You Can Trust
        </h2>
        <p className="home-accessories__subtitle">
          Shop trusted car accessories and durable spare parts at unbeatable
          prices
        </p>
      </div>

      <div className="home-accessories__slider-container">
        <Slider {...sliderSettings} className="home-accessories__slider">
          {featuredAccessories.map((accessory) => (
            <div key={accessory.id}>
              <div
                className={`home-accessories__card ${accessory.isSold ? "sold" : ""}`}
              >
                <div className="home-accessories__card-image-wrapper">
                  <ImageCarouselAccess images={accessory.images} />
                  {accessory.badge && (
                    <span className="home-accessories__badge">
                      {accessory.badge}
                    </span>
                  )}
                  {accessory.isSold && (
                    <div className="sold-overlay">
                      <span>SOLD</span>
                    </div>
                  )}
                </div>

                <div className="home-accessories__card-content">
                  <h3 className="home-accessories__card-name">
                    {accessory.name}
                  </h3>
                  <p className="home-accessories__card-description">
                    {accessory.shortDescription}
                  </p>
                  <p className="home-accessories__card-price">
                    {formatPrice(accessory.price)}
                  </p>
                  <div className="home-accessories-cart-cta-holder">
                    <button
                      className="home-accessories-cta-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(accessory.id);
                      }}
                      disabled={accessory.isSold}
                    >
                      {accessory.isSold ? "Unavailable" : " View Details"}
                    </button>
                    <button
                      className="home-accessories-cta-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalItem(accessory);
                        setModalOpen(true);
                      }}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        phone={"+2348133369509"}
      />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          className="home-accessories__button"
          onClick={handleViewAllClick}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          View All Accessories <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
