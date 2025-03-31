import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-white text-center py-6" id="footer">
      {/* Club Logo */}
      <div className="mb-4">
        <img 
          src="/assets/FOC.US_final.png" 
          alt="Photography Club Logo" 
          className="mx-auto h-16 invert"
        />
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaFacebook size={24} />
        </a>  
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaLinkedin size={24} />
        </a>
      </div>

      {/* Made With Love */}
      <p className="text-sm text-white font-light font-sans">
        Made with <span className="text-red-500">❤️</span> by Lataksh Sariya
      </p>
    </footer>
  );
};

export default Footer;
