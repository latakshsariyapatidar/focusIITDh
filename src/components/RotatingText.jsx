import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RotatingText(props) {

    const visibleRef = useRef(null);
    const inVisibleRef = useRef(null);
    
    //function to split text

    const handleSplittingText = (text) => {
        return text.split("").map((char, index) => (
          <span key={index} className="inline-block">
            {char}
          </span>
        ));
    };

    const handleMouseEnter = () => {
        gsap.to(visibleRef.current.children, {
            y: "-30px",
            duration : 0.5,
            stagger : 0.02,
            opacity : 0
        })

        gsap.to(inVisibleRef.current.children, {
            y: "-30px",
            duration : 0.5,
            stagger : 0.02,
            opacity: 1
        })
    } 

    const handleMouseExit = () => {
        gsap.to(visibleRef.current.children, {
            y: 0,
            duration : 0.5,
            stagger : 0.02,
            opacity : 1
        })

        gsap.to(inVisibleRef.current.children, {
            y: 0,
            duration : 0.5,
            stagger : 0.02,
            opacity: 0
        })
    }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}  className="h-8 w-fit px-5 py-[3px]  overflow-hidden ">
      <div ref={visibleRef} id="visible">{handleSplittingText(props.title)}</div>
      <div ref={inVisibleRef} id="notVisible">{handleSplittingText(props.title)}</div>
    </div>
  );
}
