import React, { useState, useEffect } from "react";
import CameraModel from "./CameraModel";

const Loader = ({ onComplete, fadeOutLoader }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    if (count === 100) {
      clearInterval(interval);
      setTimeout(onComplete, 2000); // Wait 2 sec after reaching 100%
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className={`h-screen max-h-[90vh] w-screen flex flex-col gap-0 items-center justify-center transition-all duration-1000 ${
        fadeOutLoader ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* <div className="absolute h-screen w-screen -z-30 sm:flex hidden ">
        <CameraModel lighting="" />
      </div> */}
      <div className="h-screen w-screen flex flex-col justify-center">
        <h1
          className={`text-[5vw] font-[UnboundedBold] text-white w-screen flex items-center justify-center transition-opacity duration-1000 ${
            fadeOutLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          Your <span className="mx-2 stroke-text fade-animation">Experience</span> is
        </h1>

        <h1
          className={`text-[5vw] font-[UnboundedBold] text-white w-screen flex items-center justify-center transition-opacity duration-1000 ${
            fadeOutLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          being loaded
        </h1>

        <h2
          className={`text-[3vw] font-[UnboundedBold] text-white mt-4 w-screen flex items-center justify-center transition-opacity duration-1000 ${
            fadeOutLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          {count}%
        </h2>
      </div>
    </div>
  );
};

export default Loader;
