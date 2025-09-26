import { Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
// import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import GoogleOAuthCallback from "./pages/GoogleOAuthCallback";
import InactivityTimer from "./utils/InactivityTimer";



// Desktop Screens
import LoginDesktop from "./pages/auth/desktop/LoginDesktop";
import VerificationDesktop from "./pages/auth/desktop/VerificationDesktop";
import ResetPasswordDesktop from "./pages/auth/desktop/ResetPasswordDesktop";
import ForgotPasswordDesktop from "./pages/auth/desktop/ForgotPasswordDesktop";

// Mobile Screens
import WelcomeMobile from "./pages/auth/mobile/WelcomeMobile";
import LoginMobile from "./pages/auth/mobile/LoginMobile";
import ForgotPasswordMobile from "./pages/auth/mobile/ForgotPasswordMobile";
import VerificationMobile from "./pages/auth/mobile/VerificationMobile";
import ResetPasswordMobile from "./pages/auth/mobile/ResetPasswordMobile";

// Admin Dashboard Routes
// import Users from "./components/dashboard/Users/Users";
import Jewelers from "./components/Jewelers/Jewelers";
import Products from "./components/dashboard/Products";
import Offers from "./components/dashboard/Offers";
import Support from "./components/dashboard/Support";
import Analytics from "./components/dashboard/Analytics";
import Settings from "./components/dashboard/Settings";
import DashboardDesktop from "./pages/auth/desktop/DashboardDesktop";
import DashboardHome from "./components/dashboard/DashboardHome";
import AdminProtectedRoute from "./utils/protectedRoutes/AdminProtectedRoute";
import OTPProtectedRoute from "./utils/protectedRoutes/OTPProtectedRoute";
import CategoryManagement from "./components/dashboard/CategoryManagement";
import PackageManagement from "./components/dashboard/PackageManagement";
import Invoice from "./components/dashboard/invoice/Invoice";
import User from "./components/dashboard/user/User";


// // Jeweller Routes
// import JewelerLogin from "./components/Jewelers/JewelerLogin";
// import JewelerForgetPassword from "./components/Jewelers/JewelerForgotPassword";
// import JewelerOtpVerification from "./components/Jewelers/JewelerOtpVerfication";
// import JewelerResetPassword from "./components/Jewelers/JewelerResetPassword";

// // Jeweler Dashboard Routes
// import JewelerDashboardDesktop from "./components/Jewelers/jewelerDashboard/JewelerDashboardDesktop";
// import Profile from "./components/Jewelers/jewelerDashboard/desktop/profile/Profile";
// import PersonalInformation from "./components/Jewelers/jewelerDashboard/desktop/profile/PersonalInformation";
// import BusinessInformation from "./components/Jewelers/jewelerDashboard/desktop/profile/BusinessInformation";
// import WorkingHours from "./components/Jewelers/jewelerDashboard/desktop/profile/WorkingHours";




function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const initializeFromStorage = useAuthStore(
    (state) => state.initializeFromStorage
  );
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const forceLogout = useAuthStore((state) => state.forceLogout);
  const publicRoutes = ["/login", "/forgot-password", "/reset-password", "/verification", "/oauth-callback"];
  const showInactivityTimer = isLoggedIn && !publicRoutes.includes(location.pathname);
  

  const loggedIn = async () => {
    const response = await useAuthStore.getState().fetchSessionUser();

    if(response.success === true){
      navigate("/admin/dashboard", { replace: true })
    }

  }
  
  useEffect(() => {
    initializeFromStorage();
    loggedIn();
  }, []);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (forceLogout) {
      useAuthStore.setState({ forceLogout: false });
      navigate("/login", { replace: true });
    }
  }, [forceLogout, navigate]);

  const handleLogout = () => {
    useAuthStore.setState({ forceLogout: true });
  };

  if (isInitializing) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>
    );
  }

  // if (loading) return <div>Loading...</div>;


  return (
    <div>

      {showInactivityTimer && <InactivityTimer onLogout={handleLogout} />}

      {/* Admin (Spuer user) Route Start */}

      <Routes>
        <Route
          path="/login"
          element={isMobile ? <LoginMobile /> : <LoginDesktop />}
        />

        <Route
          path="/oauth-callback"
          element={<GoogleOAuthCallback />}
        />

        <Route
          path="/"
          element={isMobile ? <WelcomeMobile /> : <LoginDesktop />}
        />
        <Route
          path="/forgot-password"
          element={
            isMobile ? <ForgotPasswordMobile /> : <ForgotPasswordDesktop />
          }
        />
        <Route
          path="/verification"
          element={
            <OTPProtectedRoute requiredStep="otpSent">
              {
              isMobile ? <VerificationMobile /> : <VerificationDesktop />
              }
            </OTPProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <OTPProtectedRoute requiredStep="otpVerified">
              {
              isMobile ? <ResetPasswordMobile /> : <ResetPasswordDesktop />
              }
            </OTPProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <DashboardDesktop />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<User />} />
          <Route path="jewelers" element={<Jewelers />} />
          <Route path="products" element={<Products />} />
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="package-management" element={<PackageManagement />} />
          <Route path="invoice-management" element={<Invoice />} />
          <Route path="offers" element={<Offers />} />
          <Route path="support" element={<Support />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>


          {/* Admin (Spuer user) Route End */}




          {/* Jeweler Route Start */}
{/* 
        <Route
          path="/jeweler"
          element={<JewelerLogin />}
        />
        
        <Route
          path="/jeweler/login"
          element={<JewelerLogin />}
        />

        <Route
          path="/jeweler-forgot-password"
          element={<JewelerForgetPassword />}
        />

        <Route
          path="/jeweler/verification"
          element={<JewelerOtpVerification />}
        />

        <Route
          path="/jeweler/reset-password"
          element={<JewelerResetPassword />}
        />
 */}


      {/* Jeweler Dashboard */}
        {/* <Route
          path="/jeweler/dashboard"
          element={
            <AdminProtectedRoute>
              <JewelerDashboardDesktop />
            </AdminProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />}>
              <Route index element={<PersonalInformation />} />
              <Route path="business-informationt" element={<BusinessInformation />} />
              <Route path="working-hours" element={<WorkingHours />} />
          </Route>

          <Route path="users" element={<Users />} />
          <Route path="jewelers" element={<Jewelers />} />
          <Route path="products" element={<Products />} />
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="package-management" element={<PackageManagement />} />
        </Route> */}




        {/* Jeweler Route End */}

        

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App;
