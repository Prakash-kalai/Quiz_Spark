import React from "react";

const PrimaryButton = ({ children, className = '', onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ${className}`}
  >
    {children}
  </button>
);

export default PrimaryButton;
