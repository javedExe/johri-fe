import React from "react";
import PropTypes from "prop-types";

const PagerIndicator = ({
  totalPages = 5,
  currentPage = 0,
  onPageChange,
  size = "medium",
  variant = "default",
  className = "",
  ...props
}) => {
  const handlePageClick = (pageIndex) => {
    if (onPageChange && pageIndex !== currentPage) {
      onPageChange(pageIndex);
    }
  };

  const sizes = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  const variants = {
    default: {
      active: "bg-blue-600",
      inactive: "bg-gray-300 hover:bg-gray-400",
    },
    light: {
      active: "bg-white",
      inactive: "bg-white bg-opacity-50 hover:bg-opacity-75",
    },
  };

  const baseClasses = `rounded-full transition-colors duration-200 cursor-pointer ${sizes[size]}`;

  return (
    <div
      className={`flex items-center justify-center space-x-2 ${className}`}
      {...props}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index)}
          className={`${baseClasses} ${
            index === currentPage
              ? variants[variant].active
              : variants[variant].inactive
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

PagerIndicator.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["default", "light"]),
  className: PropTypes.string,
};

export default PagerIndicator;
