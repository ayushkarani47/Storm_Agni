// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white w-64 min-h-screen">
      <h2 className="text-xl font-semibold p-4">Admin Dashboard</h2>
      <ul className="py-2">
        <li className="px-4 py-2">Dashboard</li>
        <li className="px-4 py-2">Products</li>
        <li className="px-4 py-2">Orders</li>
        <li className="px-4 py-2">Customers</li>
      </ul>
    </div>
  );
};

export default Sidebar;
