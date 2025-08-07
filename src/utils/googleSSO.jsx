import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const googleSSO = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuthStore();

  return useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:5173",
    onSuccess: async (codeResponse) => {
      console.log("Authorization code:", codeResponse.code);
      const result = await googleLogin(codeResponse.code);
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        console.error("Google login failed:", result.message);
      }
    },
    onError: () => {
      console.log("Google Log-In failed");
    },
  });
};

export default googleSSO;
