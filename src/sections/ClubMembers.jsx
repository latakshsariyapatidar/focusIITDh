import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import RotatingText from "../components/RotatingText";

const ClubMembers = () => {
  const [membersData, setMembersData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const dropdownRefs = useRef({});
  const imageRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    fetch("/jsons/members.json")
      .then((res) => res.json())
      .then((data) => {
        setMembersData(data);
        const categoriesTemp = new Set();
        data.members.forEach((memberGroup) => {
          memberGroup.forEach((member) => {
            if (Array.isArray(member.club_part)) {
              member.club_part.forEach((part) => categoriesTemp.add(part));
            }
          });
        });
        setCategories([...categoriesTemp]);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      if (dropdownRefs.current[category]) {
        gsap.set(dropdownRefs.current[category], { height: 0, opacity: 0 });
      }
    });
  }, [categories]);

  const toggleDropdown = (category) => {
    if (selectedCategory === category) {
      gsap.to(dropdownRefs.current[category], {
        height: 0,
        opacity: 0,
        duration: 0.4,
      });
      setSelectedCategory(null);
    } else {
      if (selectedCategory) {
        gsap.to(dropdownRefs.current[selectedCategory], {
          height: 0,
          opacity: 0,
          duration: 0.4,
        });
      }
      gsap.to(dropdownRefs.current[category], {
        height: "auto",
        opacity: 1,
        duration: 0.5,
      });
      setSelectedCategory(category);
    }
  };

  // Move floating image with mouse
  const handleMouseMove = (e) => {
    if (hoveredImage && imageRef.current) {
      gsap.to(imageRef.current, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  const handleMouseEnter = (imageUrl) => {
    setHoveredImage(imageUrl);
    gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { opacity: 0, duration: 0.3 });
    setHoveredImage(null);
  };

  if (!membersData) return <p className="text-center text-white">Loading...</p>;

  return (
    <div
      className="mt-20 mb-30 relative"
      id="members"
      onMouseMove={handleMouseMove}
    >
      <h2 className="text-[8vw] font-black text-white font-[Playfair] text-center">
        Club Members
      </h2>
      <section className="min-h-fit flex flex-col md:flex-row text-white">
        <div className="w-full md:w-1/3 p-6 flex flex-col gap-6">
          {[membersData.club_secretary, membersData.junior_club_secretary].map(
            (member, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row bg-[#4949499b] rounded-lg overflow-hidden shadow-xl backdrop-blur-md bg-opacity-40 p-3 sm:p-4"
              >
                {/* Image Section */}
                <img
                  src={
                    member.image || "/assets/clubevents/event_placeholder.jpg"
                  }
                  alt={member.name}
                  className="w-full sm:w-1/2 h-40 sm:h-48 object-cover rounded-sm"
                />

                {/* Text Section */}
                <div className="p-3 sm:p-6 w-full sm:w-1/2 flex flex-col justify-center items-center">
                  <h3 className="text-[6vw] sm:text-2xl md:text-3xl font-[Playfair] font-black text-center">
                    {member.name}
                  </h3>
                  <p className="text-[4vw] sm:text-lg md:text-xl text-zinc-300 font-sans text-center">
                    {member.position}
                  </p>
                  <div className="flex space-x-3 mt-2 sm:mt-3">
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="text-pink-400 text-[5vw] sm:text-2xl md:text-3xl" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="text-blue-400 text-[5vw] sm:text-2xl md:text-3xl" />
                      </a>
                    )}
                    {member.contact && (
                      <FaPhone className="text-green-400 text-[5vw] sm:text-2xl md:text-3xl" />
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="w-full md:w-2/3 p-6">
          {categories.map((category, index) => (
            <div key={index} className="mb-1">
              <button
                className="w-full text-left p-4 font-sans font-black text-2xl border-b-2 text-white flex justify-between items-center"
                onClick={() => toggleDropdown(category)}
              >
                <RotatingText title={category} />
                <span>{selectedCategory === category ? "▲" : "▼"}</span>
              </button>
              <div
                ref={(el) => (dropdownRefs.current[category] = el)}
                className="overflow-hidden bg-[#3232329b] border-b border-[#353434] p-1 mt-2 shadow-lg"
              >
                {membersData.members
                  .flat()
                  .filter((member) => member.club_part?.includes(category))
                  .map((member, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b border-gray-700 px-2 hover:bg-[#4949499b]"
                      onMouseEnter={() => handleMouseEnter(member.image)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span className="font-medium font-sans">
                        {member.name}
                      </span>
                      <div className="flex space-x-3">
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-pink-400 text-lg" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="text-blue-400 text-lg" />
                          </a>
                        )}
                        {member.contact && (
                          <FaPhone className="text-green-400 text-lg" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Image */}
    </div>
  );
};

export default ClubMembers;
