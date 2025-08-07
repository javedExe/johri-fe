import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-button-1 text-button-2 hover:bg-opacity-90 focus:ring-blue-500",
    secondary:
      "bg-white text-button-1 border border-button-1 hover:bg-gray-50 focus:ring-blue-500",
    outline:
      "bg-transparent text-button-1 border border-button-1 hover:bg-button-1 hover:text-button-2 focus:ring-blue-500",
  };

  const sizes = {
    small: "px-3 py-2 text-sm rounded-md",
    medium: "px-4 py-2 text-sm rounded-lg",
    large: "px-6 py-3 text-base rounded-lg",
  };

  const buttonClasses =
    `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
