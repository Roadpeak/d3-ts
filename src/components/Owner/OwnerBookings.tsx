import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerLayout from '../../elements/SellerLayout';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { approveBooking } from '../../services/apiService';

interface Booking {
    id: number;
    discount: {
        name: string;
        discount: string; 
        price_after_discount: string;
    };
    user: {
        first_name: string;
        last_name: string;
        phone: string | null; 
    };
    time_slot: {
        id: number;
        date: string;
        start_time: string;
        end_time: string;
    };
    created_at: string;
    approved: number;
}

const OwnerBookings: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [approvalCode, setApprovalCode] = useState<string>('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No access token found');
                }

                const response = await axios.get(`https://api.discoun3ree.com/api/bookings/shop/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBookings(response.data.data); 
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error("An error occured!")
            }
        };

        fetchBookings();
    }, [id]);

    const handleDetailsClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowDetailsModal(true);
    };

    const handleApproveClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowApproveModal(true);
    };

   const handleApproveBooking = async () => {
    if (!selectedBooking || !approvalCode) {
      toast.error('Please enter an approval code.');
      return;
    }

    try {
      const response = await approveBooking(selectedBooking.id, approvalCode);
      toast.success('Booking approved successfully!');
      setShowApproveModal(false);
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

    const formatDate = (date: string) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    };

    return (
        <SellerLayout>
            <div className="flex w-full">
                <div className="w-full gap-2 flex flex-col py-8">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-medium text-sm text-gray-700 tracking-wide">Latest Bookings</p>
                        <input type="text" placeholder='Search here' className='bg-gray-100 w-52 focus:outline-none rounded-full py-2 px-3.5 text-sm text-gray-700' />
                    </div>
                    <div className="w-full rounded-md mt-4 bg-white overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">Discount Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">User Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">Time</th>
                                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td className="px-4 py-2 text-sm">{booking.discount.name}</td>
                                        <td className="px-4 py-2 text-sm">{`${booking.user.first_name} ${booking.user.last_name}`}</td>
                                        <td className="px-4 py-2 text-sm">{formatDate(booking.created_at)}</td>
                                        <td className="px-4 py-2 text-sm">{booking.approved === 1 ? 'Approved' : 'Pending'}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <button 
                                                className="text-blue-500 hover:underline mr-2 focus:outline-none"
                                                onClick={() => handleDetailsClick(booking)}
                                            >
                                                Details
                                            </button>
                                            {booking.approved === 0 && (
                                                <button 
                                                    className="text-blue-500 hover:underline focus:outline-none"
                                                    onClick={() => handleApproveClick(booking)}
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showDetailsModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-medium mb-4">Booking Details</h2>
                        <p className="text-sm"><strong>User Name:</strong> {`${selectedBooking.user.first_name} ${selectedBooking.user.last_name}`}</p>
                        <p className="text-sm"><strong>Discount Name:</strong> {selectedBooking.discount.name}</p>
                        <p className="text-sm"><strong>Discount Amount:</strong> {selectedBooking.discount.discount}</p>
                        <p className="text-sm"><strong>Price After Discount:</strong> {selectedBooking.discount.price_after_discount}</p>
                        <p className="text-sm"><strong>Phone:</strong> {selectedBooking.user.phone || 'N/A'}</p>
                        <p className="text-sm"><strong>Created At:</strong> {formatDate(selectedBooking.created_at)}</p>
                        <p className="text-sm"><strong>Status:</strong> {selectedBooking.approved === 1 ? 'Approved' : 'Pending'}</p>
                        <p className="text-sm"><strong>Time Slot:</strong> {moment(selectedBooking.time_slot.date).format('MMMM Do YYYY')}, {moment(selectedBooking.time_slot.start_time).format('h:mm A')} - {moment(selectedBooking.time_slot.end_time).format('h:mm A')}</p>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showApproveModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-medium mb-4">Enter Approval Code</h2>
                        <input
                            type="text"
                            value={approvalCode}
                            onChange={(e) => setApprovalCode(e.target.value)}
                            className="border-gray-300 border p-2 w-full mb-4 rounded-md focus:outline-none"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mr-2 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApproveBooking}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SellerLayout>
    );
};

export default OwnerBookings;
