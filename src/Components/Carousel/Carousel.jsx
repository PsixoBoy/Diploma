import React, { useEffect, useState } from "react";
import images from "../../Assets/Images";
import "./styles.css";

const Carousel = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = Array.isArray(data) ? data.length : 0;

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  // Automatically move to the next slide after a certain amount of time
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Move to the next slide every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{}}>
        {Array.isArray(data) &&
          data.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <div className="carousel-image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="carousel-image"
                />
              </div>
              <div className="carousel-content">
                <h2 className="carousel-title">{item.name}</h2>
                <p className="carousel-description">{item.description}</p>
              </div>
            </div>
          ))}
      </div>
      <button className="carousel-control carousel-prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="carousel-control carousel-next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
