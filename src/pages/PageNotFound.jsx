import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold p-8">404 Page Not Found</h2>
      <div className="bg-black py-2 px-4 rounded-md mt-6 items-center">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-xl font-semibold text-white cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
