//src/context/AuthContext.tsx

import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface User {
    username: string;
    email: string;
    password?: string;
    token?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    login: (emailOrUsername: string, password: string) => void;
    logout: () => void;
    register: (userData: { username: string; email: string; password: string }) => Promise<void>; // ✅ async, password required
  }
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("authUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const { data } = await axios.post("https://your-backend-url.onrender.com/api/auth/login", { email, password });
            const user = { ...data.user, token: data.token };
            setUser(user);
            localStorage.setItem("authUser", JSON.stringify(user));
            toast.success("Login successful 🎉");
            navigate(user.role === "admin" ? "/admin" : "/dashboard");
        } catch {
            toast.error("Invalid credentials ❌");
        }
    };

    const register = async (userData: { username: string; email: string; password: string }): Promise<void> => {
        try {
            await axios.post("https://your-backend-url.onrender.com/api/auth/register", userData);
            toast.success("Registration successful ✅");
            navigate("/login");
        } catch {
            toast.error("Registration failed ❌");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
        toast("Logged out 👋", { icon: "🚪" });
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
