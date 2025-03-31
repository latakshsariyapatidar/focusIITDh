import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UpcomingEvents = ({ eventsDataPath }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(eventsDataPath)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading upcoming events:", err));
  }, [eventsDataPath]);

  if (events.length === 0) return <p>Loading events...</p>;

  return (
    <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-[#4949499b] backdrop-blur-lg  rounded-lg p-4 flex flex-col items-center text-center shadow-[0px_0px_30px_10px_rgba(0,0,0,0.32)]"
        >
          {/* Event Image */}
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Event Details */}
          <h3 className="text-xl font-black font-sans text-white mt-3">
            {event.name}
          </h3>
          <p className="text-gray-300 text-xs">{event.date}</p>

          {/* Action Button */}
          <button onClick={()=>{alert("The link to event will be added soon!!!")}} className="mt-4 px-6 py-2 text-sm bg-[#1e1e1e69] font-sans text-white font-black rounded-lg hover:bg-[#1e1e1ebd] transition">
            Know More
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
