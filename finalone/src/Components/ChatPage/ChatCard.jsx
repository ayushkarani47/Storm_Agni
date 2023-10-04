import React from 'react';

const ChatCard = ({ message, isUser }) => {
  const cardClass = isUser
    ? 'bg-blue-500 text-white rounded-l-lg rounded-r-lg p-3'
    : 'bg-gray-200 text-gray-700 rounded-l-lg rounded-r-lg p-3';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md ${cardClass}`}>
        {message}
      </div>
    </div>
  );
};

export default ChatCard;
