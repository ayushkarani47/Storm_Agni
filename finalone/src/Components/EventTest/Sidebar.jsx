import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-200 p-4 h-screen w-1/4">
      <nav>
        <ul>
          <li>
            <a href="#">Event Overview</a>
          </li>
          <li>
            <a href="#">Chat Page</a>
          </li>
          <li>
            <a href="#">Calendar</a>
          </li>
          <li>
            <a href="#">Budget Management</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
