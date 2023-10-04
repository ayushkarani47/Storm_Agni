import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import 'tailwindcss/tailwind.css';

const QrCode = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-semibold">Dynamic QR Code Generator</h1>
      <div className="max-w-md">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter text for QR code"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      {text && (
        <div>
          <h2 className="text-xl font-semibold">QR Code Preview</h2>
          <QRCode value={text} size={128} />
        </div>
      )}
    </div>
  );
};

export default QrCode;
