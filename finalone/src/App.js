import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Chat from "./Components/Chat";
import QrCode from "./Components/QrCode";
import KanbanBoard from "./Components/KanbanBoard";
import Board from "./Components/Kanban/Board";
import VendorValidation from "./Components/VendorValidation";
import Event from "./Components/EventPage/Event";
import EventsData from "./Components/EventPage/EventsData";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/EventTest/Header";
import EventTable from "./Components/EventTest/EventTable";
import BudgetManagement from "./Components/EventTest/BudgetManagement";
import OrganizerCalendar from "./Components/EventTest/OrganizerCalendar";
import ChatApp from "./Components/ChatPage/ChatApp";
import SignUpForm from "./Components/Kanban/SignUpForm";
import EventList from "./Components/EventPage/EventList";
import Navbar from "./Components/Navbar";
import MainContent from "./Components/MainContent";
import EventForm from "./Components/EventTest/EventForm";
import LoginForm from "./Components/Kanban/LoginForm";
import Calendar from "./Components/Calendar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Calendar/>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/eventform" element={<EventForm />} />
        </Routes>
           
      </BrowserRouter>
    </>
  );
}

export default App;
