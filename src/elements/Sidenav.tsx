import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';
import { CiBookmark, CiCalendarDate, CiEdit, CiGlobe } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { FcSupport } from "react-icons/fc";
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize, MdOutlineDiscount, MdOutlineMiscellaneousServices, MdPendingActions } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'

const Sidenav: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isActive = (path: string) => location.pathname === path ? 'bg-[#F9EBD6]' : '';

    const logoutUser = () => {
        localStorage.removeItem('access_token');
        navigate('/');
        window.location.reload();
    };
    return (
        <div className='w-[15%] md:w-[20%] bg-[#fff] hidden md:flex flex-col pl-[2%] md:pl-[5%] h-[92vh] py-3 md:py-8 pr-[1.5%]'>
            <p className="font-medium border-b hidden md:block tracking-wide pb-1.5">General</p>
            <a href={`/`} className={`flex items-center mt-4 gap-2 p-2 rounded-md ${isActive('/')}`}>
                <IoHomeOutline />
                <span className='flex text-[#242220] text-[14px]'>Home</span>
            </a>
            <a href={`/store/${id}/home`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/home`)}`}>
                <MdOutlineDashboardCustomize />
                <span className='flex text-[#242220] text-[14px]'>Dashboard</span>
            </a>
            <a href={`/store/${id}/discounts`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/discounts`)}`}>
                <MdOutlineDiscount />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Discounts</span>
            </a>
            <a href={`/store/${id}/services`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/services`)}`}>
                <MdOutlineMiscellaneousServices />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Services</span>
            </a>
            <a href={`/store/${id}/bookings`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/bookings`)}`}>
                <CiBookmark />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Appointments</span>
            </a>
            <a href={`/store/${id}/unverified-discounts`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/unverified-discounts`)}`}>
                <MdPendingActions />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Pending</span>
            </a>
            <a href={`/store/${id}/calendar`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/calendar`)}`}>
                <CiCalendarDate />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Calendar</span>
            </a>
            <a href='tickets' className={`flex items-center gap-2 p-2 rounded-md ${isActive('/tickets')}`}>
                <FcSupport />
                <span className='flex text-[#777777] text-[14px] group-hover:text-[#242220]'>Tickets</span>
            </a>
            <a href='/chat' className={`flex items-center gap-2 p-2 rounded-md ${isActive('/chat')}`}>
                <BsChatDots />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Chat</span>
            </a>
            <a href={`/store/${id}/reviews`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/reviews`)}`}>
                <FaRegStar />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Reviews</span>
            </a>
            <a href={`/store/${id}/socials`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/store/${id}/socials`)}`}>
                <CiGlobe />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Socials</span>
            </a>
            <a href={`/stores/edit/${id}`} className={`flex items-center gap-2 p-2 rounded-md ${isActive(`/stores/edit/${id}`)}`}>
                <CiEdit />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Edit</span>
            </a>
            <button onClick={logoutUser} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
                <BiLogOut />
                <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Log Out</span>
            </button>
        </div>
    )
}

export default Sidenav