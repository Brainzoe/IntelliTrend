// src/components/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Extend the User type to optionally include avatar and displayName
interface User {
  id?: string;
  username: string;
  email: string;
  token?: string;
  role?: "user" | "admin";
  avatar?: string;
  displayName?: string;
}

interface HeaderProps {
  onSearch: (query: string) => void;
  categories: { label: string; path: string; icon: React.ReactNode }[];
}

const Header: React.FC<HeaderProps> = ({ onSearch, categories }) => {
  const { user, logout } = useAuth() as { user: User | null; logout: () => void };
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left section: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            IntelliTrend
          </h1>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full text-black outline-none"
          />
        </div>

        {/* Right section: Navigation + Auth Links (desktop only) */}
        <div className="hidden md:flex gap-6 items-center">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.path}
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              {category.icon}
              <span>{category.label}</span>
            </Link>
          ))}

          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-1 hover:text-blue-400"
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/150?img=3"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.displayName || user.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-blue-400 px-2 py-1 rounded hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-2">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-full text-black outline-none"
        />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative bg-white w-64 h-full shadow-lg z-50 transform transition-transform duration-300">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>

            <nav className="mt-16 flex flex-col gap-4 px-4 text-gray-800">
              {categories.map((category) => (
                <Link
                  key={category.label}
                  to={category.path}
                  className="flex items-center gap-2 hover:text-blue-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </Link>
              ))}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <img
                      src={user.avatar || "https://i.pravatar.cc/150?img=3"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.displayName || user.username}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                    className="text-left hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
