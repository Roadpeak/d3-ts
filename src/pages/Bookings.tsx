import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Booking, Appointment } from '../types';
import { getCookie } from '../utils/cookiUtils';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'appointments'>('bookings');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getCookie('access_token');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }

        const [bookingsResponse, appointmentsResponse] = await Promise.all([
          axios.get(`https://api.discoun3ree.com/api/bookings/user`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`https://api.discoun3ree.com/api/user/appointments`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setBookings(bookingsResponse.data.data);
        setAppointments(appointmentsResponse.data);
        console.log(appointmentsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleRowClick = (item: Booking | Appointment, type: 'booking' | 'appointment') => {
    if (type === 'booking') {
      setSelectedBooking(item as Booking);
    } else {
      setSelectedAppointment(item as Appointment);
    }
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setSelectedAppointment(null);
  };

  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const date = startDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    const startTime = startDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTime = endDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${date}, ${startTime} - ${endTime}`;
  };

  // if (loading) {
  //   return <div className="p-4 text-center">Loading...</div>;
  // }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="px-[5%] py-6 bg-gray-50 ">
        <div className="flex mb-4 border-b border-gray-200 gap-4">
          <button onClick={() => setActiveTab('bookings')} className={`${activeTab === 'bookings' ? 'text-primary font-medium border-b-[2px] border-primary' : 'text-gray-600'}`}>Offers</button>
          <button onClick={() => setActiveTab('appointments')} className={`${activeTab === 'appointments' ? 'text-primary font-medium border-b-[2px] border-primary' : 'text-gray-600'}`}>Appointments</button>
        </div>
        {activeTab === 'bookings' ? (
          bookings?.length === 0 ? (
            <div className="text-gray-600 text-center">You have no bookings.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Voucher</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Discount</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Shop</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Date</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Fulfilled</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(booking, 'booking')}>
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
          )
        ) : (
          appointments?.length === 0 ? (
            <div className="text-gray-600 text-center">You have no appointments.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Service</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Shop</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Date</th>
                        <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Status</th>
                    <th className="py-2 px-4 text-gray-900 font-medium text-[15px] text-start border-b">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(appointment, 'appointment')}>
                      <td className="py-2 px-4 text-gray-600 text-[14px] border-b">{appointment.service_name}</td>
                      <td className="py-2 px-4 text-gray-600 text-[14px] border-b">{appointment.shop_name}</td>
                      <td className="py-2 px-4 text-gray-600 text-[14px] border-b">{new Date(appointment.appointment_time).toLocaleDateString()}</td>
                      <td className={`py-2 px-4 text-[14px] border-b ${appointment.status === 'pending' ? 'text-yellow-500' :
                          appointment.status === 'complete' ? 'text-green-500' :
                            'text-gray-600'
                        }`}>
                        {appointment.status}
                      </td>
                      <td className="py-2 px-4 text-gray-600 text-[14px] border-b">{new Date(appointment.appointment_time).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
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
                  Thank You, we hope you enjoyed the service. you could take a moment and submit a review about this service.
                </p>
              ) : (
                <p>
                  For great service delivery, after your service is fulfilled, you will provide this code <span className='font-medium text-[15px]'>{selectedBooking.code}</span> to the service provider, to mark it as fulfilled, please keep it safe.
                </p>
              )}</p>
            </div>
          </div>
        )}
        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-300">
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Appointment Details</h2>
              <div className="space-y-2">
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Service</span> {selectedAppointment.service_name}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Shop</span> {selectedAppointment.shop_name}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Date</span> {new Date(selectedAppointment.appointment_time).toLocaleDateString()}</p>
                <p className='flex items-center w-full justify-between border-b border-gray-100 text-[14px] text-gray-600'><span>Time</span> {new Date(selectedAppointment.appointment_time).toLocaleTimeString()}</p>
              </div>
              <p className="text-center text-[13px] font-light text-gray-600 my-2">Please make sure to arrive on time for your appointment.</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bookings;
