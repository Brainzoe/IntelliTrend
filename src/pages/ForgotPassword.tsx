// src/pages/ForgotPassword.tsx
import React, { useState, Fragment } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/auth/request-password-reset`, { email });
      setMessage("If your email exists, a password reset link has been sent!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to request password reset");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Transition
        as={Fragment}
        show={show}
        enter="transform transition duration-500 ease-out"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Forgot Password
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-700 text-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-300 hover:scale-[1.02] hover:shadow-md
            "
            required
          />

          <button
            type="submit"
            className="
              w-full py-3 rounded-lg text-white bg-blue-600
              hover:bg-blue-700 transition transform duration-300
              hover:scale-105 hover:shadow-lg
            "
          >
            Send Reset Link
          </button>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </Transition>
    </div>
  );
};

export default ForgotPassword;
