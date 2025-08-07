import React from "react";
import { useNavigate } from "react-router-dom";
import IconArrowleftoutlined from "../../icons/IconEyeinvisibleoutlined/IconArrowleftoutlined";

export default function JewelerForgetPassword() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Background image shown at top in mobile, left in desktop */}
      <div className="w-full md:w-3/5 lg:w-2/3 bg-[url(https://c.animaapp.com/mcxqxz11LjRgJ3/img/image-13.png)] bg-cover bg-center relative h-60 md:h-auto">
        <div className="absolute bottom-6 md:bottom-24 left-0 right-0 flex justify-center md:justify-start md:left-[108px] px-4">
          <div className="inline-flex items-center gap-2.5">
            <div className="bg-[#7575bc] w-12 md:w-[60px] h-2 rounded-3xl" />
            <div className="bg-[#dcdcee] border border-white w-12 md:w-[60px] h-2 rounded-3xl" />
            <div className="bg-[#dcdcee] border border-white w-12 md:w-[60px] h-2 rounded-3xl" />
          </div>
        </div>

        <div className="absolute bottom-20 md:bottom-36 left-4 md:left-[108px] text-white text-xl md:text-3xl lg:text-5xl font-bold leading-snug max-w-xs md:max-w-full">
          Crafted for Enduring Beauty.
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Logo */}
        <div className="self-start mb-4 md:mb-6">
          <div className="w-20 h-10">
            <div className="relative h-10">
              <img
                className="w-[73px] h-[33px]"
                alt="Johri"
                src="https://c.animaapp.com/mcxqxz11LjRgJ3/img/johri.svg"
              />
              <img
                className="absolute w-4 h-3.5 top-0 left-16"
                alt="Union"
                src="https://c.animaapp.com/mcxqxz11LjRgJ3/img/union.svg"
              />
            </div>
          </div>
        </div>

        {/* Forgot Password Form */}
        <form
          id="jeweler-forgot-password-form"
          onSubmit={(e) => {
            e.preventDefault();

            // Handle form submission logic here
            const form = e.target;
            const formData = new FormData(form);
            const data = {};

            for (let [key, value] of formData.entries()) {
              data[key] = value;
            }
            console.log("Forgot Password Form submitted:\t", data);
          }}
          className="w-full max-w-md bg-[#f8f6fd] rounded-3xl border border-solid border-[#bfabec] p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center mb-6 md:mb-8">
            <div className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center bg-[#efeafa] rounded-full mr-3 md:mr-4">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                alt="Frame"
                src="https://c.animaapp.com/mcxqxz11LjRgJ3/img/frame.svg"
              />
            </div>
            <h1 className="text-lg md:text-2xl font-medium text-[#1c1c3a]">
              Forget Password
            </h1>
          </div>

          <p className="text-sm text-[#666666] mb-4 md:mb-6">
            Enter your phone number to receive a OTP.
          </p>

          {/* Phone Field */}
          <div className="mb-4 md:mb-6">
            <label className="block font-medium text-[#425466] text-sm mb-1.5">
              Phone Number
            </label>
            <div className="w-full h-12 bg-white rounded-md border border-[#d9d9d9] px-3 flex items-center">
              <div className="flex items-center gap-2 py-1 w-full">
                <div className="inline-flex items-center gap-1">
                  <img
                    className="w-4 h-4 object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/mcxqxz11LjRgJ3/img/image-12.png"
                  />
                  <div className="text-black">+91</div>
                  <img
                    className="w-4 h-4"
                    alt="Icon"
                    src="https://c.animaapp.com/mcxqxz11LjRgJ3/img/icon---downoutlined.svg"
                  />
                </div>
                <div className="text-[#33333380]">|</div>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[6-9]{1}[0-9]{9}"
                  placeholder="9876543210"
                  className="flex-1 outline-none text-sm text-black"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    if (
                      e.target.value.length === 1 &&
                      !/^[6-9]$/.test(e.target.value)
                    ) {
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="cursor-pointer w-full h-12 bg-[#1c1c3a] text-white rounded-md mb-4 shadow"
          >
            Send OTP
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="w-full cursor-pointer h-12 bg-white text-[#7f56d9] border border-[#cccccc] rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <IconArrowleftoutlined className="w-5 h-5" />
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
