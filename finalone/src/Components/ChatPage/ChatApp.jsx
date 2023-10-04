import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish a WebSocket connection when the component mounts
    const newSocket = new WebSocket('ws://your-backend-url');

    // Set the socket variable and add event listeners
    setSocket(newSocket);

    newSocket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup: Close the WebSocket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() === '') return;

    // Send the message to the server via WebSocket
    const message = {
      text: newMessage,
      isUser: true,
    };
    socket.send(JSON.stringify(message));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button className="bg-blue-500 text-white p-2 rounded" onClick={toggleChat}>
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isChatOpen && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <ChatBox messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
