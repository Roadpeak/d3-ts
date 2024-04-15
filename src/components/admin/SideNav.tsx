import React from 'react'
import { BiSolidDiscount } from 'react-icons/bi'
import { CiBookmarkRemove } from 'react-icons/ci'
import { TbTicket } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineDiscount, MdPayment } from 'react-icons/md'
import { CgProfile } from "react-icons/cg";
import { AiTwotoneShopping } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { IoMdNotificationsOutline } from 'react-icons/io';

const SideNav: React.FC = () => {
    return (
        <div className='w-[18%] bg-gray-900 border-r border-gray-400 px-8 py-4 h-[100vh]'>
            <div className="flex w-full">
                <Link to='/' className='text-gray-400 font-medium text-[24px] text-center mx-auto'>D-THREE</Link>
            </div>
            <div className="flex h-full flex-col">
                <div className="flex flex-col mt-4 text-gray-400 gap-2">
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><IoHomeOutline /> Dashboard</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><MdOutlineDiscount /> Discounts</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><AiTwotoneShopping /> Stores</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><BiSolidDiscount /> Vouchers</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><CiBookmarkRemove /> Appointments</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><MdPayment /> Payments</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><HiOutlineUsers /> Users</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><TbTicket />Tickets</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><IoMdNotificationsOutline /> Notifications</Link>
                </div>
                <div className="flex flex-col gap-2 mt-[25%] text-gray-400">
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><CgProfile /> Profile</Link>
                    <Link to='/' className='py-1.5 hover:bg-gray-700 px-2 hover:shadow-md rounded-md border flex items-center gap-2 border-gray-900 hover:border-gray-600'><IoSettingsOutline /> Settings</Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav
