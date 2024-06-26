import React from 'react';

interface Conversation {
  id: number;
  first_name: string;
  last_name: string;
  last_message: string | null;
  last_message_time: string | null;
  is_last_message_sent_by_me: boolean;
}

interface Props {
  conversations: Conversation[];
  onSelectConversation: (conversationId: number) => void;
  onBackToMessages: () => void;
}

const ConversationsList: React.FC<Props> = ({ conversations, onSelectConversation, onBackToMessages }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today ' + messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday ' + messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) + ' ' + messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 overflow-y-auto">
        {conversations.map(conv => (
          <li key={conv.id} className="cursor-pointer border-b border-gray-200 py-2">
            <div
              className="flex justify-between items-center px-4 py-2"
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="flex-1">
                <div className="font-semibold">{`${conv.first_name} ${conv.last_name}`}</div>
                <div className="text-sm text-gray-500">{conv.last_message}</div>
              </div>
              <div className="text-xs text-gray-500">{formatDate(conv.last_message_time)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsList;
