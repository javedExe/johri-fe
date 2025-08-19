import React, { useState, useEffect } from "react";
import verifyOTPbg from "../../../assets/verify-otp-bg.png";
import mobileLogo from "../../../assets/mobile-logo.png";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { IoMdMail } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

const VerificationMobile = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const { verifyOtp, sendOtp } = useAuthStore();

  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300);
  const [error, setError] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (error) setError("");
  }, [otp]);

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  // useEffect(() => {
  //   const filled = otp.every((digit) => digit !== "");
  //   if (filled && !isExpired) {
  //     handleVerifyOTP();
  //   }
  // }, [otp, isExpired]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default backspace behavior
      const newOtp = [...otp];

      if (otp[index]) {
        // If current box has a digit, clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous box and clear it
        inputRefs[index - 1].current.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
    // Allow arrow key navigation
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(""));
    setTimer(300);
    // resend API
    const result = await sendOtp(email);
    if (result.success) {
      inputRefs[0].current.focus();
      // navigate("/verification");
    } else {
      setError(result.message);
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    // verify OTP API
    const result = await verifyOtp(email, enteredOtp);

    if (result.success) {
      navigate("/reset-password", { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen w-full m-0 flex flex-col">
      {/* Top Part */}
      <section
        className="relative flex flex-col justify-between bg-opacity-40 w-full h-[50vh] m-0 text-white px-4 pt-4 bg-cover bg-center brightness-110"
        style={{ backgroundImage: `url(${verifyOTPbg})` }}
      >
        {/* Gradient Overlay using custom class */}
        <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-black/0 z-0 h-[50vh]" />

        <div className="relative z-10 flex flex-col justify-between h-full px-0 pt-4">
          <div>
            <img src={mobileLogo} alt="Johri Logo" className="w-18 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-garamond">
              Discover Timeless Craftsmanship.
            </h2>
            <div className="m-0">
              <ProgressIndicator currentStep={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password form */}
      <section className="bg-white bg-opacity-50 h-[50vh] px-4 py-4 ">
        <IoMdMail className="bg-purple-200 text-3xl border-none rounded-full text-[#7F56D9]  p-2 w-9 h-9"></IoMdMail>
        <h2 className="text-xl font-medium">Verification</h2>
        <h2 className="text-xs font-medium pb-2 text-gray-500">
          For added security, please enter the OTP sent to your email address.
        </h2>

        <p className="text-gray-700 font-medium mt-1">Enter OTP</p>

        <div className="flex justify-between mb-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={inputRefs[index]}
              disabled={isExpired}
              autoComplete="one-time-code"
              aria-label={`OTP Digit ${index + 1}`}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-8 justify-between text-center border-[1px] border-purple-400 bg-white rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}

        <p className="text-xs text-gray-600 mb-6">
          Didn't receive a code?{" "}
          <span
            className="text-[#7F56D9] font-bold cursor-pointer"
            onClick={handleResend}
          >
            Resend Code
          </span>{" "}
        </p>

        <button
          onClick={handleVerifyOTP}
          disabled={isExpired || otp.includes("")}
          className={`bg-black text-white rounded text-sm p-2 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out ${
            isExpired || otp.includes("") ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Verify OTP
        </button>

        <div className="text-center text-xs mt-6 text-gray-600">
          {timer > 0 ? (
            <p>
              OTP will expire in{" "}
              {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")} minutes
            </p>
          ) : (
            <button
              onClick={() => navigate("/forgot-password")}
              className="flex justify-center items-center bg-white border-[1px] border-gray-300 text-sm text-purple-500 rounded px-2 mt-3 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out"
            >
              <GoArrowLeft className="pr-3 text-4xl text-purple-500"></GoArrowLeft>
              Back
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default VerificationMobile;
