import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDiscount } from 'react-icons/bi';
import { CiBookmarkRemove } from 'react-icons/ci';
import { TbTicket } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDiscount, MdPayment } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { AiTwotoneShopping } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';

const SideNav: React.FC = () => {
    const location = useLocation();

    return (
        <div className='w-[20%] bg-white h-[100vh] overflow-y-auto px-8 py-4 h-[100vh]'>
            <div className="flex w-full">
                <Link to='/' className='text-gray-400 font-medium text-[24px] mx-auto'>D3</Link>
            </div>
            <div className="flex h-full flex-col">
                <div className="flex flex-col mt-4 text-gray-700 text-[14px] font-light gap-2">
                    <Link
                        to='/manage'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <IoHomeOutline className='' /> Dashboard
                    </Link>
                    <Link
                        to='/manage/discounts'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/discounts' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <MdOutlineDiscount /> Discounts
                    </Link>
                    <Link
                        to='/manage/stores'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/stores' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <AiTwotoneShopping /> Stores
                    </Link>
                    <Link
                        to='/manage/vouchers'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/vouchers' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <BiSolidDiscount /> Vouchers
                    </Link>
                    <Link
                        to='/manage/appointments'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/appointments' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <CiBookmarkRemove /> Appointments
                    </Link>
                    <Link
                        to='/manage/payments'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/payments' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <MdPayment /> Payments
                    </Link>
                    <Link
                        to='/manage/users'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/users' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <HiOutlineUsers /> Users
                    </Link>
                    <Link
                        to='/manage/tickets'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/tickets' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <TbTicket /> Tickets
                    </Link>
                    <Link
                        to='/'
                        className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/' ? 'bg-gray-100 text-primary' : ''
                            }`}
                    >
                        <IoMdNotificationsOutline /> Notifications
                    </Link>
                </div>
                <div className="flex flex-col gap-2 mt-[25%] text-gray-400">
                    <Link to='/' className='py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary'>
                        <CgProfile /> Profile
                    </Link>
                    <Link to='/' className='py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary'>
                        <IoSettingsOutline /> Settings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
