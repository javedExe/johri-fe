// components/AuthProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const AuthProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthProtectedRoute;
