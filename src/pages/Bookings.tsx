import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Booking {
  id: number;
  user_id: number;
  time_slot_id: number;
  discount_id: number;
  shop_id: number;
  approved: number;
  code: string;
  created_at: string;
  updated_at: string;
  discount_name: string;
  shop_name: string;
  time_slot_start: string;
  time_slot_end: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }

        const response = await axios.get(`https://api.discoun3ree.com/api/bookings/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setBookings(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const handleRowClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const date = startDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    const startTime = startDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTime = endDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${date}, ${startTime} - ${endTime}`;
  };

  return (
    <>
      <Navbar />
      <div className="px-[5%] py-6 bg-gray-50 ">
        <div className="flex w-full items-center justify-between mb-2">
          <p className="text-[17px] mb-2 font-medum text-gray-700">Your Bookings</p>
          <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[13px] rounded-full py-2 px-3.5 ' />
        </div>
        {bookings.length === 0 ? (
          <div className="text-gray-600 text-center">You have no bookings.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Booking Code</th>
                  <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Discount</th>
                  <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Shop</th>
                  <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Date</th>
                  <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Fulfilled</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(booking)}>
                    <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{booking.code}</td>
                    <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{booking.discount_name}</td>
                    <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{booking.shop_name}</td>
                    <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">{new Date(booking.time_slot_start).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-gray-600 text-[14px]  border-b">
                      <span className={`font-medium ${booking.approved ? 'text-green-500' : 'text-red-500'}`}>
                        {booking.approved ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-300">
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Booking Details</h2>
              <div className="space-y-2">
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Code</span> {selectedBooking.code}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Discount</span> {selectedBooking.discount_name}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Shop</span> {selectedBooking.shop_name}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Time Slot</span>{formatDateTime(selectedBooking.time_slot_start, selectedBooking.time_slot_end)}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Fulfilled</span>{selectedBooking.approved ? 'Yes' : 'No'}</p>
              </div>
              <p className="text-center text-[13px] font-light text-gray-600 my-2">{selectedBooking.approved ? (
                <p>
                  Thank You, we hope you enjoyed the service. you could take a moment and submit a review about his discount
                </p>
              ) : (
                <p>
                  For great service delivery, after your service is fulfilled, you will provide this code <span className='font-medium text-[15px]'>{selectedBooking.code}</span> to the service provider, to mark it as fulfilled, please keep it safe.
                </p>
              )}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bookings;
