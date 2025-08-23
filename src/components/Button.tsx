import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 
                 text-white rounded-lg font-semibold shadow-md 
                 transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
