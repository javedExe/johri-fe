import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Settings = () => {
  const handleLogout = () => {
    useAuthStore.getState().logout();
  };

  return (
    <div className="text-black">
      <div  className="flex justify-center items-center"><button onClick={handleLogout} className="bg-red-300 p-1 rounded-sm btn hover:cursor-pointer">Log Out</button></div>
      
    </div>
  );
};

export default Settings;
