import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const GoogleOAuthCallback = () => {
  const navigate = useNavigate();
  const setGoogleAuthtoken = useAuthStore((state) => state.setGoogleAuthtoken);

    useEffect(() => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);

    setGoogleAuthtoken(token);


    navigate("/admin/dashboard");

  } else {
    console.log("error: /login")
    navigate("/login");
  }
}, []);


  return <p>Logging you in...</p>;
};
export default GoogleOAuthCallback;