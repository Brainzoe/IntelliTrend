import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role || "User"}</p>
    </div>
  );
};

export default Dashboard;
