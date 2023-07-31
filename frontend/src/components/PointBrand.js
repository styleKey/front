import React, { useState } from 'react';
import './Point.css';

function PointBrand({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.brands.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.brands.length - 1 ? prevIndex + 1 : 0));
  };

  const handleBrandClick = () => {
    const currentBrand = data.brands[currentIndex];
    if (currentBrand.brandSite) {
      window.open(currentBrand.brandSite, '_blank');
    }
  };

  const currentBrand = data.brands[currentIndex];

  return (
    <div className="brand">
      <div className="brand-top">
        <button className="brand-button" onClick={handlePrevious}><i className="fas fa-chevron-left"></i></button>

        <div className="brand-list">
          <img
            className="brand-logo"
            src={`../images/point-${data.id}/logo-${currentIndex + 1}.png`}
            alt={currentBrand.brand}
            onClick={handleBrandClick}
          />
          <h5 className="brand-name">{currentBrand.brand}</h5>
          <p className="brand-description">{currentBrand.brandDescription}</p>
        </div>


        <button className="brand-button" onClick={handleNext}><i className="fas fa-chevron-right"></i></button>
      </div>

      <div className="brand-bottom">
        {data.brands.map((brand, index) => (
          <span
            key={index}
            className={`brand-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

    </div>
  );
}

export default PointBrand;
