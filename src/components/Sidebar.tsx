import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, MessageSquare, Settings, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="flex md:flex-col w-full md:w-64 h-16 md:h-auto p-4 md:p-6 overflow-x-auto md:overflow-x-visible">
      <h2 className="text-xl md:text-2xl font-bold mb-0 md:mb-8 text-indigo-600 mr-4 md:mr-0 flex-shrink-0">
        Admin
      </h2>
      <nav className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin">
          <Home size={18} /> <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/posts">
          <FileText size={18} /> <span className="hidden md:inline">Posts</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/comments">
          <MessageSquare size={18} /> <span className="hidden md:inline">Comments</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/settings">
          <Settings size={18} /> <span className="hidden md:inline">Settings</span>
        </Link>
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
          <LogOut size={18} /> <span className="hidden md:inline">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
