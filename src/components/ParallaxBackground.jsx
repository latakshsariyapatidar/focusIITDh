import React, { useState, useEffect, useRef } from "react";

const ParallaxBackground = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [smoothX, setSmoothX] = useState(0);
  const [smoothY, setSmoothY] = useState(0);

  // Mouse Move Handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.current = (e.clientX / innerWidth - 0.5) * 15;
      mouseY.current = (e.clientY / innerHeight - 0.5) * 15;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    <div
      className="fixed top-0 left-0 w-screen h-screen -z-50 overflow-hidden"
    >
      <img
        src="/assets/background.jpg"
        alt="Background"
        className="absolute top-0 left-0 object-cover h-screen w-screen"
        style={{
          transform: `translate3d(${smoothX}px, ${smoothY}px, 0) scale(1.1)`,
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
