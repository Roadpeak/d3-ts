import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';
import { CiBookmark, CiEdit } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { FcSupport } from "react-icons/fc";
import { MdOutlineDashboardCustomize, MdOutlineDiscount, MdPendingActions } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'

const Sidenav:React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('access_token');
        navigate('/');
        window.location.reload();
    };
  return (
     <div className='w-[15%] md:w-[20%] bg-[#fff] hidden md:flex flex-col pl-[2%] md:pl-[5%] h-[92vh] py-3 md:py-8 pr-[1.5%]'>
        <p className="font-medium border-b hidden md:block tracking-wide pb-1.5">General</p>
        <a href={`/store/${id}/home`} className="flex items-center mt-4 md:bg-[#F9EBD6] gap-2 p-2 rounded-md">
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
          <a href={`/store/${id}/socials`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Socials</span>
          </a>
        <a href={`/stores/edit/${id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiEdit />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Edit</span>
        </a>
        <button onClick={logoutUser} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <BiLogOut />
            <span className='hidden md:flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Log Out</span>
        </button>
    </div>
  )
}

export default Sidenav