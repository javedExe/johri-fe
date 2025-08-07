import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const OtpView = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  autoFocus = true,
  className = "",
  ...props
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length);
      const paddedOtp = [
        ...otpArray,
        ...Array(length - otpArray.length).fill(""),
      ];
      setOtp(paddedOtp);
    }
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index, digit) => {
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    if (onChange) {
      onChange(otpValue);
    }

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (
      onComplete &&
      newOtp.every((d) => d !== "") &&
      newOtp.length === length
    ) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        if (onChange) {
          onChange(newOtp.join(""));
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    const pastedArray = pastedData.split("").slice(0, length);
    const newOtp = [
      ...pastedArray,
      ...Array(length - pastedArray.length).fill(""),
    ];

    setOtp(newOtp);
    if (onChange) {
      onChange(newOtp.join(""));
    }

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex]?.focus();

    // Call onComplete if all fields are filled
    if (onComplete && newOtp.every((d) => d !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const baseInputClasses =
    "w-12 h-12 text-center text-lg font-medium border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-50"
    : "bg-white hover:border-gray-400";

  return (
    <div
      className={`flex items-center justify-center space-x-2 ${className}`}
      {...props}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`${baseInputClasses} ${disabledClasses} ${
            digit ? "border-blue-500" : "border-gray-300"
          }`}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

OtpView.propTypes = {
  length: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
};

export default OtpView;
