import React, { useState } from "react";
import PropTypes from "prop-types";

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  size = "medium",
  className = "",
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const sizes = {
    small: "w-8 h-4",
    medium: "w-10 h-5",
    large: "w-12 h-6",
  };

  const thumbSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  };

  const baseClasses = `relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${sizes[size]}`;
  const backgroundClasses = isChecked ? "bg-blue-600" : "bg-gray-300";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const thumbClasses = `inline-block transform transition-transform duration-200 bg-white rounded-full shadow ${
    thumbSizes[size]
  } ${isChecked ? "translate-x-5" : "translate-x-0.5"}`;

  const switchClasses =
    `${baseClasses} ${backgroundClasses} ${disabledClasses} ${className}`.trim();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      disabled={disabled}
      className={switchClasses}
      {...props}
    >
      <span className={thumbClasses} />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default Switch;
