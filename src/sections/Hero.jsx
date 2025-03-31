import React, { useState, useEffect, useCallback, useRef } from "react";
import CameraModel from "../components/CameraModel";
import ScrollDown from "../components/ScrollDown";

export const Hero = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [smoothX, setSmoothX] = useState(0);
  const [smoothY, setSmoothY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Mouse Move Handler (Optimized)
  const handleMouseMove = useCallback((e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.current = (e.clientX / innerWidth - 0.5) * 15;
    mouseY.current = (e.clientY / innerHeight - 0.5) * 15;
  }, []);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Smooth Animation using requestAnimationFrame
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setSmoothX((prev) => prev + (mouseX.current - prev) * 0.1);
      setSmoothY((prev) => prev + (mouseY.current - prev) * 0.1);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="min-h-fit w-screen pt-20 overflow-x-hidden relative" id="hero">

      {/* Camera Model */}
      <div
        className="absolute w-screen -z-30 hidden md:flex h-screen top-[0px]"
        style={{
          transform: `translate(${-smoothX * 2}px, ${scrollY * 0.2}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <CameraModel lighting="" />
      </div>

      {/* Title Section */}
      <div className="text-center flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-4xl text-white text-[20vw] font-[Playfair] font-black leading-[0.8em] sm:text-[15vw] md:text-[15vw] md:mb-10">
          Capturing Moments
        </h1>

        {/* Marquee Animation */}
        <div className="marquee-container mt-100 sm:mt-30">
          <div className="marquee-wrapper">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="marquee-content font-[Halv] text-5xl">
                FOCUS @ IITDH • FOCUS @ IITDH • FOCUS @ IITDH • FOCUS @ IITDH •
                FOCUS @ IITDH • FOCUS @ IITDH • FOCUS @ IITDH • FOCUS @ IITDH •
              </div>
            ))}
          </div>
        </div>

        <ScrollDown />
      </div>
    </div>
  );
};

export default Hero;
