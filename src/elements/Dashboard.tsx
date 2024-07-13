import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/context/AuthContext'
import { MdOutlineDiscount } from 'react-icons/md';
import { CiBookmarkCheck } from 'react-icons/ci';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Booking, DiscountData } from '../types';

const Dashboard:React.FC = () => {
    const [discounts, setDiscounts] = useState<DiscountData[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const {user} = useAuth();
    const {id} = useParams();

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/discounts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, []);

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

     const formatDate = (date: string) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    };

  return (
     <div className="flex flex-col w-full tracking-wide">
            <p className="">Hello 👋, {user?.first_name}</p>
            <div className="flex w-full justify-between py-6 flex-col md:flex-row gap-4">
                <div className="bg-white w-full p-6 rounded-xl items-center flex gap-4">
                    <div className="rounded-md text-gray-600 bg-gray-100 flex items-center justify-center p-1">
                        <MdOutlineDiscount />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="font-medium text-gray-600 text-[12px] tracking-wide">Total Discounts</p>
                        <hr className='w-full bg-gray-600' />
                        <p className="text-gray-600 text-[17px]"><span className="font-medium text-[17px]">{discounts?.length}</span></p>
                    </div>
                </div>
                <div className="bg-white w-full p-6 items-center rounded-xl flex gap-4">
                    <div className="rounded-md text-gray-600 bg-gray-100 flex items-center justify-center p-1">
                        <CiBookmarkCheck />
                    </div>
                    <div className="flex flex-col text-light gap-3 w-full">
                        <p className="font-medium text-gray-600 text-[12px] tracking-wide">Total Bookings</p>
                        <hr className='w-full bg-gray-600' />
                        <p className="text-gray-600 text-[17px]"><span className="font-medium text-[17px]">{bookings?.length}</span></p>
                    </div>
                </div>
            </div>
            <div className="w-full gap-2 flex flex-col pb-8">
                <div className="flex w-full justify-between items-center">
                    <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
                    <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                </div>
                <div className="w-full rounded-md mt-4 bg-white overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Discount</th>
                                    <th className="px-4 py-2 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Name</th>
                                    <th className="px-4 py-2 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Time</th>
                                    <th className="px-4 py-2 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 8).map(booking => (
                                    <tr key={booking.id} className='mb-2 py-2 '>
                                        <td className="px-4 py-2 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{booking.discount.name}</td>
                                        <td className="px-4 py-2 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{`${booking.user.first_name} ${booking.user.last_name}`}</td>
                                        <td className="px-4 py-2 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{moment(booking.time_slot.date).format('MMMM Do YYYY')}, {moment(booking.time_slot.start_time).format('h:mm A')} - {moment(booking.time_slot.end_time).format('h:mm A')}</td>
                                        <td className="px-4 py-2 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{booking.approved === 1 ? 'Approved' : 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
  )
}

export default Dashboard