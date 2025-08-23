// src/components/AdminRegisterForm.tsx
import React, { useState, Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import axios from "axios";

type FormData = {
  username: string;
  email: string;
  password: string;
  adminSecret: string;
};

type FormKeys = keyof FormData;

interface Field {
  name: FormKeys;
  placeholder: string;
  type: string;
}

const AdminRegisterForm: React.FC = () => {
  const { user, registerAdmin } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    adminSecret: "",
  });
  const [loading, setLoading] = useState(false);
  const [show] = useState(true);
  const [firstAdminExists, setFirstAdminExists] = useState<boolean | null>(null);

  // On mount, ask backend if first admin already exists
  useEffect(() => {
    const checkFirstAdmin = async () => {
      try {
        const res = await axios.get("/api/auth/check-first-admin");
        setFirstAdminExists(res.data.exists);
      } catch (err) {
        console.error("Failed to check first admin:", err);
        setFirstAdminExists(true); // assume exists if error
      }
    };
    checkFirstAdmin();
  }, []);

  if (firstAdminExists === null) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const isFirstAdmin = !firstAdminExists; // backend says no admin yet
  const isAdmin = user?.role === "admin";

  if (!isFirstAdmin && !isAdmin) {
    return (
      <div className="p-4 text-center text-red-600">
        Only admins can register new admins.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name as FormKeys]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Username, email, and password are required!");
      return;
    }

    if (isFirstAdmin && !formData.adminSecret) {
      toast.error("Admin Secret is required for the first admin!");
      return;
    }

    setLoading(true);
    try {
      await registerAdmin(formData);
      toast.success("Admin registered successfully!");
      setFormData({ username: "", email: "", password: "", adminSecret: "" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to register admin");
    } finally {
      setLoading(false);
    }
  };

  const fields: Field[] = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    ...(isFirstAdmin
      ? ([{ name: "adminSecret", type: "password", placeholder: "Admin Secret Key" }] as Field[])
      : []),
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Transition
        as={Fragment}
        show={show}
        enter="transform transition duration-500 ease-out"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            {isFirstAdmin ? "Register First Admin" : "Register New Admin"}
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
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    transition-all duration-300
                    hover:scale-[1.02] hover:shadow-md
                  "
                />
              </Transition>
            ))}

            <Transition
              as={Fragment}
              appear
              show={show}
              enter="transition duration-500 ease-out delay-500"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
            >
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-2 rounded text-white bg-green-600 hover:bg-green-700
                  transition transform duration-300
                  hover:scale-105 hover:shadow-lg
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {loading ? "Registering..." : "Register Admin"}
              </button>
            </Transition>
          </form>
        </div>
      </Transition>
    </div>
  );
};

export default AdminRegisterForm;
