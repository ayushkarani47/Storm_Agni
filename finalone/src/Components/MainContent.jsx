// src/components/MainContent.js
import React from 'react';
import Calendar from './Calendar';
import Chat from './Chat';
import { Link } from 'react-router-dom';
import Event from './EventPage/Event';
import EventList from './EventPage/EventList';
import EventTable from './EventTest/EventTable';
import BudgetManagement from './EventTest/BudgetManagement';
import HostEvent from './EventTest/HostEvent';
const MainContent = () => {
  return (
    <main className="bg-[#f5f8fe] h-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="bg-white  mb-40 p-4 shadow-md rounded-md">
        <HostEvent/>
       <EventTable/>
       <BudgetManagement/>
      </div>
    </main>
  );
};

export default MainContent;
