import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/background.jpg";
import mobileLogo from "../../../assets/mobile-logo.png";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";



const LoginMobile = () => {
  const navigate = useNavigate();

  const { validateForm, login } = useAuthStore();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");



  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      console.log(result.message);
      navigate("/admin/dashboard");
    } else {
      console.log(result.message);
      setErrors({ server: result.message || "Login failed" });
    }
  };



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "google-auth") {
      setGoogleError(
        "Google authentication failed. Please try again or use the correct account."
      );
    }
  }, []);

  return (
    <main
      className="relative min-h-screen w-full h-full m-0 bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-black/5 z-0 h-[40vh]" />

      {/* Top Part */}
      <section className="relative bg-opacity-40 w-full h-[40vh] flex flex-col text-white px-4 pt-18 pb-6">
        <img src={mobileLogo} alt="Johri Logo" className="w-18 h-8 mb-6" />
        <h2 className="text-2xl font-medium ">Unlock the World of Johri.</h2>
        <p className="text-white mt-2 text-xs leading-5">
          Join us for personalized picks and shimmering surprises.
        </p>
      </section>

      {/* Login form */}
      <section className="bg-white bg-opacity-50 m-0 h-[60vh] rounded-2xl rounded-b-none px-4 pb-6">
        <h2 className="text-xl font-medium pt-3 pb-3">Log In</h2>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col space-y-2 mb-2">
            <label className="mb-1 font-medium text-sm">E-mail</label>
            <input
              maxLength={20}
              name="username"
              value={formData.username}
              type="text"
              placeholder="e.g.johndoe@gmail.com"
              onChange={changeHandler}
              className="border text-xs border-gray-200 p-1.5 rounded bg-gray-50 active:bg-white outline-none placeholder:text-xs"
            />
            {errors?.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>

          <div className="flex flex-col space-y-2 mb-0 relative">
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              maxLength={20}
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={changeHandler}
              className="border border-gray-200 text-xs p-1.5 bg-gray-50 rounded active:bg-white outline-none placeholder:text-xs "
            />
            <span
              className="absolute right-3 top-[34px] text-gray-300 cursor-pointer pr-1"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <FiEyeOff className="w-3.5 h-3.5" />
              ) : (
                <FiEye className="w-3.5 h-3.5" />
              )}
            </span>

            {errors?.password && (
              <span className="text-red-500 mt-0 text-sm">
                {errors.password}
              </span>
            )}
          </div>

            {errors?.server && (
              <span className="text-red-500 text-sm">{errors.server}</span>
            )}
            
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                // className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                className="h-3 w-3 rounded cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-1 text-xs text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="text-xs text-purple-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-2 w-full cursor-pointer disabled:opacity-50"

            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? "Logging..." : "Log in"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>


                  {/* Google Login Failed Error message */}
          {googleError && (
            <div className="error text-red-500 text-sm mb-4">{googleError}</div>
          )}

        {/* Google Button */}
        <div className="flex justify-center">
          <a
            href="https://johri-be.onrender.com/auth/google?type=admin"
            className="flex items-center justify-center w-full gap-2 py-2 bg-white text-gray-700 font-medium  outline-1 outline-purple-500 rounded-md shadow-sm hover:shadow-md transition-all duration-150 active:scale-98 ease-in-out cursor-pointer text-sm"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Log in with Google
          </a>
        </div>
      </section>
    </main>
  );
};

export default LoginMobile;





