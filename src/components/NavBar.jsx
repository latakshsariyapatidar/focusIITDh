import React, {useEffect} from "react";
import RotatingText from "./RotatingText";
import HamburgerMenu from "./HamburgerMenu";

export default function NavBar () {


  const scrollToSection = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay ensures the element is in the DOM
  };

  return (
    <div
      className="flex items-center justify-between px-8 fixed z-50 w-full bg-[#1e1e1ea9] backdrop-blur-sm"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-randomGlow1 absolute top-1/2 left-[-10%] w-100 h-40 bg-[#B0E0E6] blur-[200px] opacity-30"></div>
        <div className="animate-randomGlow2 absolute top-1/3 left-[50%] w-100 h-40 bg-[#71A6D2] blur-[200px] opacity-25"></div>
        <div className="animate-randomGlow3 absolute top-2/3 right-[-10%] w-100 h-40 bg-[#F0F8FF] blur-[200px] opacity-20"></div>
      </div>

      <div id="left" className="flex items-center justify-center">
        <img
          className="w-auto h-12 object-contain invert"
          src="/assets/FOC.US_final.png"
          alt="logo"
        />
      </div>

      <div
        id="right"
        className="gap-5 hidden md:flex font-[Halv] text-[20px] scale-x-110 mr-5 text-[#E0E0E0]"
      >
        {[
          { title: "About Us", id: "about" },
          { title: "Events", id: "events" },
          { title: "Club Members", id: "members" },
          { title: "Memories", id: "memories" },
          { title: "Contact Us", id: "footer" },
        ].map(
          (item, key) => {
            return (
              <a
                key={key}
                href={"#"}
                onClick={() => scrollToSection(item.id)}
                className="relative group hover:text-[white] hover:font-stretch-200% transition-all duration-300 transform hover:scale-110"
              >
                <span className="absolute left-0 bottom-0 w-0 h-full bg-[#212121] transition-all duration-600 group-hover:w-full rounded-md"></span>
                <RotatingText title={item.title} />
              </a>
            );
          }
        )}
      </div>

      <div id="mobileVisibleRight" className="flex md:hidden">
        <HamburgerMenu></HamburgerMenu>
      </div>
    </div>
  );
}
