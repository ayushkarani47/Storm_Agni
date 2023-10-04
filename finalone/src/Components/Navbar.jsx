import React from 'react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-[#628de3] p-4">
      <div className="flex justify-between ">
        <button
          className="text-white block lg:hidden"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        
        <h1 className="text-blue-600 text-2xl font-bold">Greetings, Client</h1>
      </div>
    </nav>
  );
};

export default Navbar;
