import React from "react";

const ProgressIndicator = ({ currentStep, custom }) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`w-10 h-1.5 gap-0.5 mb-6 rounded-full ${custom} ${
            currentStep === step ? "bg-purple-500" : "bg-white"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
