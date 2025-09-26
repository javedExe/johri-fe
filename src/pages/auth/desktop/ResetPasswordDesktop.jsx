import React, { useState } from "react";
// import resetPwdBg from "../../../assets/reset-pwd-bg.png";
import resetPwdBg2 from "../../../assets/resetPwdBg2.jpg";
import desktopLogo from "../../../assets/desktop-logo.png";
import { IoMdLock } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../../utils/ProgressIndicator";
import { useAuthStore } from "../../../store/useAuthStore";

const ResetPasswordDesktop = () => {
  const navigate = useNavigate();
  const { updatePassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setLoading(true);
    const result = await updatePassword(password, confirmPassword);
    setLoading(false);

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message || "Something went wrong");
    }
  };

  const passwordMismatch = password && confirmPassword && password !== confirmPassword;
  const passwordMatch = password && confirmPassword && password === confirmPassword;

  return (
    <main className="h-screen flex w-full overflow-hidden">
      {/* Left Image Panel */}
      <section
        className="relative min-h-screen w-[60vw] bg-cover bg-center brightness-110"
        style={{ backgroundImage: `url(${resetPwdBg2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0 z-0 h-full" />
        <div className="relative bg-opacity-40 w-full h-full flex flex-col justify-end pt-15 pb-5 px-8 text-white">
          <h1 className="text-5xl font-garamond mb-4 leading-15 max-w-sm">
            Elevate Your Signature Style.
          </h1>
          <div className="mb-3">
            <ProgressIndicator currentStep={3} custom="w-16" />
          </div>
        </div>
      </section>

      {/* Right Panel - Form */}
      <section className="flex flex-col p-10 w-[40vw] min-h-screen mx-6 px-2 lg:px-10 xl:px-20">
        <div className="mb-6">
          <img src={desktopLogo} alt="Johri Desktop Logo" />
        </div>

        <div className="min-h-[70vh] border-[1px] border-[#C0ACEC] bg-[#F9F7FD] bg-opacity-50 rounded-3xl px-10 py-15 2xl:pt-20  mt-2 justify-center">
          <IoMdLock className="bg-[#EFEAFA] text-4xl font-bold border-none rounded-full text-[#7F56D9] mb-2 p-2" />
          <h2 className="text-xl 2xl:text-3xl font-medium">Create New Password</h2>
          <h2 className="text-[14px] 2xl:text-sm pt-1 pb-4 text-gray-500">
            Create a new password and enter it again for confirmation.
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              {/* New Password */}
              <div className="relative flex flex-col space-y-2">
                <label className="mb-1 text-gray-500 text-sm 2xl:font-medium">New Password</label>
                <input
                  maxLength={20}
                  name="password"
                  value={password}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`border p-2 rounded bg-white outline-none placeholder:text-sm placeholder:text-gray-400 ${
                    passwordMismatch ? "border-red-500" : passwordMatch? "border-[#34C759]" :"border-gray-300"
                  }`}
                />
                <span
                  className="absolute top-[50px] transform -translate-y-1/2 right-3 text-gray-300 cursor-pointer pr-1"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ?  <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative flex flex-col space-y-2">
                <label className="mb-1 text-gray-500 text-sm 2xl:font-medium">Re-enter Password</label>
                <input
                  maxLength={20}
                  name="confirmPassword"
                  value={confirmPassword}
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Re-enter Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`border p-2 rounded bg-white outline-none placeholder:text-sm placeholder:text-gray-400 ${
                    passwordMismatch ? "border-red-500" : passwordMatch? "border-[#34C759]" :"border-gray-300"
                  }`}
                />
                <span
                  className="absolute top-[50px] transform -translate-y-1/2 right-3 text-gray-300 cursor-pointer pr-1"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FiEye /> :  <FiEyeOff />}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && <span className="text-red-500 text-sm mt-2 block">{error}</span>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1C1C3A] text-white rounded font-medium text-sm p-2 py-3 mt-4 w-full transition-all duration-150 active:scale-98 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordDesktop;
