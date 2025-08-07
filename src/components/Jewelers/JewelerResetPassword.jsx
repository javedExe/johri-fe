import React, { useState } from "react";
import resetPwdBg from "../../assets/jewler-reset-passowrd-bg.png";
import desktopLogo from "../../assets/desktop-logo.png";
import mobileLogo from "../../assets/mobile-logo.png";
import { IoMdLock } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../utils/ProgressIndicator";
import { useAuthStore } from "../../store/useAuthStore";

export default function JewelerResetPassword() {
  const navigate = useNavigate();
  const { updatePassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    const result = await updatePassword(password, confirmPassword);
    setLoading(false);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message || "Something went wrong");
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Panel */}
      <section
        className="relative w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${resetPwdBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 text-white">
          <h1 className="font-garamond font-bold max-md:relative max-md:-left-2 leading-tight text-xl md:text-5xl max-w-md">
            Elevate Your Signature Style.
          </h1>
          <div className="mt-4">
            <ProgressIndicator currentStep={3} custom="w-16 md:w-20" />
          </div>
        </div>
      </section>

      {/* Right Panel */}
      <section className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Logo */}
        <img
          src={mobileLogo}
          alt="Johri Logo"
          className="absolute top-8 block md:hidden mb-6 w-[80px] md:w-auto self-start left-4 "
        />
        <img
          src={desktopLogo}
          alt="Johri Logo"
          className="max-md:hidden block mb-6 w-32 md:w-auto self-start relative left-16"
        />

        {/* Form Card */}
        <div className="w-full max-w-md bg-purple-50 border border-purple-200 rounded-3xl p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center mb-6">
            <IoMdLock className="w-12 h-12 text-purple-700 bg-purple-100 p-2 rounded-full mb-2" />
            <h2 className="text-xl md:text-2xl font-medium">
              Create New Password
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Create a new password and enter it again for confirmation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <label className="block text-gray-500 font-medium mb-1">
                New Password
              </label>
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 bg-white rounded p-2 pr-10 outline-none"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-500 font-medium mb-1">
                Re-enter Password
              </label>
              <input
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Re-enter Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 bg-white rounded p-2 pr-10 outline-none"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full py-3 text-white rounded ${
                loading ? " bg-gray-400" : "bg-black hover:bg-gray-800"
              } transition`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
