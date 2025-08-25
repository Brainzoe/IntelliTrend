//Pages/Dashboard
// src/pages/Dashboard.tsx
import React from "react";
import { LayoutDashboard, Settings, LogOut, User, Bell, BarChart3, FileText, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect if needed, e.g., navigate("/")
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Welcome, {user?.displayName || user?.username}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Role: {user?.role || "User"} | Email: {user?.email}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <User className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-4 h-4 inline mr-2" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <LayoutDashboard className="w-5 h-5" /> Overview
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              See your overall activities and performance summary.
            </p>
            <a
              href="#"
              className="block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Overview
            </a>
          </div>

          {/* Reports Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <FileText className="w-5 h-5" /> Reports
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Access and download your activity or performance reports.
            </p>
            <a
              href="#"
              className="block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Reports
            </a>
          </div>

          {/* Analytics Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <BarChart3 className="w-5 h-5" /> Analytics
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Track your progress with detailed analytics.
            </p>
            <a
              href="#"
              className="block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Open Analytics
            </a>
          </div>

          {/* Messages Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <MessageSquare className="w-5 h-5" /> Messages
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Communicate with support or other users.
            </p>
            <a
              href="#"
              className="block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Messages
            </a>
          </div>

          {/* Settings Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <Settings className="w-5 h-5" /> Settings
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Manage your profile and preferences.
            </p>
            <a
              href="#"
              className="block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Settings
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
