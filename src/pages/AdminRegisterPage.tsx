// src/pages/AdminRegisterPage.tsx
import React from "react";
import AdminRegisterForm from "../components/AdminRegisterForm";

const AdminRegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AdminRegisterForm />
    </div>
  );
};

export default AdminRegisterPage;
