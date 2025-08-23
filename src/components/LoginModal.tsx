import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 ease-out"
      enterFrom="opacity-0 translate-y-10"
      enterTo="opacity-100 translate-y-0"
      leave="transition duration-200 ease-in"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-10"
      afterLeave={() => setShow(false)}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center z-50"
          onClick={(e) => e.stopPropagation()} // prevent overlay click closing
        >
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            You must be logged in to perform this action.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default LoginModal;
