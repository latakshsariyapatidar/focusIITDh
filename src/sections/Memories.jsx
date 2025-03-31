import React from "react";
import ImageSlider from "../components/ImageSlider";

const Memories = () => {
  return (
    <div className=" py-10" id="memories">
      <h2 className="text-[10vw] font-black text-white font-[Playfair] text-center mb-10">
        Memories
      </h2>
      <ImageSlider />
    </div>
  );
};

export default Memories;
