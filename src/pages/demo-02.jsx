// import React, { useState, useEffect } from "react";
// import LoginDesktop from "./desktop/LoginDesktop";
// import WelcomeMobile from "./mobile/WelcomeMobile";
// import LoginMobile from "./mobile/LoginMobile";

// const AuthScreen = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!isMobile) {
//     return <LoginDesktop />;
//   }

//   return showLogin ? (
//     <LoginMobile />
//   ) : (
//     <WelcomeMobile onStart={() => setShowLogin(true)} />
//   );
// };

// export default AuthScreen;

import React from "react";

const WelcomeMobile = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between bg-black text-white p-6">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Johri</h1>
        <h2 className="text-2xl font-semibold text-center">
          Unlock the World of Johri.
        </h2>
        <p className="text-center mt-2 text-gray-400">
          Join us for personalized picks and shimmering surprises.
        </p>
      </div>

      <div className="w-full mb-10">
        <button
          onClick={onStart}
          className="w-full py-3 bg-[#cfc9e1] text-black font-semibold rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeMobile;
