import React from 'react';
import ChatCard from './ChatCard';

const ChatBox = ({ messages }) => {
  return (
    <div className="overflow-y-auto">
      {messages.map((message, index) => (
        <ChatCard key={index} message={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
};

export default ChatBox;
