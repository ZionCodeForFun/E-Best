import React, { useEffect, useRef, useState } from "react";

function ImageCarouselAccess({ images, interval = 3000 }) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  if (!images || images.length === 0) return null;

  // Auto slide
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Touch handlers (mobile swipe)
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      // swipe left
      setCurrent((prev) => (prev + 1) % images.length);
    } else if (diff < -50) {
      // swipe right
      setCurrent((prev) =>
        prev - 1 < 0 ? images.length - 1 : prev - 1
      );
    }

    isDragging.current = false;
  };

  return (
    <div
      className="card-image-carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div className="carousel-slide" key={i}>
            <img
              src={img}
              alt={`slide-${i}`}
              className="home-accessories__card-image"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarouselAccess;
