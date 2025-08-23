import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API_BASE = process.env.REACT_APP_API_BASE;

export const login = async (emailOrUsername: string, password: string, adminSecret?: string) => {
  const response = await fetch(`${API_BASE}/auth/admin-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrUsername, password, adminSecret }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  return await response.json();
};


interface User {
  username: string;
  email: string;
  password?: string;
  token?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string, adminSecret?: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  registerAdmin: (adminData: {
    username: string;
    email: string;
    password: string;
    adminSecret: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🚀 Login (supports optional adminSecret)
  const login = async (emailOrUsername: string, password: string, adminSecret?: string) => {
    try {
      const payload: any = { emailOrUsername, password };
      if (adminSecret) payload.adminSecret = adminSecret;

      const { data } = await axios.post(`${API_BASE}/auth/login`, payload);

      const loggedUser = { ...data.user, token: data.token };

      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));
      toast.success("Login successful 🎉");
      navigate(loggedUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  // 🚀 Normal user registration
  const register = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, userData);
      toast.success("Registration successful ✅");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  // 🚀 Admin registration (backend enforces the secret)
  const registerAdmin = async (adminData: {
    username: string;
    email: string;
    password: string;
    adminSecret: string;
  }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, {
        username: adminData.username,
        email: adminData.email,
        password: adminData.password,
        role: "admin",
        adminSecret: adminData.adminSecret, // pass secret to backend
      });

      toast.success("Admin registered successfully ✅");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register admin ❌");
    }
  };

  // 🚀 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast("Logged out 👋", { icon: "🚪" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, registerAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
