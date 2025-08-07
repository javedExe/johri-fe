import React from "react";
import PropTypes from "prop-types";

const EditText = ({
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full px-4 py-2 text-sm md:text-base border border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";

  const inputClasses = `${baseClasses} ${className}`.trim();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
};

EditText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default EditText;
