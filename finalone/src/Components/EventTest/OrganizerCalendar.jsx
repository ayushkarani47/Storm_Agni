import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const OrganizerCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventTitle) => {
    if (selectedDate && eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
        end: selectedDate,
      };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={isModalOpen ? [] : events} // Hide calendar events when the modal is open
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
      />
      <EventModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default OrganizerCalendar;
