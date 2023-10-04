import React from 'react';
import ChatApp from '../ChatPage/ChatApp';

const EventTable = () => {
  const eventData = [
    { id: 1, name: 'Event 1', date: '2023-10-15',chat:<ChatApp/> },
    { id: 2, name: 'Event 2', date: '2023-11-20',chat:<ChatApp/> },
    // Add more event data
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Ongoing Events</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Name</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event) => (
            <tr key={event.id}>
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2">{event.date}</td>
              <td className="border px-4 py-2">{event.chat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
