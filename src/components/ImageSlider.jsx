import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  // Fetch images from JSON file
  useEffect(() => {
    fetch("/jsons/images.json")
      .then((response) => response.json())
      .then((data) => setImages(data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const nextImage = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.8 });
      },
    });
  };

  const prevImage = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.8 });
      },
    });
  };

  if (images.length === 0) {
    return <p className="text-center text-white">Loading images...</p>;
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto p-5">
      {/* Image Container */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          ref={imageRef}
          src={images[currentIndex]}
          alt="Event"
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageSlider;
