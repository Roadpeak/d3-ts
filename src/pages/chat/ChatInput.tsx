// src/components/ChatInput.tsx
import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

interface Props {
  sender: string;
  recipient: string;
}

const ChatInput: React.FC<Props> = ({ sender, recipient }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const socket = socketIOClient('http://localhost:4000');
    socket.emit('sendMessage', { sender, recipient, content: message });
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
  