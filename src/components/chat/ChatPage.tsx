import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessagesList from './MessagesList';
import SendMessageForm from './SendMessageForm';
import ConversationsList from './ConversationsList';
import { useAuth } from '../../utils/context/AuthContext';
import echo from '../../echo';

const ChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return;
    }

    axios.get('https://api.discoun3ree.com/api/conversations', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        setConversations(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversations:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }

        try {
          const response = await axios.get(
            `https://api.discoun3ree.com/api/conversations/${selectedConversation}/messages`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      // Listen for new messages on the private channel
      const channel = echo.private(`conversation.${selectedConversation}`);
      channel.listen('MessageSent', (e: any) => {
        setMessages(prevMessages => [...prevMessages, e.message]);
      });

      // Cleanup: leave the channel when the component unmounts or selectedConversation changes
      return () => {
        echo.leave(`conversation.${selectedConversation}`);
      };
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }

        try {
          const response = await axios.get(
            `https://api.discoun3ree.com/api/conversations/${selectedConversation}/messages`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
  };

  const handleBackToMessages = () => {
    setSelectedConversation(null);
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  const currentUserId: number | null = user?.id ?? null;

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      {(selectedConversation === null || window.innerWidth >= 640) && (
        <div className="sm:w-1/3 bg-gray-100 border-r border-gray-200 overflow-y-auto">
          <ConversationsList
            conversations={conversations}
            onSelectConversation={handleConversationSelect}
            onBackToMessages={handleBackToMessages} 
          />
        </div>
      )}

      {selectedConversation !== null && (
        <div className="sm:w-2/3 flex flex-col w-full">
          <div className="flex-1 p-4 bg-white border-b border-gray-200 overflow-y-auto">
            <MessagesList
              messages={messages}
              currentUserId={currentUserId}
              onBackToConversations={handleBackToConversations} 
            />
          </div>
          <SendMessageForm
            conversationId={selectedConversation}
            onMessageSent={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
