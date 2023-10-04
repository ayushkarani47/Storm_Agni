import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    zIndex: 9999,
  },
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)',
  zIndex: 9998,
};

const EventModal = ({ isOpen, onRequestClose, onSave }) => {
  const [eventTitle, setEventTitle] = useState('');

  const handleSave = () => {
    onSave(eventTitle);
    setEventTitle('');
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} ariaHideApp={false}>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      />
      <button
        onClick={handleSave}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Save
      </button>
    </Modal>
  );
};

export default EventModal;
