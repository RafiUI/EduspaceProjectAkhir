import React, { useState } from "react";


function Corousel() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["disconbanner.png", "openbanner.png", "corosel.png"]; 

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center">
      <div className="carousel md:1/3 mx-auto max-w-screen-2xl py-12 relative">
        <div className="carousel-item relative w-full">
          <img src={slides[currentSlide]} className="w-full" alt="Slide" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">
              ❮
            </button>
            <button onClick={nextSlide} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corousel;