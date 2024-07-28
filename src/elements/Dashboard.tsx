import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/context/AuthContext'
import { MdOutlineLoyalty } from 'react-icons/md';
import { CiBookmarkCheck } from 'react-icons/ci';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Booking, DiscountData, Shop } from '../types';
import ShopAnalytics from '../components/Owner/ShopAnalytics';
import PointsModal from './PointsModal';

const Dashboard: React.FC = () => {
    const [discounts, setDiscounts] = useState<DiscountData[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [shop, setShop] = useState<Shop | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { user } = useAuth();
    const { id } = useParams();

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

    useEffect(() => {
        fetchShopInfo();
    }, []);

    const fetchShopInfo = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                throw new Error('No access token found');
            }

            const response = await axios.get<Shop>(`https://api.discoun3ree.com/api/shops/${id}/see`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setShop(response.data);
        } catch (error) {
            console.error('Failed to fetch shop information:', error);
        }
    };

    return (
        <div className="flex flex-col w-full tracking-wide">
            <div className="border-b flex w-full items-center justify-between border-gray-200 ">
                <span>
                    What's up <span className="text-black font-medium text-[18px] uppercase">{user?.first_name}</span>!
                </span>
                <Link to={`/stores/edit/${id}`} className="font-medium text-primary text-[15px] hover:text-[17px] transition ease-in-out dekat-300">Update shop info</Link>
            </div>           
            <div className="flex w-full justify-between py-6 flex-col md:flex-row gap-4">
                <div onClick={openModal} className="bg-primary w-full p-6 rounded-xl items-center flex gap-4 cursor-pointer">
                    <div className="rounded-md text-gray-600 bg-gray-100 flex items-center justify-center p-1">
                        <MdOutlineLoyalty />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="font-medium text-white text-[12px] tracking-wide">Reward Points</p>
                        <hr className='w-full bg-gray-600' />
                        <p className="text-white text-[17px]"><span className="font-medium text-[17px]">{shop?.loyalty_points}</span></p>
                    </div>
                </div>
                <div className="bg-[#F9EBD6] w-full p-6 items-center rounded-xl flex gap-4">
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
            <p className="text-gray-700 font-medium text-[14px]">Working days</p>
            <div className="flex flex-col w-full bg-white mb-4 rounded-md p-2">
                {shop?.working_days && shop.working_days.length > 0 ? (
                    <div className="flex w-full items-center flex-wrap gap-6">
                        {shop.working_days.map(day => (
                            <div key={day} className="flex w-fit">
                                <span className="text-gray-600 font-normal text-[13px]">{day}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full items-center justify-between">
                        <span className="text-gray-600 font-normal text-[13px]">No working days set</span>
                        <Link to={`/stores/edit/${shop?.id}`} className="text-blue-500 hover:underline">
                            Edit Working Days
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full md:flex-row mb-2 gap-4 ">
                <div className="flex flex-col p-4 w-full gap-1.5 bg-white rounded-md">
                    <p className="text-gray-600 font-light text-[13px]">Opening time</p>
                    <hr />
                    <p className="text-gray-700 text-[14px] font-medium">{shop?.open_time}</p>
                </div>
                <div className="flex flex-col p-4 w-full gap-1.5 bg-white rounded-md">
                    <p className="text-gray-600 font-light text-[13px]">Closing time</p>
                    <hr />
                    <p className="text-gray-700 text-[14px] font-medium">{shop?.close_time}</p>
                </div>
                <div className="flex flex-col p-4 w-full gap-1.5 bg-white rounded-md">
                    <p className="text-gray-600 font-light text-[13px]">Offers</p>
                    <hr />
                    <p className="text-gray-700 text-[14px] font-medium">{discounts?.length}</p>
                </div>
                <div className="flex flex-col p-4 w-full gap-1.5 bg-white rounded-md">
                    <p className="text-gray-600 font-light text-[13px]">Services</p>
                    <hr />
                    <p className="text-gray-700 text-[14px] font-medium">8</p>
                </div>
            </div>
            <PointsModal isOpen={isModalOpen} onClose={closeModal} points={Number(shop?.loyalty_points)} />
            <div className="flex flex-col mt-4 gap-4">
                <ShopAnalytics />
                <div className="w-full gap-2 flex flex-col pb-8">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
                        <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                    </div>
                    <div className="w-full rounded-md bg-white overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className='w-full bg-gray-50'>
                                    <th className="px-4 py-3.5 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Name</th>
                                    <th className="px-4 py-3.5 text-left text-[15px] border-b border-gray-300 font-normal text-gray-700">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 8).map(booking => (
                                    <tr key={booking.id} className='mb-2 py-2 '>
                                        <td className="px-4 py-3 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{`${booking.user.first_name} ${booking.user.last_name}`}</td>
                                        <td className="px-4 py-3 text-[13px] mb-2 text-gray-600 py-2 border-b border-gray-100">{moment(booking.time_slot.date).format('MMMM Do YYYY')}, {moment(booking.time_slot.start_time).format('h:mm A')} - {moment(booking.time_slot.end_time).format('h:mm A')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard