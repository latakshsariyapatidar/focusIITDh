import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import Memories from "./sections/Memories";
import Footer from "./sections/Footer";
import About from "./sections/About";
import ClubMembers from "./sections/ClubMembers";
import Events from "./sections/Events";
import Loader from "./components/Loader";
import ParallaxBackground from "./components/ParallaxBackground";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);

  useEffect(() => {
    if (fadeOutLoader) {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 2000); // Ensures smooth transition after fade-out
    }
  }, [fadeOutLoader]); // Runs when fadeOutLoader changes

  return (
    <div className="relative">
      {!loadingComplete && (
        <Loader
          onComplete={() => setFadeOutLoader(true)} // Start fade-out
          fadeOutLoader={fadeOutLoader}
        />
      )}

      {loadingComplete && (
        <div className="fade-in-transition">
          <NavBar />
          <ParallaxBackground/>

          <div className="w-screen backdrop-blur-sm">       
            <Hero />
            <About />
            <Events />
            <ClubMembers />
            <Memories />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
