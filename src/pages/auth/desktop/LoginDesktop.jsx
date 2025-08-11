import { useState } from "react";
import backgroundImage from "../../../assets/background.jpg";
import desktopLogo from "../../../assets/desktop-logo.png";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import googleSSO from "../../../utils/googleSSO";

const LoginDesktop = () => {
  const navigate = useNavigate();
  const googleLoginButton = googleSSO();

  const [formData, setFormData] = useState({ username: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const { validateForm, login } = useAuthStore();

const changeHandler = (e) => {
  const { name, type, checked, value } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value
  });

  console.log(formData);
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


    // Only for testing
    if (result.test) {
      console.log("Local");
      navigate("/admin/dashboard");
    }

    console.log("Me: ", result);


    // Actual implementesion
    if (result.success) {
      console.log(result?.response?.data?.message || "Login successful.");
      // console.log(result.response.data.message);
      navigate("/admin/dashboard");

    } else {
      console.log(result.message);
      setErrors({ server: result.message || "Login failed" });
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* left image panel */}
      <section
        className=" min-h-screen w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${backgroundImage})`,
        }}
      >
        <div className="bg-opacity-40 w-full h-full flex flex-col justify-end py-15 px-8 text-white">
          <h1 className="text-6xl font-semibold mb-4">
            Unlock the World of Johri.
          </h1>
          <p className="text-sm">
            Log in for personalized picks and shimmering surprises.
          </p>
        </div>
      </section>

      {/* right panel - login form */}
      <section className="flex flex-col p-10 w-1/2 min-h-screen ml-6 mr-6">
        <div className="mb-4">
          {/* logo */}
          <img src={desktopLogo} alt="Johri Desktop Logo" />
        </div>

        <div className="border-[1px] border-purple-300 bg-purple-50 bg-opacity-50  rounded-3xl p-10 mt-2 justify-center">
          <h2 className="text-3xl pb-3 font-medium">Log In</h2>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col space-y-2 mb-2">
              <label className="mb-0 ">E-mail</label>
              <input
                name="username"
                value={formData.username}
                type="email"
                placeholder="e.g.johndoe@gmail.com"
                onChange={changeHandler}
                required
                className="text-sm border border-gray-300 p-2 rounded bg-white active:bg-white outline-none placeholder:text-sm"
              />
              {errors?.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>

            <div className="flex flex-col space-y-2 mb-0 relative">
              <label className="block mb-0 ">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={changeHandler}
                required
                className="text-sm border border-gray-300 p-2 rounded bg-white active:bg-white outline-none placeholder:text-sm"
              />
              <span
                className="absolute right-3 top-[38px] text-gray-300 cursor-pointer pr-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEye /> : <FiEyeOff /> }
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
                  name="rememberMe"
                  className="h-3 w-3 text-purple-500 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                  checked={formData.rememberMe}
                  // onChange={(e) => setRememberMe(e.target.checked)}
                  onChange={changeHandler}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="bg-black text-white rounded p-2 w-full cursor-pointer transition-all duration-150 active:scale-98 ease-in-out disabled:opacity-50"
              disabled={loading || !formData.username || !formData.password}
            >
              {loading ? "Submitting..." : "Log in"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-md text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <button
              onClick={googleLoginButton}
              className="flex items-center justify-center w-full gap-2 px-6 py-2 bg-white text-gray-700 font-medium  outline-1 outline-purple-500 rounded-md shadow-sm hover:shadow-md transition-all duration-150 active:scale-98 ease-in-out cursor-pointer"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Log in with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginDesktop;
