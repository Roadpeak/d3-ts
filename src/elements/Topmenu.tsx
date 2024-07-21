import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';
import { CiBookmark, CiEdit, CiGlobe } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { FcSupport } from "react-icons/fc";
import { MdOutlineDashboardCustomize, MdOutlineDiscount, MdOutlineMiscellaneousServices, MdPendingActions } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

const Topmenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    navigate('/');
    window.location.reload();
  };
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white w-full text-white px-[5%] h-[8vh] flex items-center tracking-wide">
        <div className="flex w-full justify-between items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 block md:hidden focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <a href='/' className="text-black text-center md:text-start text-2xl font-bold">Discoun3</a>
          <div className="hidden text-black md:flex space-x-4">
            <a href="/" className=" px-3 py-2 rounded">Home</a>
            <a href="/deals" className=" px-3 py-2 rounded">Discounts</a>
            <a href="/about" className=" px-3 py-2 rounded">About</a>
            <a href="/privacy-policy" className=" px-3 py-2 rounded">Privacy</a>
            <a href="/contact" className=" px-3 py-2 rounded">Contact</a>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs overflow-y-auto bg-white z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="uppercase mt-4 pl-4">discoun3</div>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
        <nav className="flex flex-col space-y-4 p-4">
          <a href={`/`} className="flex items-center mt-4 md:bg-[#F9EBD6] gap-2 p-2 rounded-md">
            <IoHomeOutline />
            <span className='flex text-[#242220] text-[14px]'>Home</span>
          </a>
          <a href={`/store/${id}/home`} className="flex items-center mt-4 md:bg-[#F9EBD6] gap-2 p-2 rounded-md">
            <MdOutlineDashboardCustomize />
            <span className='flex text-[#242220] text-[14px]'>Dashboard</span>
          </a>
          <a href={`/store/${id}/discounts`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <MdOutlineDiscount />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Discounts</span>
          </a>
          <a href={`/store/${id}/services`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <MdOutlineMiscellaneousServices />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Services</span>
          </a>
          <a href={`/store/${id}/bookings`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiBookmark />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Bookings</span>
          </a>
          <a href={`/store/${id}/unverified-discounts`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <MdPendingActions />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Pending</span>
          </a>
          <a href='tickets' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <FcSupport />
            <span className='flex text-[#777777] text-[14px] group-hover:text-[#242220]'>Tickets</span>
          </a>
          <a href='/chat' className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <BsChatDots />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Chat</span>
          </a>
          <a href={`/store/${id}/reviews`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <FaRegStar />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Reviews</span>
          </a>
          <a href={`/store/${id}/socials`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiGlobe />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Socials</span>
          </a>
          <a href={`/stores/edit/${id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <CiEdit />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Edit</span>
          </a>
          <button onClick={logoutUser} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F9EBD6] group">
            <BiLogOut />
            <span className='flex text-[#777777] text-[14px] group group-hover:text-[#242220]'>Log Out</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Topmenu;
