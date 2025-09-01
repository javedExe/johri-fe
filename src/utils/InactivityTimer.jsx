import React, { useState, useEffect, useRef } from "react";

const SESSION_LENGTH = 24 * 60 * 60;; 
const WARNING_TIME = 23 * 60 * 60 + 45 * 60;

const InactivityTimer = ({ onLogout }) => {
  const [showModal, setShowModal] = useState(true);
  const [timeLeft, setTimeLeft] = useState(SESSION_LENGTH - WARNING_TIME); // 10 seconds countdown
  const warningTimeoutRef = useRef();
  const logoutTimeoutRef = useRef();
  const countdownIntervalRef = useRef();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const resetTimers = () => {
    clearTimeout(warningTimeoutRef.current);
    clearTimeout(logoutTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    setShowModal(false);
    setTimeLeft(SESSION_LENGTH - WARNING_TIME);

    warningTimeoutRef.current = setTimeout(() => {
      setShowModal(true);
      setTimeLeft(SESSION_LENGTH - WARNING_TIME);

      countdownIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }, WARNING_TIME * 1000);

    logoutTimeoutRef.current = setTimeout(() => {
      setShowModal(false);
      clearInterval(countdownIntervalRef.current);
      onLogout();
    }, SESSION_LENGTH * 1000);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    // events.forEach((event) => window.addEventListener(event, resetTimers));
    resetTimers();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimers));
      clearTimeout(warningTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showModal) {
      clearInterval(countdownIntervalRef.current);
    }
  }, [showModal]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-lg shadow-xl py-6 max-w-md w-full text-center">
        <div className="flex items-center mb-2 ml-3">
          <span className="flex items-center justify-center h-9 w-9 rounded-full bg-yellow-100 mr-3">
            <svg
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold text-gray-900">
            Session Expiring Soon
          </span>
        </div>
        <div className="text-gray-700 text-base mb-8 flex justify-normal ml-15">
          This session will expire in&nbsp;
          <span className="font-bold text-[#1C1C3A]">{formatTime(timeLeft)}</span>
          &nbsp;min
        </div>
        <div className="flex justify-end gap-3 mr-10">
          <button
            onClick={handleStay}
            className="bg-[#1C1C3A] hover:cursor-pointer text-white font-semibold py-2 px-6 rounded"
          >
            Stay Logged In
          </button>
          <button
            onClick={handleLogout}
            className="hover:cursor-pointer border border-gray-400 text-gray-900 bg-white font-semibold py-2 px-6 rounded hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityTimer;