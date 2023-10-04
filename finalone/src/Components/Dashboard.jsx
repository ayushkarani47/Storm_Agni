import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useMediaQuery } from 'react-responsive';
const Dashboard = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
      <div className="flex h-screen">
      {(!isMobile || isSidebarOpen) && <Sidebar />}
      <div className="flex-1 flex flex-col ">
        <Navbar isMobile={isMobile} toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
      {isMobile && (
        <div className="fixed bottom-0 hidden lg:block left-0 right-0 bg-blue-800 text-white p-2">
          <button className="p-4" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
    </div>
  )
}

export default Dashboard
