import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from an API or a data source
  useEffect(() => {
    // Simulated event data for demonstration purposes
    const eventData = [
      { id: 1, name: 'Event 1', isRegistered: false, link: '/event1' },
      { id: 2, name: 'Event 2', isRegistered: false, link: '/event2' },
      // Add more event data
    ];

    setEvents(eventData);
  }, []);

  // Register or unregister for an event
  const toggleRegistration = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        event.isRegistered = !event.isRegistered;
      }
      return event;
    });

    setEvents(updatedEvents);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Attendee Dashboard</h2>
      {events.map((event) => (
        <div key={event.id} className="border p-4 mb-4">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <p>Status: {event.isRegistered ? 'Registered' : 'Not Registered'}</p>
          {event.isRegistered ? (
            <Link to={event.link}>
              <button className="bg-blue-500 text-white px-4 py-2">Join Group</button>
            </Link>
          ) : (
            <button
              onClick={() => toggleRegistration(event.id)}
              className="bg-green-500 text-white px-4 py-2"
            >
              Register
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttendeeDashboard;
