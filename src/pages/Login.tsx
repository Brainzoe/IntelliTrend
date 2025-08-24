// src/pages/Login.tsx
import React, { useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Transition } from "@headlessui/react";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [show, setShow] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedUser = await login(form.emailOrUsername, form.password);

      // Redirect based on role
      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // or "/dashboard"
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleForgotPasswordClick = () => {
    toast("Redirecting to Forgot Password page...", { icon: "🔑" });
  };

  const fields = [
    { name: "emailOrUsername", type: "text", placeholder: "Email or Username" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Transition
        as={Fragment}
        show={show}
        enter="transform transition duration-500 ease-out"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field, index) => (
              <Transition
                as={Fragment}
                key={field.name}
                appear
                show={show}
                enter={`transition duration-500 ease-out delay-${index * 150}`}
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
              >
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="
                    w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300
                    hover:scale-[1.02] hover:shadow-md
                  "
                  required
                />
              </Transition>
            ))}

            <Transition
              as={Fragment}
              appear
              show={show}
              enter="transition duration-500 ease-out delay-400"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
            >
              <button
                type="submit"
                className="
                  w-full py-3 rounded-lg text-white bg-blue-600
                  hover:bg-blue-700 transition transform duration-300
                  hover:scale-105 hover:shadow-lg
                "
              >
                Login
              </button>
            </Transition>
          </form>

          <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <Link
              to="/forgot-password"
              onClick={handleForgotPasswordClick}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <span>
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Login;
