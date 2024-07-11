import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { FiUpload } from 'react-icons/fi';
import moment from 'moment';
import { FaChevronLeft, FaRegUserCircle, FaUser } from 'react-icons/fa';
import { IoFilterSharp, IoHomeOutline, IoSendOutline } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { MdAttachFile } from 'react-icons/md';

interface Message {
    id: number;
    body: string;
    from_id: number;
    to_id: number;
    created_at: string;
    updated_at: string;
    seen: boolean;
    attachment?: string;
}

interface Conversation {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    unseenCount: number;
    last_message?: string;
    last_message_time?: string;
}

const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const pusher = new Pusher('f566a73b20b1548b5a13', {
            cluster: 'ap2',
            forceTLS: true,
        });

        const channel = pusher.subscribe('chat');
        channel.bind('App\\Events\\MessageSent', function(data: { message: Message }) {
            setMessages(prevMessages => [...prevMessages, data.message]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    useEffect(() => {
        const cachedConversations = localStorage.getItem('conversations');
        if (cachedConversations) {
            setConversations(JSON.parse(cachedConversations));
        }

        fetchConversations();
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            const cachedMessages = localStorage.getItem(`messages_${selectedConversation}`);
            if (cachedMessages) {
                setMessages(JSON.parse(cachedMessages));
            }

            fetchMessages(selectedConversation);
        }
    }, [selectedConversation]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const response = await axios.get('https://api.discoun3ree.com/api/messages/conversations', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });

            const conversationsWithLastMessage = await Promise.all(response.data.map(async (conversation: Conversation) => {
                const messagesResponse = await axios.get(`https://api.discoun3ree.com/api/messages/${conversation.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });

                const lastMessage = messagesResponse.data[messagesResponse.data.length - 1];
                return {
                    ...conversation,
                    last_message: lastMessage?.body,
                    last_message_time: lastMessage?.created_at,
                };
            }));

            const sortedConversations = conversationsWithLastMessage.sort((a: Conversation, b: Conversation) => {
                if (!a.last_message_time || !b.last_message_time) return 0;
                return new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime();
            });

            setConversations(sortedConversations);
            localStorage.setItem('conversations', JSON.stringify(sortedConversations));
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchMessages = async (userId: number) => {
        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/messages/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });
            const sortedMessages = response.data.sort((a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            setMessages(sortedMessages);
            localStorage.setItem(`messages_${userId}`, JSON.stringify(sortedMessages));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        const formData = new FormData();
        formData.append('to_id', selectedConversation!.toString());
        formData.append('body', newMessage);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            const response = await axios.post('https://api.discoun3ree.com/api/messages/send', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });
            setNewMessage('');
            setAttachment(null);
            const updatedMessages = [...messages, response.data];
            localStorage.setItem(`messages_${selectedConversation}`, JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleConversationClick = (userId: number) => {
        setSelectedConversation(userId);
    };

    return (
        <div className="flex w-full h-screen md:p-8 bg-gray-50">
            <div className="flex w-full border rounded">
                {!isMobileView || (isMobileView && selectedConversation === null) ? (
                    <div className={`w-1/3 bg-gray-100 border border-gray-200 py-4 overflow-y-auto ${isMobileView ? 'w-full' : 'w-1/3'}`}>
                        <div className="flex mb-1 items-center w-full justify-between">
                            <a href='/' className="px-4">Chat</a>
                            <div className="flex items-center gap-2 mr-4 text-gray-600">
                                <a href="/" className="">
                                    <IoHomeOutline />
                                </a>
                                <a href="/accounts/profile" className="">
                                    <FaRegUserCircle />
                                </a>
                                <IoMdMenu />
                            </div>
                        </div>
                        <div className="flex px-4 text-gray-600 w-full justify-between items-center gap-1 mb-4">
                            <input className='w-[90%] bg-transparent border py-1 px-4 border-gray-200 rounded-full outline-none focus:bg-white text-[15px]' type="text" placeholder='Search...'/>
                            <IoFilterSharp className='cursor-pointer' size={24} />
                        </div>
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => handleConversationClick(conversation.id)}
                                className={`cursor-pointer hover:bg-gray-50 h-fit border-b border-gray-400 px-4 py-3 ${selectedConversation === conversation.id ? 'bg-white' : ''}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <FaUser className="w-10 h-10 rounded-full inline-block mr-2 text-gray-300 border border-gray-300" />                            
                                    <div>
                                        <div>{conversation.first_name} {conversation.last_name}</div>
                                        <div className="text-gray-600 text-sm">{conversation.last_message}</div>
                                    </div>
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {conversation.last_message_time && moment(conversation.last_message_time).format('h:mm A')}
                                    </div>
                                </div>  
                                {conversation.unseenCount > 0 && (
                                    <span className="ml-2 text-sm text-red-500">
                                        {conversation.unseenCount} new
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : null}
                {selectedConversation !== null && (
                    <div className={`flex-1 p-4 flex flex-col h-full bg-white ${isMobileView ? 'w-full' : 'w-2/3'}`}>
                        <div className="flex gap-4 items-center mb-4 bg-white fixed top-0 left-0 right-0 p-4 z-10 shadow-md">
                            {isMobileView && (
                                <button
                                    className="text-primary"
                                    onClick={() => setSelectedConversation(null)}
                                >
                                    <FaChevronLeft />
                                </button>
                            )}
                            <div>
                                {isMobileView && selectedConversation && (
                                    <div>
                                        <h2 className="text-[16px] font-medium text-gray-600">
                                            {conversations.find(c => c.id === selectedConversation)?.first_name} {conversations.find(c => c.id === selectedConversation)?.last_name}
                                        </h2>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto mt-14 mb-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`mb-2 ${message.from_id === selectedConversation ? 'text-left' : 'text-right'}`}>
                                    <div className={`inline-block p-2 rounded-lg ${message.from_id === selectedConversation ? 'bg-gray-200' : 'bg-primary text-white'}`}>
                                        <p className="text-sm">{message.body}</p>
                                        {message.attachment && (
                                            <div>
                                                <img src={message.attachment} alt="attachment" className="w-40 h-40 object-cover mt-2 rounded-lg" />
                                            </div>
                                        )}
                                        <span className={`text-xs ${message.from_id !== selectedConversation ? 'text-gray-50' : ''} text-end block`}>{moment(message.created_at).format('h:mm A')}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                        <div className="mt-4 flex items-center">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-full py-2 px-4 mr-2"
                                placeholder="Type your message"
                            />
                            <input
                                type="file"
                                onChange={handleAttachmentChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label htmlFor="file-input">
                                <MdAttachFile className="cursor-pointer text-gray-500 mr-2" size={24} />
                            </label>
                            <button
                                onClick={sendMessage}
                                className="bg-primary text-white rounded-full p-2"
                            >
                                <IoSendOutline size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
