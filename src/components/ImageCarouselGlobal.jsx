import React, { useState, useEffect } from "react";

export default function ImageCarouselGlobal({
  images = [],
  altText = "Image",
  containerClassName = "carousel-wrapper",
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length]);

  const handlePrevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
  };

  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return (
      <div className={containerClassName}>
        <div className="carousel-empty">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={containerClassName}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="carousel-inner">
        <img
          src={images[currentImageIndex]}
          alt={`${altText}-${currentImageIndex}`}
          className="carousel-image"
        />
      </div>

      {hasMultipleImages && (
        <>
          <button
            className="carousel-button carousel-button--prev"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            ❮
          </button>
          <button
            className="carousel-button carousel-button--next"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            ❯
          </button>

          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentImageIndex ? "carousel-dot--active" : ""
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
