import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

interface User {
  username: string;
  email: string;
  password: string; // ✅ added password
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => void;
  logout: () => void;
  register: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (emailOrUsername: string, password: string) => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);

      if (
        (parsedUser.email === emailOrUsername || parsedUser.username === emailOrUsername) &&
        parsedUser.password === password
      ) {
        setUser(parsedUser);
        toast.success("Login successful 🎉");
      } else {
        toast.error("Invalid credentials ❌");
      }
    } else {
      toast.error("No user found. Please register first.");
    }
  };

  const register = (user: User) => {
    setUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
    toast.success("Registration successful ✅");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast("Logged out 👋", { icon: "🚪" });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
