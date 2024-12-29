import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.jpg";
import NavBar from "./NavBar";
import { ParallaxBanner } from "react-scroll-parallax";

const HomePage = () => {
  const navigate = useNavigate();

  const handleMedicationNearMe = () => {
    navigate("/medication-near-me");
  };

  const handleOutbreakNearMe = () => {
    navigate("/outbreak-near-me");
  };

  const handleTrackMyHealth = () => {
    navigate("/track-my-health");
  };

  return (
    <>
   
      <section className="overflow-hidden w-full">
      <ParallaxBanner
  layers={[
    { image: backgroundImage, speed: -20 },
    {
      speed: -15,
      children: (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-8 text-black font-sans font-bold">
            Health Pal
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-4/5 max-w-4xl">
            <button
              onClick={handleMedicationNearMe}
              className="btn-medication rounded-full px-8 py-3 text-white font-semibold shadow-md hover:transform hover:scale-110 transition duration-300 ease-in-out"
              style={{ backgroundColor: "#2D89FF" }}
            >
              Medication Near Me
            </button>
            <button
              onClick={handleOutbreakNearMe}
              className="btn-outbreak rounded-full px-8 py-3 text-white font-semibold shadow-md hover:transform hover:scale-110 transition duration-300 ease-in-out"
              style={{ backgroundColor: "#FFC107" }}
            >
              Outbreak Near Me
            </button>
            <button
              onClick={handleTrackMyHealth}
              className="btn-track rounded-full px-8 py-3 text-white font-semibold shadow-md hover:transform hover:scale-110 transition duration-300 ease-in-out"
              style={{ backgroundColor: "#A0BCC8" }}
            >
              Track My Health
            </button>
          </div>
        </div>
      ),
    },

  ]}
  className="aspect-[2/1]"
/>

      </section>
    </>
  );
};

export default HomePage;
