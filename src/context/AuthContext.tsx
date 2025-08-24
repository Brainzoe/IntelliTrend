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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (emailOrUsername: string, password: string, adminSecret?: string) => Promise<User>;
  logout: () => void;
  registerUser: (userData: { username: string; email: string; password: string }) => Promise<void>;
  registerAdmin: (adminData: { username: string; email: string; password: string; adminSecret: string }) => Promise<void>;
  checkFirstAdmin: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check if first admin exists
  const checkFirstAdmin = async (): Promise<boolean> => {
    try {
      const res = await axios.get(`${API_BASE}/auth/check-first-admin`);
      return res.data.exists;
    } catch (err) {
      console.error("Failed to check first admin", err);
      return true; // assume admin exists
    }
  };

  // Login (user or admin)
  const login = async (emailOrUsername: string, password: string, adminSecret?: string): Promise<User> => {
    try {
      const payload: any = { emailOrUsername, password };
      if (adminSecret) payload.adminSecret = adminSecret;

      const { data } = await axios.post(`${API_BASE}/auth/login`, payload);
      const loggedUser: User = { ...data.user, token: data.token };

      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));
      toast.success("Login successful 🎉");

      return loggedUser;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed ❌");
      throw err;
    }
  };

  // Normal user registration
  const registerUser = async (userData: { username: string; email: string; password: string }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { ...userData, role: "user" });
      toast.success("User registered successfully ✅");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register user ❌");
      throw err;
    }
  };

  // Admin registration
  const registerAdmin = async (adminData: { username: string; email: string; password: string; adminSecret: string }) => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { ...adminData, role: "admin" });
      toast.success("Admin registered successfully ✅");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register admin ❌");
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast("Logged out 👋", { icon: "🚪" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, registerUser, registerAdmin, checkFirstAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
