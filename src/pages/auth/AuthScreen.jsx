import React, { useEffect, useState } from "react";
import LoginDesktop from "./desktop/LoginDesktop";
import LoginMobile from "./mobile/LoginMobile";
import WelcomeMobile from "./mobile/WelcomeMobile";
import ForgotPasswordDesktop from "./desktop/ForgotPasswordDesktop";
import ForgotPasswordMobile from "./mobile/ForgotPasswordMobile";
import VerificationDesktop from "./desktop/VerificationDesktop";
import VerificationMobile from "./mobile/VerificationMobile";
import { useLocation } from "react-router-dom";
import ResetPasswordDesktop from "./desktop/ResetPasswordDesktop";
import ResetPasswordMobile from "./mobile/ResetPasswordMobile";
import DashboardMobile from "./mobile/DashboardMobile";
import DashboardDesktop from "./desktop/DashboardDesktop";

const AuthScreen = () => {
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const path = location.pathname;
  return (
    <main>
      {path === "/" && (isMobile ? <WelcomeMobile /> : <LoginDesktop />)}

      {path === "/login" && (isMobile ? <LoginMobile /> : <LoginDesktop />)}

      {/* {path === "/admin/dashboard" &&
        (isMobile ? <DashboardMobile /> : <DashboardDesktop />)} */}

      {path === "/forgot-password" &&
        (isMobile ? <ForgotPasswordMobile /> : <ForgotPasswordDesktop />)}

      {path === "/reset-password" &&
        (isMobile ? <ResetPasswordMobile /> : <ResetPasswordDesktop />)}

      {path === "/verification" &&
        (isMobile ? <VerificationMobile /> : <VerificationDesktop />)}
    </main>
  );
};

export default AuthScreen;
