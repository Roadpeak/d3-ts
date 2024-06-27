import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';
import { CiBookmark, CiEdit } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { FcSupport } from "react-icons/fc";
import { MdOutlineDashboardCustomize, MdOutlineDiscount, MdPendingActions } from 'react-icons/md';
import { useParams } from 'react-router-dom'

const Sidenav:React.FC = () => {
    const {id} = useParams();
  return (
     <div className='w-[15%] md:w-[20%] bg-[#fff] hidden md:flex flex-col pl-[2%] md:pl-[5%] h-[92vh] py-3 md:py-8 pr-[1.5%]'>
        <p className="font-medium border-b hidden md:block tracking-wide pb-1.5">General</p>
        <a href={`/stores/${id}/home`} className="flex items-center mt-4 md:bg-[#F9EBD6] gap-2 p-2 rounded-md">
            <MdOutlineDashboardCustomize />
            <span className='hidden md:flex text-[#242220] text-[14px]'>Dashboard</span>
        </a>
        <a href={`/store/${id}/discounts`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <MdOutlineDiscount />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Discounts</span>
        </a>
        <a href={`/store/${id}/bookings`}  className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiBookmark />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Bookings</span>
        </a>
        <a href={`/store/${id}/unverified-discounts`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <MdPendingActions />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Pending</span>
        </a>
        <a href='tickets' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <FcSupport />
            <span className='hidden md:flex text-[#777777] text-[14px] group-hover:text-[#242220]'>Tickets</span>
        </a>
        <a href='/chat' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <BsChatDots />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Chat</span>
        </a>
        <a href={`/store/${id}/reviews`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <FaRegStar />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Reviews</span>
        </a>
        <a href='transactions' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiEdit />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Edit</span>
        </a>
        <a href='transactions' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <BiLogOut />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Log Out</span>
        </a>
    </div>
  )
}

export default Sidenav