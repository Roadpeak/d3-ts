import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerLayout from '../../elements/SellerLayout';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { approveBooking } from '../../services/apiService';
import { Booking } from '../../types';

const OwnerBookings: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error("An error occurred!");
                setLoading(false);
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
            <div className="flex w-full h-full flex-col">
                <div className="flex w-full justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Latest Bookings</h1>
                    <input type="text" placeholder='Search here' className='bg-gray-100 w-52 focus:outline-none rounded-full py-2 px-3.5 text-sm text-gray-700' />
                </div>
                <div className="w-full rounded-md bg-white h-full overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="loader">Loading...</div>
                        </div>
                    ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Discount Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        User Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {booking.discount.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {`${booking.user.first_name} ${booking.user.last_name}`}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {formatDate(booking.created_at)}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${booking.approved === 1 ? 'text-green-900' : 'text-yellow-900'}`}>
                                                <span aria-hidden="true" className={`absolute inset-0 ${booking.approved === 1 ? 'bg-green-200' : 'bg-yellow-200'} opacity-50 rounded-full`}></span>
                                                <span className="relative">
                                                    {booking.approved === 1 ? 'Fulfiled' : 'Pending'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                className="text-blue-500 hover:underline mr-2 focus:outline-none"
                                                onClick={() => handleDetailsClick(booking)}
                                            >
                                                Details
                                            </button>
                                            {booking.approved === 0 && (
                                                <button
                                                    className="text-green-500  hover:underline focus:outline-none"
                                                    onClick={() => handleApproveClick(booking)}
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showDetailsModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[35%]">
                        <h2 className="text-lg font-medium mb-4 text-center">Appointment Details</h2>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Name <span className="">{`${selectedBooking.user.first_name} ${selectedBooking.user.last_name}`}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Discount <span className="">{selectedBooking.discount.name}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Discount <span className="">{selectedBooking.discount.discount}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Final Price <span className="">{selectedBooking.discount.price_after_discount}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Mobile <span className="">{selectedBooking.user.phone || 'N/A'}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Status <span className="">{selectedBooking.approved === 1 ? 'Fulfilfed' : 'Pending'}</span></p>
                        <p className="text-[14px] text-gray-600 font-light flex items-center justify-between w-full border-b border-gray-200 mb-2 pb-0.5">Date <span className="">{moment(selectedBooking.time_slot.date).format('MMMM Do YYYY')}, {moment(selectedBooking.time_slot.start_time).format('h:mm A')} - {moment(selectedBooking.time_slot.end_time).format('h:mm A')}</span></p>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-medium mb-4 text-center">Enter Voucher Code</h2>
                        <p className="mb-1 text-[13px] text-gray-500 font-light">The client should provide you with a voucher they used to make this appointment. Key in to mark as fulfilled.</p>
                        <input
                            type="text"
                            value={approvalCode}
                            placeholder='Type voucher...'
                            onChange={(e) => setApprovalCode(e.target.value)}
                            className="border-gray-300 border p-2 text--[14px] focus:border-primary w-full mb-4 rounded-md focus:outline-none"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="text-gray-700 mr-2 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApproveBooking}
                                className="bg-primary text-white px-4 py-1.5 rounded-md hover:bg-red-600 focus:outline-none"
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
