import React, { useState, useEffect, useRef } from "react";
import verifyOTPbg from "../../assets/jeweler-otp-verfication.png";
import desktopLogo from "../../assets/desktop-logo.png";
import mobileLogo from "../../assets/mobile-logo.png";
import { IoMdMail } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../utils/ProgressIndicator";

export default function JewelerOtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [error, setError] = useState("");

  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  useEffect(() => {
    inputRefs.current[0].current.focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      inputRefs.current[idx + 1].current.focus();
    }
  };

  const handleKey = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[idx]) {
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1].current.focus();
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1].current.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputRefs.current[idx + 1].current.focus();
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(300);
    // call sendOtp...
  };

  const handleVerify = () => {
    console.log(
      "OTP Value:",
      otp.some((d) => !d)
    );

    if (otp.some((d) => !d)) {
      console.log(" Fill error\t", otp);
      setError("Please fill all digits.");
      return;
    }
    console.log("some:\t", otp);
    // call verifyOtp inside promise...
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Left panel */}
      <section
        className="relative w-full md:w-1/2 h-60 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${verifyOTPbg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative  flex flex-col justify-between h-full p-6 md:p-12 text-white">
          <h1 className="relative top-[50%]  md:top-[45%] text-2xl md:text-5xl font-garamond leading-tight max-w-md">
            Discover Timeless Craftsmanship.
          </h1>
          <ProgressIndicator currentStep={2} custom="w-16 md:w-20" />
        </div>
      </section>

      {/* Right panel */}
      <section className="w-full md:w-1/2 flex flex-col justify-start md:justify-center items-center p-4 sm:p-6 md:p-10 lg:p-16">
        <img
          src={desktopLogo}
          alt="Johri"
          className="mb-6 absolute hidden md:block md:self-start  md:relative md:left-10"
        />
        <img
          src={mobileLogo}
          alt="Johri"
          className="mb-6 absolute top-[32px] left-[16px] block md:hidden "
        />

        <div className="w-full max-w-md bg-purple-50 border border-purple-200 rounded-3xl p-6 md:p-10">
          <div className="flex flex-col items-center">
            <IoMdMail className="w-12 h-12 text-purple-500 mb-2 bg-purple-100 rounded-full p-2" />
            <h2 className="text-2xl md:text-4xl font-medium mb-2">
              Verification
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              For added security, please enter the OTP sent to your email
              address.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-4">
            {otp.map((d, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                inputMode="numeric"
                ref={inputRefs.current[i]}
                value={d}
                // disabled={isExpired}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKey(e, i)}
                className="w-10 h-12 md:w-12 md:h-14 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-lg"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="text-center text-gray-500 text-sm mb-6">
            <button
              onClick={handleResend}
              className="text-purple-600 font-medium"
            >
              Resend Code
            </button>
          </div>
          <button
            onClick={handleVerify}
            // disabled={isExpired || otp.some((d) => !d)}
            disabled={otp.some((d) => !d)}
            className={`w-full py-3 text-white rounded ${
              otp.some((d) => !d)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } transition`}
          >
            Verify OTP
          </button>
          {/* <button
            onClick={handleVerify}
            // disabled={isExpired || otp.some((d) => !d)}
            className={`w-full py-3 text-white rounded ${
              isExpired || otp.some((d) => !d)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } transition`}
          >
            Verify OTP
          </button> */}

          <button
            onClick={() => navigate("/forgot-password")}
            className="flex justify-center items-center w-full mt-4 py-2 text-purple-500 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <GoArrowLeft className="mr-2" />
            Back
          </button>
        </div>
      </section>
    </main>
  );
}
