import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Reel Effect */}
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden pointer-events-none">
        <div
          className="absolute w-[200%] h-fit -rotate-10 flex gap-10 bg-[#4949499b] items-center py-10 top-0"
          style={{ transform: `translateX(${scrollY * 0.1}px)` }}
        >
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src={`/assets/Images/image${i % 5 + 1}.jpg`}
              alt="Reel Image"
              className="w-[500px] h-[200px] object-cover rounded-lg border-2 border-[#494949]"
            />
          ))}
        </div>
        <div
          className="absolute w-[200%] h-fit -rotate-10 flex gap-10 bg-[#4949499b] items-center py-10 bottom-0"
          style={{ transform: `translateX(-${scrollY * 0.1}px)` }}
        >
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src={`/assets/Images/image${i % 5 + 1}.jpg`}
              alt="Reel Image"
              className="w-[500px] h-[200px] object-cover rounded-lg border-2 border-[#494949]"
            />
          ))}
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-4xl text-center flex flex-col items-center relative z-10 ">
        {/* Section Title with Interactive Glow */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[8vw] font-black font-[Playfair] mb-8"
        >
          About <span className="text-transparent" id="focusText">FOCUS</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 leading-relaxed font-[Halv] max-w-3xl"
        >
          FOCUS is the official Photography Club of IIT Dharwad, dedicated to
          capturing breathtaking moments and expressing creativity through the
          lens. From event coverage to experimental photography, our members
          showcase the art of visual storytelling.
        </motion.p>

        {/* Engaging Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-2xl mt-10 font-semibold text-gray-200 font-[Playfair] italic max-w-2xl"
        >
          "Photography is the story we fail to put into words."
        </motion.p>
      </div>
    </section>
  );
};

export default About;