import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Image Panel */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/your-image.jpg)" }}
      >
        <div className="bg-black bg-opacity-40 w-full h-full flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-semibold mb-2">
            Unlock the World of <span className="font-bold">Johri.</span>
          </h1>
          <p className="text-lg">
            Log in for personalized picks and shimmering surprises.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-20 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.svg" alt="Johri Logo" className="h-10" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Log In
          </h2>

          {/* Email & Password Form */}
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                E-mail or phone number
              </label>
              <input
                type="email"
                placeholder="e.g.johndoe@email.com"
                className="input input-bordered w-full"
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-sm text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
              />
              <span
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>

              <div className="text-right mt-1">
                <a href="#" className="text-xs text-purple-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button className="btn btn-block bg-[#1c1b2f] text-white hover:bg-[#2b2a45]">
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(res) => console.log(res)}
              onError={() => console.log("Google login error")}
              width="100%"
              shape="pill"
              text="signin_with"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
