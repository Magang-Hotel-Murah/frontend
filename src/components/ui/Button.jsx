import React, { useState } from "react";
import { Loader } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md",
    outline: "border-2 border-primary-400 text-primary-600 hover:bg-primary-50",
    started:
      "bg-white text-primary-600 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2",
    ghost: "text-gray-700 hover:bg-gray-100",
    demo: "bg-white text-gray-700 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-gray-200",
    gradient:
      "group bg-gradient-to-r from-primary-600 to-yellow-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2",
    submit:
      "flex-1 bg-primary-500 text-white py-2.5 px-6 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium",
    reset:
      "px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium",
    tambah:
      "px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <Loader className="animate-spin" size={16} />}
      {children}
    </button>
  );
};

export default Button;
