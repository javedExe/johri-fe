import React from "react";
import backgroundImage from "../../../assets/background.jpg";
import mobileLogo from "../../../assets/mobile-logo.png";
import { useNavigate } from "react-router-dom";

const WelcomeMobile = () => {
  const navigate = useNavigate();
  return (
    <main
      className="relative min-h-screen w-full h-full m-0 bg-cover bg-center brightness-110 flex flex-col justify-end"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/0 z-0" />

      <div className="relative bg-opacity-40 w-full h-full flex flex-col text-white px-4 pb-4 justify-end">
        <img src={mobileLogo} alt="Johri Logo" className="w-20 h-10 mb-6" />
        <h2 className="text-3xl font-medium">Unlock the World of Johri.</h2>
        <p className="text-white mt-2 mb-10 ">
          Join us for personalized picks and shimmering surprises.
        </p>

        <button
          className="w-full bg-purple-300 text-black py-2 rounded mb-4 cursor-pointer transition-all duration-150  active:scale-98 ease-in-out text-sm font-medium"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </main>
  );
};

export default WelcomeMobile;
