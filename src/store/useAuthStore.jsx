import axios from "../utils/axiosInstance";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authEmail: null,
  authFlowStep: localStorage.getItem("authFlowStep") || null,

  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,

  isAuthLoading: true,

  isAdmin: false,

  isLoggingIn: false,
  isLoggedIn: false,
  isSendingOTP: false,
  isVerifyingOTP: false,
  otpVerified: false,
  isResettingPassword: false,
  isLoggingOut: false,

  isInitializing: true,
  isSessionLoading: true,
  forceLogout: false,

  initializeFromStorage: () => {
    try {
      const token = localStorage.getItem("token");
      const userJSON = localStorage.getItem("user");
      const user = userJSON ? JSON.parse(userJSON) : null;

      if (token && user) {
        set({
          token,
          user,
          isAdmin: user?.isAdmin || false,
          isInitializing: false,
          // isLoggedIn: true,
          forceLogout: false, // reset on init
        });
      } else {
        set({
          token: null,
          user: null,
          isAdmin: false,
          isInitializing: false,
          isLoggedIn: false,
          forceLogout: false,
        });
      }
    } catch (error) {
      console.error("Failed to initialize from storage", error);
      set({
        token: null,
        user: null,
        isLoggedIn: false,
        isAdmin: false,
        isInitializing: false,
        forceLogout: false,
      });
    }
  },


    //Session Storage Initialization
  initializeSessionUser: async () => {
  try {
    const response = await axios.get("/auth/session", { withCredentials: true });
    const user = response.data.user;

    set({
      user,
      isAdmin: user?.isAdmin || user?.role_id === 1,
      isLoggedIn: true,
      isInitializing: false,
      isSessionLoading: false,
    });
  } catch (error) {
    console.log(error);
    set({
      user: null,
      isAdmin: false,
      isLoggedIn: false,
      isInitializing: false,
      isSessionLoading: false,
    });
  }
},


  setGoogleAuthtoken: (token) => {

    set({
      user: null,
      token,
      isAdmin: true,
      isLoggedIn: true,
    });

    localStorage.setItem('token', token);

  },

  setAuthEmail: (email) => {
    set({ authEmail: email });
    localStorage.setItem("resetEmail", email);
  },

  setAuthFlowStep: (step) => {
    set({ authFlowStep: step });
    localStorage.setItem("authFlowStep", step);
  },

  resetAuthFlow: () => {
    set({ authEmail: null, authFlowStep: null });
    localStorage.removeItem("resetEmail");
  },

  validateForm: (formData) => {
    const errors = {};
    let isValid = true;

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) {
      errors.username = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.username)) {
      errors.username = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    return { isValid, errors };
  },

  validateEmailOnly: (email) => {
    const errors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    return { isValid, errors };
  },



  fetchSessionUser: async () => {
    try {
      const res = await axios.get("/auth/session");
      const user = res.data.user;

      set({
        user,
        isAdmin: user?.isAdmin || false,
        token: true, // fake token to keep logic unchanged
      });

      return { success: true, user };
    } catch (err) {
      localStorage.removeItem("lastActivity");
      return { success: false, err };
    }
  },


login: async (credentials) => {
  set({ isLoggingIn: true });

  try {
    const response = await axios.post("/auth/login", credentials, {
      withCredentials: true,
    });

    const { token, user } = response.data;
    
    set({
      user,
      token,
      isAdmin: user?.isAdmin || user?.role_id === 1,
      isLoggedIn: true,
    });

    localStorage.setItem('token', token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    set({ user: null, isAdmin: false, isLoggedIn: false });
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  } finally {
    set({ isLoggingIn: false });
  }
},




  googleLogin: async (code) => {
    set({ isLoggingIn: true });
    try {
      // const response = await axios.post("/admin/auth/google-login", {
      const response = await axios.get("/auth/google", {
        code,
      });

      const { user, token } = response.data;
      set({
        user,
        token,
        isAdmin: user?.isAdmin || false,
        isLoggedIn: true,
      });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      console.log("Login successful");
      return response.data;
    } catch (error) {
      set({ user: null, isAdmin: false, isLoggedIn: false });
      const message = error?.response?.data?.message || "Google Login failed";
      return { success: false, message };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  sendOtp: async (email) => {
    const { setAuthFlowStep } = get();
    localStorage.setItem("resetEmail", email);
    set({ isSendingOTP: true });
    // OTP logic
    try {
      const response = await axios.post("/forgot-password/initiate", { identifier: email });

      // console.log("API response:", response.data);
      // console.log(response.status);

      // if (response.data.success) {
      if (response.status == 200) {
        setAuthFlowStep("otpSent");
        // setStatus("isSendingOTP", true);
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Failed to send OTP",
      };
    } finally {
      set({ isSendingOTP: false });
    }
  },

  verifyOtp: async (email, otp) => {
    const { setAuthFlowStep } = get();
    set({ isVerifyingOTP: true });
    try {
      const response = await axios.post("/forgot-password/verify-otp", {
        identifier: email,
        otp,
      });

      // console.log(response);

      // if (response.data.success) {
      if (response.status == 200) {
        setAuthFlowStep("otpVerified");
        localStorage.setItem("token", response.data.token);
        set({ otpVerified: true });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid OTP or server error.";
      return { success: false, message };
    } finally {
      set({ isVerifyingOTP: false });
    }
  },

  updatePassword: async (password, confirmPassword) => {
    const email = localStorage.getItem("resetEmail");
    const token = localStorage.getItem("token");
    set({ isResettingPassword: true });
    try {
      // const response = await axios.post("/reset-password", {
      const response = await axios.post("/forgot-password/reset", {
        identifier: email,
        newPassword: password,
        confirmPassword,
        token
      });

      // console.log("auth: ", response);

      // if (response.data.success) {
      if (response.status == 200) {
        set({ authFlowStep: null });
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update password",
      };
    } finally {
      set({ isResettingPassword: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("resetEmail");
    set({
      token: null,
      user: null,
      isAdmin: false,
      authEmail: null,
      authFlowStep: null,
      isLoggingIn: false,
      isLoggedIn: false,
      isSendingOTP: false,
      isVerifyingOTP: false,
      otpVerified: false,
      isResettingPassword: false,
      isLoggingOut: false,
      forceLogout: false,
    });
  },

  forceLogoutAction: () => {
    // This action will be called by the axios interceptor on 401
    set({ forceLogout: true });
  },

  clearForceLogout: () => {
    // Use this to clear the flag after handling logout in UI or routing
    set({ forceLogout: false });
  },
}));
