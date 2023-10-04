import React, { useState } from 'react';

function Event({ eventName, registrationLink, date, time }) {
  const [status, setStatus] = useState('Not Registered');

  const handleRegister = () => {
    // Perform registration logic here
    // For example, make an API request to register the user
    // After successful registration, set status to 'Registered'
    // and setRegistered(true);
    setStatus('Registered');
  };

  const handleJoinGroup = () => {
    window.location.href = registrationLink;
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-semibold">{eventName}</h2>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Status: {status}</p>
      {status === 'Not Registered' ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2"
          onClick={handleRegister}
        >
          Register
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 mt-2"
          onClick={handleJoinGroup}
        >
          Join Group
        </button>
      )}
    </div>
  );
}

export default Event;
