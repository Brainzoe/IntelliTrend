// src/pages/AdminLogin.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, checkFirstAdmin, registerAdmin } = useAuth();

  const [form, setForm] = useState({ emailOrUsername: "", password: "", adminSecret: "" });
  const [requiresAdminSecret, setRequiresAdminSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkFirstAdmin().then((exists) => setRequiresAdminSecret(!exists));
  }, [checkFirstAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (requiresAdminSecret) {
        await registerAdmin({
          username: form.emailOrUsername,
          email: form.emailOrUsername,
          password: form.password,
          adminSecret: form.adminSecret,
        });
        alert("First admin registered! Please login.");
        setForm({ emailOrUsername: "", password: "", adminSecret: "" });
        setRequiresAdminSecret(false);
      } else {
        await login(form.emailOrUsername, form.password);
        navigate("/admin");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {requiresAdminSecret ? "Register First Admin" : "Admin Login"}
        </h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={form.emailOrUsername}
          onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        {requiresAdminSecret && (
          <input
            type="password"
            placeholder="Admin Secret"
            value={form.adminSecret}
            onChange={(e) => setForm({ ...form, adminSecret: e.target.value })}
            required
            className="w-full mb-4 px-3 py-2 border rounded"
          />
        )}

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : requiresAdminSecret ? "Register Admin" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
