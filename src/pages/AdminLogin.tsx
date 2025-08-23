import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE as string;

  // form state
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
    adminSecret: "",
  });

  // extra states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresAdminSecret, setRequiresAdminSecret] = useState(false);

  type FormField = {
    name: keyof typeof form;
    label: string;
    type: string;
    placeholder: string;
  };

  const fields: FormField[] = [
    { name: "emailOrUsername", label: "Email or Username", type: "text", placeholder: "Enter email or username" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
  ];

  if (requiresAdminSecret) {
    fields.push({ name: "adminSecret", label: "Admin Secret", type: "password", placeholder: "Enter admin secret" });
  }

  // Check if first admin exists
  useEffect(() => {
    const checkFirstAdmin = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/check-first-admin`);
        if (!res.ok) throw new Error("Failed to check first admin");
        const data = await res.json();
        setRequiresAdminSecret(!data.exists);
      } catch (err) {
        console.error("Failed to check first admin:", err);
        setRequiresAdminSecret(false); // fallback: assume admin exists
      }
    };
    checkFirstAdmin();
  }, [API_BASE]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = requiresAdminSecret
        ? `${API_BASE}/auth/register` // first admin registration
        : `${API_BASE}/auth/login`;   // normal login

      const body: any = requiresAdminSecret
        ? {
            username: form.emailOrUsername,
            email: form.emailOrUsername,
            password: form.password,
            role: "admin",
            adminSecret: form.adminSecret,
          }
        : {
            emailOrUsername: form.emailOrUsername,
            password: form.password,
          };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Request failed");

      if (requiresAdminSecret) {
        alert("First admin registered successfully! Please login.");
        setForm({ emailOrUsername: "", password: "", adminSecret: "" });
        setRequiresAdminSecret(false); // switch to login mode
      } else {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {requiresAdminSecret ? "Register First Admin" : "Admin Login"}
        </h2>

        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.name] as string}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : requiresAdminSecret ? "Register Admin" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
