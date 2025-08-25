import React from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // assuming you have this

interface HeaderProps {
  onMenuClick?: () => void;
  onSearch: (query: string) => void;
  categories: { label: string; path: string; icon: React.ReactNode }[];
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearch, categories }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left section: Logo + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-700"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">IntelliTrend</h1>
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

        {/* Categories navigation */}
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

          {/* Auth Links */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-blue-400">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
