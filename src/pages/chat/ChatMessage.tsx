// src/components/ChatMessage.tsx
import React from 'react';

interface Props {
  message: string;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default ChatMessage;
