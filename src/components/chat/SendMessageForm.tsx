import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookiUtils';

interface Props {
  conversationId: number;
  onMessageSent: () => void;
}

const SendMessageForm: React.FC<Props> = ({ conversationId, onMessageSent }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = getCookie('access_token');
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
    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-100">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="ml-2 bg-primary text-white rounded-lg px-4 py-2"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;
