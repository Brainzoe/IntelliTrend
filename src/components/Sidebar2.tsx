// src/components/Sidebar2.tsx
import React from "react";

interface Category {
  label: string;
  icon: string; // ✅ updated to string so we can use imported SVGs
}

interface Sidebar2Props {
  onSearch: (query: string) => void;
  categories: Category[];
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar2: React.FC<Sidebar2Props> = ({
  onSearch,
  categories,
  onCategorySelect,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-3">
          {categories.map(({ label, icon }) => (
            <li key={label}>
              <button
                className="flex items-center space-x-2 text-blue-600 hover:underline"
                onClick={() => {
                  onCategorySelect(label);
                  onClose();
                }}
              >
                <img src={icon} alt={`${label} icon`} className="h-5 w-5" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
