import React, { useState } from "react";
import PropTypes from "prop-types";

const ChipItem = ({
  children,
  selected = false,
  onClick,
  variant = "default",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center rounded transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1";

  const variants = {
    default: selected
      ? "bg-blue-100 text-blue-800 border border-blue-300"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    gold: "bg-white text-gray-700 border border-yellow-400",
    silver: "bg-white text-gray-700 border border-gray-400",
    blue: "bg-white text-gray-700 border border-blue-400",
    green: "bg-white text-gray-700 border border-green-400",
    gray: "bg-white text-gray-700 border border-gray-300",
  };

  const sizes = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base",
  };

  const chipClasses =
    `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  return (
    <span
      onClick={onClick}
      className={chipClasses}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </span>
  );
};

const ChipView = ({ children, className = "", gap = "gap-2", ...props }) => {
  const baseClasses = `flex flex-wrap items-center ${gap}`;
  const chipViewClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={chipViewClasses} {...props}>
      {children}
    </div>
  );
};

ChipItem.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "default",
    "gold",
    "silver",
    "blue",
    "green",
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

ChipView.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gap: PropTypes.string,
};

export { ChipView, ChipItem };
export default ChipView;
