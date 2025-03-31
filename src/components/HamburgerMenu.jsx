import { useState } from "react";
import { motion } from "framer-motion";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay ensures the element is in the DOM
  };

  return (
    <div className="relative flex items-center">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-5 flex flex-col items-center justify-around z-50"
      >
        <motion.span
          className="block bg-white h-[1px] w-8"
          initial={{ rotate: 0, y: 0 }}
          animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block bg-white h-[1px] w-8"
          initial={{ opacity: 1 }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block bg-white h-[1px] w-8"
          initial={{ rotate: 0, y: 0 }}
          animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-full h-screen gap-10 bg-black text-white flex flex-col items-center justify-center space-y-6 z-40"
      >
        {[
          { title: "About Us", id: "about" },
          { title: "Events", id: "events" },
          { title: "Club Members", id: "members" },
          { title: "Memories", id: "memories" },
          { title: "Contact Us", id: "footer" },
        ].map((item, key) => {
          return (
            <a
              key={key}
              href={`#${item.id}`}
              className="relative hover:font-stretch-200% transition-all duration-300 transform hover:scale-110 font-mono text-2xl "
              onClick={() => {
                scrollToSection();
                setIsOpen(!isOpen);
              }}
            >
              {item.title}
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
