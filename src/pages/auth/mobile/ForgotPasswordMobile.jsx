import React, { useState } from "react";
import forgotPwdBg from "../../../assets/forgot-pwd-bg.png";
import mobileLogo from "../../../assets/mobile-logo.png";
import { GoArrowLeft } from "react-icons/go";
import { RiKeyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { useAuthStore } from "../../../store/useAuthStore";

const ForgotPasswordMobile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const { validateEmailOnly, sendOtp, isSendingOTP } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateEmailOnly(email);
    setError(errors);
    if (isValid) {
      const result = await sendOtp(email);
      if (result.success) {
        console.log("Navigating to /verification");
        navigate("/verification");
      } else {
        console.log("Error");
        setError({ email: result.message });
      }
    }
  };

  return (
    <main className="min-h-screen w-full m-0 flex flex-col">
      {/* Top Part */}
      <section
        className="relative flex flex-col justify-between bg-opacity-40 inset-0 w-full h-[50vh] m-0 text-white px-4 pt-4 bg-cover bg-center brightness-110"
        style={{ backgroundImage: `url(${forgotPwdBg})` }}
      >
        {/* Gradient Overlay using custom class */}
        <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-black/0 z-0 h-[50vh]" />

        <div className="relative z-10 flex flex-col justify-between h-full px-0 pt-4">
          <div>
            <img src={mobileLogo} alt="Johri Logo" className="w-18 h-8 " />
          </div>
          <div>
            <h2 className="text-3xl font-garamond">
              Crafted for Enduring Beauty.
            </h2>
            <div className="m-0">
              <ProgressIndicator currentStep={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password form */}
      <section className="bg-white bg-opacity-50 h-[50vh] px-4 py-4">
        <RiKeyLine className="bg-purple-200 text-3xl border-none rounded-full text-purple-600  p-2 w-9 h-9"></RiKeyLine>
        <h2 className="text-xl font-medium">Forgot Password</h2>
        <h2 className="text-xs font-medium pb-4 text-gray-500">
          Enter your email address to receive an OTP.
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 mb-4">
            <label className="mb-1 font-medium text-sm text-gray-600">
              E-mail
            </label>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-400 p-2 rounded bg-white text-sm outline-none placeholder:text-xs placeholder:text-black items-center"
            />
            {error?.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </div>

          <button
            type="submit"
            className={`bg-black text-white rounded font-medium text-sm p-2 m-0 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out ${
              isSendingOTP ? "opacity-50 cursor-not-allowed" : "active:scale-98"
            }`}
          >
            {isSendingOTP ? "Sending..." : "Send OTP"}
          </button>

          <button
            type="button"
            disabled={isSendingOTP}
            onClick={() => navigate("/login")}
            className="flex justify-center items-center bg-white border-[1px] border-gray-400 text-sm text-purple-500 rounded px-2 mt-2 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out"
          >
            <GoArrowLeft className="pr-3 text-4xl text-purple-500"></GoArrowLeft>
            Back
          </button>
        </form>
      </section>
    </main>
  );
};

export default ForgotPasswordMobile;
