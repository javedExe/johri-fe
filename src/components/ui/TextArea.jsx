import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  placeholder = "",
  value = "",
  onChange,
  rows = 4,
  disabled = false,
  resize = "vertical",
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-50"
    : "bg-white";

  const textAreaClasses =
    `${baseClasses} ${resizeClasses[resize]} ${disabledClasses} ${className}`.trim();

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className={textAreaClasses}
      {...props}
    />
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  resize: PropTypes.oneOf(["none", "vertical", "horizontal", "both"]),
  className: PropTypes.string,
};

export default TextArea;
