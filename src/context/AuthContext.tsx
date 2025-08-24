// src/context/AuthContext.tsx
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = process.env.REACT_APP_API_BASE;

interface User {
  id?: string;
  username: string;
  email: string;
  token?: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // <-- add setUser
  login: (emailOrUsername: string, password: string, adminSecret?: string) => Promise<User>;
  logout: () => void;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
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
  const login = async (emailOrUsername: string, password: string, adminSecret?: string): Promise<User> => {
    try {
      const payload: any = { emailOrUsername, password };
      if (adminSecret) payload.adminSecret = adminSecret;

      const { data } = await axios.post(`${API_BASE}/auth/login`, payload);

      const loggedUser: User = { ...data.user, token: data.token };

      // Save user locally
      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));
      toast.success("Login successful 🎉");

      return loggedUser; // <-- return for page redirect
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed ❌");
      throw err;
    }
  };

  // 🚀 Normal user registration
  const register = async (userData: { username: string; email: string; password: string }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, userData);
      toast.success("Registration successful ✅");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  // 🚀 Admin registration
  const registerAdmin = async (adminData: {
    username: string;
    email: string;
    password: string;
    adminSecret: string;
  }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, {
        ...adminData,
        role: "admin",
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
    <AuthContext.Provider value={{ user, setUser, login, logout, register, registerAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
