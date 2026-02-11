import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { superbase } from "../../SuperbaseClient";
import ImageCarouselGlobal from "../../components/ImageCarouselGlobal";
import "../../style/GlobalCarousel.css";
import "../../style/CarAccessDetails.css";
import "../../style/cta.css";

export default function AccessoryDetail() {
  const { accessoryId } = useParams();
  const navigate = useNavigate();

  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch accessory from Supabase
  useEffect(() => {
    const fetchAccessory = async () => {
      setLoading(true);
      const { data, error } = await superbase
        .from("accessories")
        .select("*")
        .eq("id", accessoryId)
        .single();

      if (error) {
        console.error("Error fetching accessory:", error);
        setAccessory(null);
      } else {
        setAccessory(data);
      }
      setLoading(false);
    };

    fetchAccessory();
  }, [accessoryId]);

  const handleContactUs = () => {
    const message = `Hello, I am interested in the accessory: ${accessory.name}. Could you provide more details?`;
    const whatsappURL = `https://wa.me/+2348133369509?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return (
      <div className="accessory-detail">
        <div className="accessory-detail__container">
          <p>Loading accessory details...</p>
        </div>
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="accessory-detail">
        <div className="accessory-detail__container">
          <button
            className="accessory-detail__back-button"
            onClick={() => navigate("/car-accessories")}
          >
            ← Back to Accessories
          </button>
          <h1>Accessory not found</h1>
        </div>
      </div>
    );
  }

  const images = Array.isArray(accessory.images) ? accessory.images : [];

  return (
    <div className="accessory-detail">
      <div className="accessory-detail__container">
        <button
          className="accessory-detail__back-button"
          onClick={() => navigate("/car-accessories")}
        >
          ← Back to Accessories
        </button>

        <div className="accessory-detail__content">
          <div className="accessory-detail__image-section">
            <div className="accessory-detail__image-wrapper">
              <ImageCarouselGlobal
                images={images}
                altText={accessory.name}
                containerClassName="accessory-detail__carousel"
              />
              {accessory.badge && (
                <span className="accessory-detail__badge">
                  {accessory.badge}
                </span>
              )}
            </div>
          </div>

          <div className="accessory-detail__info">
            <h1 className="accessory-detail__name">{accessory.name}</h1>

            <p className="accessory-detail__price">
              ${accessory.price.toFixed(2)}
            </p>

            <p className="accessory-detail__availability">
              {accessory.availability}
            </p>

            <p className="accessory-detail__description">
              {accessory.description}
            </p>

            {accessory.features && accessory.features.length > 0 && (
              <div className="accessory-detail__features">
                <h2 className="accessory-detail__features-title">
                  Key Features
                </h2>
                <ul className="accessory-detail__features-list">
                  {accessory.features.map((feature, index) => (
                    <li key={index} className="accessory-detail__feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="accessory-detail__actions">
              <button
                className="accessory-detail__button btn-outline"
                onClick={handleContactUs}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
