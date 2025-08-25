// src/components/Sidebar2.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Category {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface Sidebar2Props {
  categories: Category[];
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// User type
export interface User {
  name: string;
  email: string;
  avatar?: string;
}

const Sidebar2: React.FC<Sidebar2Props> = ({
  categories,
  onCategorySelect,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth() as { user: User | null };

  return (
    <aside
      className={`
        bg-gray-100 p-4 space-y-4
        absolute md:relative top-0 left-0 h-full
        transition-transform transform
        ${isOpen ? "translate-x-0" : "-translate-x-56 md:translate-x-0"}
        w-56 md:w-64
        z-50
      `}
      style={{ minWidth: "200px" }}
    >
      {/* User profile */}
      {user && (
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=3"}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2"
          />
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}

      {/* Categories */}
      <nav className="flex flex-col gap-2">
        {categories.map((category) => (
          <Link
            key={category.label}
            to={category.path}
            onClick={() => onCategorySelect(category.label)}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition"
          >
            {category.icon}
            <span>{category.label}</span>
          </Link>
        ))}
      </nav>

      {/* Close button on mobile */}
      <button
        className="mt-4 md:hidden text-red-500 hover:text-red-700"
        onClick={onClose}
      >
        Close
      </button>
    </aside>
  );
};

export default Sidebar2;
