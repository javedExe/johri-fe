import React, { useState } from "react";
import resetPwdBg from "../../../assets/reset-pwd-bg.png";
import mobileLogo from "../../../assets/mobile-logo.png";
import { IoMdLock } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ResetPasswordMobile = () => {
  const navigate = useNavigate();
  const { updatePassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordMismatch = password && confirmPassword && password !== confirmPassword;
  const isPasswordTooShort = password && password.length < 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPasswordMismatch) {
      setError("Passwords do not match!");
      return;
    }

    if (isPasswordTooShort) {
      setError("Password must be at least 8 characters!");
      return;
    }

    setError(null);
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
    <main className="min-h-screen w-full m-0 flex flex-col">
      {/* Top Part */}
      <section
        className="relative flex flex-col justify-between bg-opacity-80 w-full h-[50vh] m-0 text-white px-4 pt-4 bg-cover bg-center brightness-110 bg-gradient-to-b from-black/50 to-black/50"
        style={{ backgroundImage: `url(${resetPwdBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0 z-0 h-[50vh]" />
        <div className="relative z-10 flex flex-col justify-between h-full px-0 pt-4">
          <div>
            <img src={mobileLogo} alt="Johri Logo" className="w-18 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-garamond">
              Elevate Your Signature Style.
            </h2>
            <div className="m-0">
              <ProgressIndicator currentStep={3} />
            </div>
          </div>
        </div>
      </section>

      {/* Password Reset Form */}
      <section className="bg-white bg-opacity-50 h-[50vh] px-4 py-4">
        <IoMdLock className="bg-purple-200 text-4xl font-bold border-none rounded-full text-purple-700 mb-2 p-2" />
        <h2 className="text-lg font-medium">Create New Password</h2>
        <h2 className="text-[11px] pb-3 text-gray-500">
          Create a new password and enter it again for confirmation.
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            {/* Password Field */}
            <div className="relative flex flex-col space-y-1">
              <label className="mb-1 text-gray-500 font-medium text-[12px]">
                New Password
              </label>
              <input
                maxLength={20}
                name="password"
                value={password}
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
            
                className={`border p-1 rounded bg-white outline-none placeholder:text-[11px] placeholder:text-gray-300 ${ isPasswordMismatch
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-end pb-4 text-gray-300 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FiEye className="h-3.5 w-3.5" />
                ) : (
                  <FiEyeOff className="h-3.5 w-3.5" />
                )}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative flex flex-col space-y-1">
              <label className="mb-1 text-gray-500 font-medium text-[12px]">
                Re-enter Password
              </label>
              <input
                maxLength={20}
                name="confirmPassword"
                value={confirmPassword}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Re-enter Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                
                className={`border p-1 rounded bg-white outline-none placeholder:text-[11px] placeholder:text-gray-300 ${
                  isPasswordMismatch ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-end pb-4 text-gray-300 cursor-pointer"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? (
                  <FiEye className="h-3.5 w-3.5" />
                ) : (
                  <FiEyeOff className="h-3.5 w-3.5" />
                )}
              </span>
            </div>

            {/* Error Message */}
            {error && <span className="text-red-500 text-xs">{error}</span>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`rounded text-xs p-2 mt-2 w-full cursor-pointer transition-all duration-150 ease-in-out ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white active:scale-98"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPasswordMobile;
