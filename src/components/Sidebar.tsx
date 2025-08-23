import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, MessageSquare, Settings, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 shadow-lg h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 text-indigo-600">Admin</h2>
      <nav className="space-y-4">
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin">
          <Home size={18} /> <span>Dashboard</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/posts">
          <FileText size={18} /> <span>Posts</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/comments">
          <MessageSquare size={18} /> <span>Comments</span>
        </Link>
        <Link className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600" to="/admin/settings">
          <Settings size={18} /> <span>Settings</span>
        </Link>
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
