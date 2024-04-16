import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import axios from 'axios';

interface Ticket {
    _id: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    createdAt: string;
}

const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://d3-api.onrender.com/api/v1/tickets');
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <AdminLayout>
            <div className="">
                <div className="w-full py-4 border-b border-gray-600 px-[5%] flex justify-between">
                    <input type="text" placeholder='Search...' className='bg-transparent border border-gray-600 outline-none focus:border-gray-400 text-gray-500  px-4 py-2 rounded-md md:w-[350px]' />
                    <div className="flex gap-3 items-center ">
                        <button className="bg-fast text-gray-500 border border-gray-600 px-4 py-1.5 rounded-md hover:shadow-md">Actions</button>
                    </div>
                </div>
                <div className="px-[5%] py-[2%] flex flex-col">
                    <div className="flex gap-1 items-center">
                        <p className="text-gray-200 text-[18px] font-medium">Dashboard</p>
                        <span className="text-gray-300">/</span>
                        <p className="text-gray-400 text-[16px]">tickets</p>
                    </div>
                    <div className="mt-4">
                        <table className="w-full border-collapse border border-gray-600">
                            <thead>
                                <tr className='bg-gray-600'>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">#</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Name</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Phone</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Email</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Message</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets && tickets.map((ticket, index) => (
                                    <tr key={ticket._id}>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{index + 1}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{ticket.name}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{ticket.phone}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{ticket.email}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{ticket.message.substring(0, 27)}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{new Date(ticket.createdAt).toLocaleString('en-US')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Tickets;
