import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JewelerWelcomeMobile from "./JewelerWelcomeMobile";

export default function JewelerLogin() {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Too short"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
    }),

    onSubmit: (values, { setErrors }) => {
      console.log("Jeweler Login Form submitted:\t", values);

      if(values.username == "javed1234" && values.password == "@Javed1234"){
        console.log("Logged In..");
        navigate("/jeweler/dashboard");
      }else {
        setErrors({
        password: "Username and Password must be correct."
      });
      }
    },
  });

  if (isMobile) {
    return <JewelerWelcomeMobile isMobile={isMobile} setIsMobile={setIsMobile} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white overflow-hidden">
      {/* Left side with background image */}
      <div className="w-full md:w-3/5 lg:w-2/3 bg-[url(https://c.animaapp.com/mcuskllpmdj9Iy/img/gemini-generated-image-2wqgo2wqgo2wqgo2-1.png)] bg-cover bg-center relative min-h-[300px] md:min-h-screen flex flex-col justify-end pb-10 md:pb-20">
        <div className="px-6 md:px-12 lg:px-16">
          <p className="text-white font-medium text-3xl md:text-4xl lg:text-5xl xl:text-6xl [font-family:'Inter',Helvetica] mb-4 md:mb-8 max-w-3xl">
            Unlock the World of Johri.
          </p>
          <p className="text-white font-normal text-lg md:text-xl lg:text-2xl xl:text-3xl [font-family:'Inter',Helvetica] max-w-3xl">
            Log in for personalized picks and shimmering surprises.
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center justify-center p-6 md:p-8 lg:p-12"
      >
        <div className="self-start mb-6">
          <img className="w-16 h-auto" alt="Logo" src="https://c.animaapp.com/mcuskllpmdj9Iy/img/logo-v2.png" />
        </div>

        <div className="w-full max-w-md bg-[#f8f6fd] rounded-3xl border border-solid border-[#bfabec] p-6 md:p-8 lg:p-10">
          <div className="flex items-center mb-8">
            <div className="flex w-12 h-12 items-center justify-center bg-[#efeafa] rounded-full mr-4">
              <img className="w-6 h-6" alt="Icon loginoutlined" src="https://c.animaapp.com/mcuskllpmdj9Iy/img/icon---loginoutlined.svg" />
            </div>
            <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#1c1c3a] text-2xl md:text-3xl">
              Log In
            </h1>
          </div>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block font-medium text-[#333333] text-sm mb-2">Username</label>
            <div className="w-full h-12 bg-white rounded-md border border-solid border-[#d9d9d9] flex items-center">
              <input
                type="text"
                name="username"
                placeholder="e.g. john.doe009"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full h-12 px-3 text-sm outline-none"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block font-medium text-[#333333] text-sm mb-2">Password</label>
            <div className="w-full h-12 bg-white rounded-md border border-solid border-[#d9d9d9] flex items-center">
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full h-12 px-3 text-sm outline-none"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="w-[15px] h-[15px]"
              />
              <span className="text-[#000000e0] text-sm">Remember me</span>
            </label>
            <Link to="/jeweler-forgot-password" className="text-[#7f56d9] text-sm font-medium">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="w-full h-12 bg-[#1c1c3a] text-white rounded-md mb-8">
            Log in
          </button>

          {/* OR divider */}
          <div className="flex items-center justify-center mb-6">
            <img className="w-[30%] h-px object-cover" alt="Line" src="https://c.animaapp.com/mcuskllpmdj9Iy/img/line-1.svg" />
            <div className="mx-4 text-[#7f7f7f] text-sm">or</div>
            <img className="w-[30%] h-px object-cover" alt="Line" src="https://c.animaapp.com/mcuskllpmdj9Iy/img/line-1.svg" />
          </div>

          <button
            type="button"
            onClick={() => setIsMobile(false)}
            className="w-full h-12 bg-white border border-[#7f56d9] rounded-lg flex items-center justify-center"
          >
            <img className="w-6 h-6 mr-3" alt="Google" src="https://c.animaapp.com/mcuskllpmdj9Iy/img/image-6.png" />
            <span className="text-[#1c1c3a] text-sm">Log in with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
