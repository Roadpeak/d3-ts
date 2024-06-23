import React, { useEffect, useState } from 'react';
import { getUserTickets } from '../services/apiService';
import TicketModal from '../utils/elements/TicketModal';
import { Ticket } from '../types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const userTickets = await getUserTickets();
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
    <>
    <Navbar />
    <div className="py-8 px-[5%]">
      <div className="flex w-full justify-between mb-3 items-center">
          <p className="font-medium text-sm text-gray-700 tracking-wide">Tickets</p>
          <input type="text" placeholder='Search here' className='bg-white w-52 focus:outline-none rounded-full py-2 px-3.5 text-sm text-gray-700' />
      </div>
      {tickets.length === 0 ? (
        <p className="text-gray-600 font-light text-[14px]">No tickets found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
            <table className="w-full bg-white rounded-md">
            <thead className="bg-gray-100">
                    <tr>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Title</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Priority</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Status</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Date</th>
                    </tr>
                </thead>
            <tbody>
                {tickets.map((ticket: Ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleTicketClick(ticket)} >
                        <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{ticket.title}</td>
                        <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{ticket.priority}</td>
                        <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{ticket.status}</td>
                        <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{new Date(ticket.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      )}
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
    </div>
    <Footer />
    </>
  );
};

export default MyTickets;
