import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollDown = () => {
  return (
    <div className=" w-screen items-center space-x-2 overflow-hidden justify-center mt-20 hidden sm:flex">
      {/* Scroll Down Text with Fading Animation */}
      <motion.p
        className="text-white text-xl font-[Halv]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll Down
      </motion.p>

      {/* Animated Arrow with Disappear & Reappear Effect */}
    

      {/* Clone Arrow Instantly Appearing from Top */}
      <motion.div
        className="text-white "
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: [ -20, 0, 20], opacity: [0, 1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </div>
  );
};

export default ScrollDown;
