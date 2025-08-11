import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const AdminProtectedRoute = ({ children }) => {
  const {
    user,
    isInitializing,
    forceLogout,
    logout,
    clearForceLogout,
    isSessionLoading
  } = useAuthStore();
  const navigate = useNavigate();

    // Sestion initialize
  useEffect(() => {
    useAuthStore.getState().initializeSessionUser();
  
  }, []);


  useEffect(() => {
    if (forceLogout) {
      logout();
      clearForceLogout();
      navigate("/login", { replace: true });
    }
  }, [forceLogout]);

  if (isInitializing) return <div>Loading...</div>;
  if (isSessionLoading) return <div>Loading...</div>;


  if (!user || user.role_id !== 1) {
    return <Navigate to="/login" replace />;
  }


  return children;
};


export default AdminProtectedRoute;
