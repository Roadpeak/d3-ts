import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { getAllTickets } from '../../services/apiService';
import { Ticket } from '../../types';
import SideMenu from './SideMenu';
import TicketModal from '../../utils/elements/TicketModal';

const Tickets: React.FC = () => {
    const[tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            const userTickets = await getAllTickets();
            setTickets(userTickets);
        };
        fetchTickets();
    }, []);

    const handleTicketClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
    };

    const closeModal = () => {
        setSelectedTicket(null);
    };

    return (
        <AdminLayout>
            <SideMenu />
            <div className="w-full gap-2 flex flex-col py-4">
                <div className="flex w-full justify-between items-center">
                    <p className="font-medium text-[13px] text-dark tracking-wide">Appointments</p>
                    <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                </div>
                <div className="w-full rounded-md mt-2 bg-white overflow-auto">
                    <div className="w-full h-[80vh] overflow-y-auto rounded-lg">
                        <table className="table-auto w-full rounded-md">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                                    <th className="px-4 py-3 text-start">Title</th>
                                    <th className="px-4 py-3 text-start">Priority</th>
                                    <th className="px-4 py-3 text-start">Status</th>
                                    <th className="px-4 py-3 text-start">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                                {tickets.map((ticket, index) => (
                                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-100" onClick={() => handleTicketClick(ticket)}>
                                        <td className="px-4 py-3 capitalize">{ticket.title}</td>
                                        <td className="px-4 py-3">{ticket.priority}</td>
                                        <td className="px-4 py-3">{ticket.status}</td>
                                        <td className="px-4 py-3">{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <TicketModal isOpen={!!selectedTicket} onClose={closeModal}>
                {selectedTicket && (
                    <div className="space-y-4">
                        <h2 className="text-[16px] text-gray-800 mb-4">Ticket Details</h2>
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col border-b border-gray-200">
                                <span className="text-gray-900 text-[14px] font-medium">Title</span>
                                <span className="text-gray-600 text-[13px]">{selectedTicket.title}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-200">
                                <span className="text-gray-900 text-[14px] font-medium">Body</span>
                                <span className="text-gray-600 text-[13px]">{selectedTicket.body}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-200">
                                <span className="text-gray-900 text-[14px] font-medium">Priority</span>
                                <span className={`text-[13px] text-${selectedTicket.priority === 'high' ? 'red' : selectedTicket.priority === 'medium' ? 'yellow' : 'green'}-500`}>
                                    {selectedTicket.priority}
                                </span>
                            </div>
                            <div className="flex flex-col border-b border-gray-200">
                                <span className="text-gray-900 text-[14px] font-medium">Status</span>
                                <span className="text-gray-600 text-[13px]">{selectedTicket.status}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-200">
                                <span className="text-gray-900 text-[14px] font-medium">Created </span>
                                <span className="text-gray-600 text-[13px]">{new Date(selectedTicket.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </TicketModal>
        </AdminLayout>
    )
}

export default Tickets;
