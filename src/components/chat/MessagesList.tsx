import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender_id: number;
  message: string;
  sent_at: string;
}

interface Props {
  messages: Message[];
  currentUserId: number | null;
  onBackToConversations: () => void; 
}

const MessagesList: React.FC<Props> = ({ messages, currentUserId, onBackToConversations }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(msg => {
    const date = formatDate(msg.sent_at);
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(msg);
  });

  // Automatically scroll to bottom when component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleDeselectMessage = () => {
    setSelectedMessage(null);
    onBackToConversations();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="fixed md:hidden w-full top-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <button
          onClick={handleDeselectMessage}
          className="text-primary mt-1 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* <span className="text-lg font-semibold">Message Details</span> */}
        <div></div>
      </div>

      <ul className="flex-1 mb-8 mt-10 overflow-y-auto">
        {Object.keys(groupedMessages).map(date => (
          <React.Fragment key={date}>
            <li className="text-center text-gray-500 text-xs mb-2">{date}</li>
            {groupedMessages[date].map((msg, index) => (
              <li
                key={index}
                className={`flex flex-col mb-2 ${
                  msg.sender_id === currentUserId ? 'self-end items-end' : 'items-start'
                }`}
                onClick={() => handleSelectMessage(msg)}
              >
                <div
                  className={`bg-gray-200 px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender_id === currentUserId ? 'bg-primary text-white self-end' : ''
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(msg.sent_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </li>
            ))}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef}></div>
      </ul>
    </div>
  );
};

export default MessagesList;
