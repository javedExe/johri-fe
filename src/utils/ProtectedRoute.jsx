import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children, requiredStep }) => {
  // const { authFlowStep } = localStorage.getItem("authFlowStep");

  const { authFlowStep } = useAuthStore();

  const allowedSteps = {
    otpSent: 1,
    otpVerified: 2,
  };

  console.log("authFlowStep:", authFlowStep);
  console.log("requiredStep:", requiredStep);

  if (
    !authFlowStep || // no progress saved
    !allowedSteps[requiredStep] // not enough progress
  ) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (!requiredStep || !allowedSteps[requiredStep]) {
    console.warn("Missing or invalid requiredStep in ProtectedRoute");
    return <Navigate to="/login" replace />;
  }

  return children;

  // const email = localStorage.getItem("resetEmail");
  // return email ? children : <Navigate to="/forgot-password" replace />;
};

export default ProtectedRoute;
