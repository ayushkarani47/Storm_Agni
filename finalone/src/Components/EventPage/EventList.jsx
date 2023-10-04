import React from 'react';
import Event from './Event';

const eventsData = [
  {
    eventName: 'Event 1',
    date: '2023-10-10',
    time: '10:00 AM',
    registrationLink: 'https://example.com/event1-registration',
  },
  {
    eventName: 'Event 2',
    date: '2023-10-15',
    time: '2:30 PM',
    registrationLink: 'https://example.com/event2-registration',
  },
];

function EventList() {
  return (
    <div>
      {eventsData.map((event, index) => (
        <Event
          key={index}
          eventName={event.eventName}
          date={event.date} // Pass date as a prop
          time={event.time} // Pass time as a prop
          registrationLink={event.registrationLink}
        />
      ))}
    </div>
  );
}

export default EventList;
