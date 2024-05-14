// src/components/ChatRoom.tsx
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

interface Props {
  sender: string;
  recipient: string;
}

const ChatRoom: React.FC<Props> = ({ sender, recipient }) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000');
    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [sender, recipient]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/messages/chat/${sender}/${recipient}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatHistory();
  }, [sender, recipient]);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default ChatRoom;
