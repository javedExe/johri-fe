import React, { useState } from "react";
// import forgotPwdBg from "../../../assets/forgot-pwd-bg.png";
import forgotPwdBg2 from "../../../assets/forgotPwdBg2.jpg";
import desktopLogo from "../../../assets/desktop-logo.png";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { RiKeyLine } from "react-icons/ri";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { useAuthStore } from "../../../store/useAuthStore";

const ForgotPasswordDesktop = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const { validateEmailOnly, sendOtp, isSendingOTP } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateEmailOnly(email);
    setError(errors);
    console.log("error: ",error);
    console.log("Errors: ",errors);
    if (isValid) {
      const result = await sendOtp(email);
      console.log(result);
      if (result.success) {
                  // Save new expiry timestamp on resend
        const newExpiry = Date.now() + 300 * 1000;
        sessionStorage.setItem("otpExpiryTimestamp", newExpiry.toString());
        navigate("/verification");
      } else {
        console.log("Error");
        setError({ email: result.message });
      }
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* left image panel */}
      <section
        className="relative min-h-screen w-[60vw] bg-cover bg-center brightness-110"
        style={{
          backgroundImage: `url(${forgotPwdBg2})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-black/30 to-black/0 z-0 h-full" />

        <div className="relative bg-opacity-40 w-full h-full flex flex-col justify-end pt-15 pb-8 px-8 text-white">
          <h1 className="text-5xl font-garamond mb-2 leading-[1.2] max-w-md">
            Crafted for Enduring Beauty.
          </h1>
          <div className="mb-3">
            <ProgressIndicator currentStep={1} custom="w-16" />
          </div>
        </div>
      </section>

      {/* right panel - login form */}
      <section className="flex flex-col p-10  w-[40vw] min-h-screen mx-6 px-2 lg:px-10 xl:px-20">
        <div className="mb-6">
          {/* logo */}
          <img src={desktopLogo} alt="Johri Desktop Logo" />
        </div>

        <div className="min-h-[70vh] border-[1px] border-[#C0ACEC] bg-[#F9F7FD] bg-opacity-50  rounded-3xl px-10 pt-10 pb-20 2xl:pt-20 mt-2 flex-col justify-center">
          <RiKeyLine className="bg-[#EFEAFA] text-4xl font-bold border-none rounded-full text-[#7F56D9] mb-2 p-2"></RiKeyLine>
          <h2 className="text-4xl font-medium">Forgot Password</h2>
          <h2 className="text-sm pt-1 pb-4 text-gray-500">
            Enter your email address to receive an OTP.
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col space-y-2 mb-6">
              <label htmlFor="email" className="mb-1 text-gray-500 font-medium">
                E-mail
              </label>
              <input
                name="email"
                value={email}
                type="email"
                placeholder="johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-[#D9D9D9] p-2 rounded bg-white active:bg-white outline-none placeholder:text-sm"
              />
              {error?.email && (
                <span className="text-red-500 text-sm ">{error.email}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSendingOTP}
              className={`bg-[#1C1C3A] text-white rounded font-medium text-sm p-2 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out ${
                isSendingOTP
                  ? "opacity-50 cursor-not-allowed"
                  : "active:scale-98"
              }`}
            >
              {isSendingOTP ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex justify-center items-center bg-white border-[1px] border-[#CCCCCC] text-sm text-[#7F56D9] rounded px-2 mt-3 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out"
            >
              <GoArrowLeft className="pr-3 text-4xl text-[#7F56D9]"></GoArrowLeft>
              Back
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordDesktop;
