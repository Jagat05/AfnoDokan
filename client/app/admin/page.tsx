"use client";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex-1 min-h-screen bg-gray-100 p-8">
      <div className="bg-indigo-600 p-8 rounded-3xl text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-indigo-100">
          Manage products, orders, users, and settings from here.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
