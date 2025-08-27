import React, { useState, useEffect, useRef } from "react";

const InactivityTimer = ({ onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const warningTimeoutRef = useRef();
  const logoutTimeoutRef = useRef();

  const resetTimers = () => {
    clearTimeout(warningTimeoutRef.current);
    clearTimeout(logoutTimeoutRef.current);

    // Show warning at 13 minutes
    warningTimeoutRef.current = setTimeout(() => {
      setShowModal(true);
    }, 13 * 60 * 1000);

    // Logout at 15 minutes
    logoutTimeoutRef.current = setTimeout(() => {
      setShowModal(false);
      onLogout();
    }, 15 * 60 * 1000);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimers));

    resetTimers();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimers)
      );
      clearTimeout(warningTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  const handleStay = () => {
    setShowModal(false);
    resetTimers();
  };

  const handleLogout = () => {
    setShowModal(false);
    onLogout();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Session Expiring Soon
        </h2>
        <p className="mb-4">
          You have been inactive for 13 minutes. Your session will expire in 2
          minutes.
        </p>
        <button
          onClick={handleStay}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Stay Logged In
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout Now
        </button>
      </div>
    </div>
  );
};

export default InactivityTimer;