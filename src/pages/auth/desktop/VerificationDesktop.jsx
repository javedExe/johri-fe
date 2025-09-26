import React, { useState, useEffect, useRef } from "react";
// import verifyOTPbg from "../../../assets/verify-otp-bg.png";
import verifyOTPbg2 from "../../../assets/verifyOTPbg2.jpg";
import desktopLogo from "../../../assets/desktop-logo.png";
import { IoMdMail } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { useAuthStore } from "../../../store/useAuthStore";

const TIMER_STORAGE_KEY = "otpExpiryTimestamp";

const VerificationDesktop = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const { verifyOtp, sendOtp } = useAuthStore();

  // Use useRef to keep refs stable across renders
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  // Initialize timer from sessionStorage expiry or default 300 sec
  const [timer, setTimer] = useState(() => {
    const savedExpiry = sessionStorage.getItem(TIMER_STORAGE_KEY);
    if (savedExpiry) {
      const expiry = parseInt(savedExpiry, 10);
      const now = Date.now();
      if (expiry > now) {
        return Math.floor((expiry - now) / 1000);
      }
      sessionStorage.removeItem(TIMER_STORAGE_KEY);
      return 0;
    }
    return 300;
  });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [isExpired, setIsExpired] = useState(timer <= 0);

  useEffect(() => {
    if (error) setError("");
  }, [otp]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0].current.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setIsExpired(true);
      sessionStorage.removeItem(TIMER_STORAGE_KEY);
      return;
    }

    // Save updated expiry timestamp on timer change
    sessionStorage.setItem(TIMER_STORAGE_KEY, (Date.now() + timer * 1000).toString());

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsExpired(true);
          sessionStorage.removeItem(TIMER_STORAGE_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].current.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].current.focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(""));
    setIsExpired(false);

    // Save new expiry timestamp on resend
    const newExpiry = Date.now() + 300 * 1000;
    sessionStorage.setItem(TIMER_STORAGE_KEY, newExpiry.toString());
    setTimer(300);

    const result = await sendOtp(email);
    console.log("result: ", result);

    if (result.success) {
      inputRefs.current[0].current.focus();
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
    const result = await verifyOtp(email, enteredOtp);
    console.log("Verification: ", result);

    if (result.success) {
      // Clear expiry timestamp on successful verify
      sessionStorage.removeItem(TIMER_STORAGE_KEY);
      navigate("/reset-password", { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* left image panel */}
      <section
        className="relative h-screen w-[60vw] bg-cover bg-center brightness-110"
        style={{ backgroundImage: `url(${verifyOTPbg2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-black/0 z-0 h-full" />
        <div className="relative bg-opacity-40 w-full h-full flex flex-col justify-end m-0 pt-15 pb-5 px-8 text-white">
          <h1 className="text-5xl font-garamond mt-40 leading-[1.2] max-w-xl">
            Discover Timeless Craftsmanship.
          </h1>
          <div className="mb-3 flex justify-start">
            <ProgressIndicator currentStep={2} custom="w-16" />
          </div>
        </div>
      </section>

      {/* Right panel */}
      <section className="flex flex-col p-10 w-[40vw] h-screen ml-6 mr-6 px-2 lg:px-10 xl:px-20">
        <div className="mb-6">
          <img src={desktopLogo} alt="Johri Desktop Logo" />
        </div>

        <div className="border-[1px] border-purple-200 bg-purple-50 bg-opacity-50 rounded-3xl px-10 pt-20 pb-20 mt-2 justify-center">
          <IoMdMail className="bg-[#EFEAFA] text-4xl font-bold border-none rounded-full text-[#7F56D9] mb-2 p-2" />
          <h2 className="text-4xl font-medium">Verification</h2>
          <p className="text-xs font-medium pt-1 pb-4 text-gray-500">
            For added security, please enter the OTP sent to your email address.
          </p>

          <p className="text-gray-500 font-medium mt-1">Enter OTP</p>

          <div className="flex justify-between mb-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={inputRefs.current[index]}
                disabled={isExpired}
                autoComplete="one-time-code"
                aria-label={`OTP Digit ${index + 1}`}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 2xl:w-12 2xl:h-12 text-center border-[1px] border-gray-300 bg-white rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ))}
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}

          <p className="text-xs text-gray-400 font-medium mb-6">
            Didn't receive a code?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={handleResend}
            >
              Resend Code
            </span>{" "}
          </p>

          <button
            onClick={handleVerifyOTP}
            disabled={isExpired || otp.includes("")}
            className={`bg-[#1C1C3A] text-white rounded font-medium text-sm p-2 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out  ${
              isExpired || otp.includes("") ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Verify OTP
          </button>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="flex justify-center items-center bg-white border-[1px] border-[#CCCCCC] text-sm text-[#7F56D9] rounded px-2 mt-3 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out"
          >
            <GoArrowLeft className="pr-3 text-4xl text-[#7F56D9]"></GoArrowLeft>
            Back
          </button>

          <div className="text-center mt-6 text-gray-600">
            {timer > 0 ? (
              <p>
                OTP will expire in{" "}
                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                {String(timer % 60).padStart(2, "0")} minutes
              </p>
            ) : (
              // <button
              //   onClick={() => navigate("/forgot-password")}
              //   className="flex justify-center items-center bg-white border-[1px] border-gray-300 text-sm text-purple-500 rounded px-2 mt-3 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out"
              // >
              //   <GoArrowLeft className="pr-3 text-4xl text-purple-500" />
              //   Back
              // </button>
              <span></span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerificationDesktop;