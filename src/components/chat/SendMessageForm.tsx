import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  conversationId: number;
  onMessageSent: () => void;
}

const SendMessageForm: React.FC<Props> = ({ conversationId, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    try {
      await axios.post(
        `https://api.discoun3ree.com/api/conversations/${conversationId}/messages`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage('');
      onMessageSent(); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white border-t border-gray-200 px-4 py-2 fixed bottom-0 left-0 right-0 z-10">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 mr-2 py-1 px-3 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessageForm;
