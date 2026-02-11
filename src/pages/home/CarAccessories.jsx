import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import ImageCarouselAccess from "../../components/ImageCarouselAccess";
import { superbase } from "../../SuperbaseClient";
import "../../style/CarAsseccories.css";
import "../../style/cta.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarAccessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Show first 4 accessories in the slider
  const featuredAccessories = accessories.slice(0, 4);

  return (
    <div className="home-accessories">
      <div className="home-accessories__header">
        <h2 className="home-accessories__title">Car Accessories</h2>
        <p className="home-accessories__subtitle">
          Enhance your driving experience with our premium accessories
        </p>
      </div>

      <div className="home-accessories__slider-container">
        <Slider {...sliderSettings} className="home-accessories__slider">
          {featuredAccessories.map((accessory) => (
            <div key={accessory.id}>
              <div className="home-accessories__card">
                <div className="home-accessories__card-image-wrapper">
                  <ImageCarouselAccess images={accessory.images} />
                  {accessory.badge && (
                    <span className="home-accessories__badge">
                      {accessory.badge}
                    </span>
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
                    ₦{accessory.price.toFixed(2)}
                  </p>
                  <div className="home-accessories-cart-cta-holder">
                    <button
                      className="home-accessories-cta-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(accessory.id);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="home-accessories-cta-secondary"
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
            </div>
          ))}
        </Slider>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          className="home-accessories__button"
          onClick={handleViewAllClick}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          View All Accessories
        </button>
      </div>
    </div>
  );
}
