import React from "react";
import LiveEvent from "../components/LiveEvent";
import UpcomingEvents from "../components/UpcomingEvents";

const Events = () => {
  return (
    <section id="events" className="relative min-h-screen text-white flex flex-col items-center w-screen justify-center px-6">
      {/* Section Title */}
      <h2 className="text-[9vw] font-black font-[Playfair] mb-6 text-center">
        Events at <span className="text-transparent" id="focusText">FOCUS</span>
      </h2>

      {/* Layout with Live Event & Upcoming Events */}
      <div className="w-screen flex flex-col lg:flex-row gap-8 px-10">
        {/* Live Event */}
        <LiveEvent eventDataPath="public/jsons/liveEvent.json" />

        {/* Upcoming Events */}
        <UpcomingEvents eventsDataPath="public/jsons/upcomingEvents.json" />
      </div>
    </section>
  );
};

export default Events;
