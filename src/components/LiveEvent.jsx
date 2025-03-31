import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LiveEvent = ({ eventDataPath }) => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    fetch(eventDataPath)
      .then((res) => res.json())
      .then((data) => setEventData(data))
      .catch((err) => console.error("Error loading live event:", err));
  }, [eventDataPath]);

  if (!eventData) return <p>Loading event...</p>;

  // Convert start time to readable format
  const startTime = new Date(eventData.startTime);
  const startHour = startTime.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const startMinutes = startTime.getMinutes().toString().padStart(2, "0");
  const startPeriod = startTime.getHours() >= 12 ? "PM" : "AM";
  const formattedStartTime = `${startHour}:${startMinutes} ${startPeriod}`;

  // Format the start date
  const formattedStartDate = startTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Calculate time left
  const eventEnd = new Date(eventData.endTime);
  const now = new Date();
  const timeLeft = Math.max(0, Math.floor((eventEnd - now) / 60000)); // in minutes

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full lg:w-1/2 p-6 bg-[#4949499b] backdrop-blur-lg rounded-xl flex flex-col items-center text-center shadow-[0px_0px_30px_10px_rgba(0,0,0,0.32)]"
    >
      {/* LIVE Badge */}
      <span className="absolute top-4 right-4 bg-red-600 mx-4 my-3 text-white px-3 py-1 text-sm font-bold rounded-full animate-pulse">
        🔴 LIVE
      </span>

      {/* Event Image */}
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <img src={eventData.image} alt={eventData.name} className="w-full h-full object-cover" />
      </div>

      {/* Event Details */}
      <h3 className="text-4xl font-black font-[Playfair] text-white mb-5 mt-5">{eventData.name}</h3>
      
      {/* Show Start Time */}
      <p className="text-white font-sans">Started at: {formattedStartTime} on {formattedStartDate}</p>

      {/* Event Timer */}
      <div className="mt-2 text-xl text-white">
        Ends in: <span className="text-white font-sans">{timeLeft > 0 ? `${Math.floor(timeLeft / 60)}h ${timeLeft % 60}m` : "Ended"}</span>
      </div>

      {/* Action Button */}
      <button className="mt-4 px-6 py-2 text-xl bg-[#1e1e1e69] font-sans text-white font-black rounded-lg hover:bg-[#1e1e1ebd] transition">
        Join Now
      </button>
    </motion.div>
  );
};

export default LiveEvent;
