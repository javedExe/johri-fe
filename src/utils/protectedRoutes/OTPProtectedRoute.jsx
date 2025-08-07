// components/OTPProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const OTPProtectedRoute = ({ children, requiredStep }) => {
  const { authFlowStep } = useAuthStore();

  const allowedSteps = {
    otpSent: 1,
    otpVerified: 2,
  };

  if (!authFlowStep || !allowedSteps[requiredStep]) {
    return <Navigate to="/forgot-password" replace />;
  }
  if (!requiredStep || !allowedSteps[requiredStep]) {
    console.warn("Missing or invalid requiredStep in ProtectedRoute");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default OTPProtectedRoute;
