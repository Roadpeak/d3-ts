    import React, { useState, useEffect, useRef } from 'react';
    import axios from 'axios';
    import Pusher from 'pusher-js';
    import { FiUpload } from 'react-icons/fi';
    import moment from 'moment';
    import { FaRegUserCircle, FaUser } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';

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
    }

    const ChatPage: React.FC = () => {
        const [conversations, setConversations] = useState<Conversation[]>([]);
        const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
        const [messages, setMessages] = useState<Message[]>([]);
        const [newMessage, setNewMessage] = useState<string>('');
        const [attachment, setAttachment] = useState<File | null>(null);
        const messageEndRef = useRef<HTMLDivElement | null>(null);

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
            fetchConversations();
        }, []);

        useEffect(() => {
            if (selectedConversation) {
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
                setConversations(response.data);
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
                setMessages(response.data.sort((a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
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
                setMessages(prevMessages => [...prevMessages, response.data]);
                setNewMessage('');
                setAttachment(null);
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
                    <div className="w-1/3 bg-gray-100 border border-gray-200 py-4 overflow-y-auto">
                        <div className="flex mb-4 items-center w-full justify-between">
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
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => handleConversationClick(conversation.id)}
                                className={`cursor-pointer hover:bg-gray-50 h-fit border-b border-gray-400 px-4 py-3 ${selectedConversation === conversation.id ? 'bg-white' : ''}`}
                            >
                                <FaUser className="w-10 h-10 rounded-full inline-block mr-2 text-gray-300 border border-gray-300" />
                                {conversation.first_name} {conversation.last_name}
                                {conversation.unseenCount > 0 && (
                                    <span className="ml-2 text-sm text-red-500">
                                        {conversation.unseenCount} new
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 p-4 relative bg-white">
                        <div className="flex flex-col bg-white overflow-y-auto h-[90%] w-full">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`mb-4 ${message.from_id === selectedConversation ? 'self-start' : 'self-end'}`}
                                >
                                    <div
                                        className={`px-4 py-1.5 w-full rounded-lg ${message.from_id === selectedConversation ? 'bg-red-100' : 'bg-gray-200'}`}
                                    >
                                        <p>{message.body}</p>
                                        {message.attachment && (
                                            <img
                                                src={`https://api.discoun3ree.com/storage/${message.attachment}`}
                                                alt="attachment"
                                                className="max-w-full max-h-40 my-2"
                                            />
                                        )}
                                        <div className="text-xs text-gray-500 text-end">
                                            {moment(message.created_at).format('h:mm A')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                        {selectedConversation && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 h-[10%] bg-white flex items-center">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded mr-2"
                                    placeholder="Type your message..."
                                />
                                <label className="cursor-pointer">
                                    <FiUpload className="w-6 h-6 mr-2 text-gray-600" />
                                    <input
                                        type="file"
                                        onChange={handleAttachmentChange}
                                        className="hidden"
                                    />
                                </label>
                                <button
                                    onClick={sendMessage}
                                    className="bg-primary text-white px-6 py-1.5 rounded-full"
                                >
                                    Send
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    export default ChatPage;
