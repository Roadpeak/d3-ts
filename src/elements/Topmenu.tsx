import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

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
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 transform ${
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
        <nav className="mt-16 flex flex-col space-y-4 p-4">
          <a href={`/store/${id}/home`}  className="text-gray-800 hover:text-gray-600">Dashboard</a>
          <a href={`/store/${id}/discounts`}  className="text-gray-800 hover:text-gray-600">Discounts</a>
          <a href={`/store/${id}/bookings`} className="text-gray-800 hover:text-gray-600">Bookings</a>
          <a href={`/store/${id}/unverified-discounts`} className="text-gray-800 hover:text-gray-600">Pending</a>
          <a href={`/store/${id}/socials`} className="text-gray-800 hover:text-gray-600">Socials</a>
          <a href="/chat" className="text-gray-800 hover:text-gray-600">Chat</a>
          <a href={`/store/${id}/reviews`} className="text-gray-800 hover:text-gray-600">Reviews</a>
          <a href={`/stores/edit/${id}`} className="text-gray-800 hover:text-gray-600">Edit</a>
          <button onClick={logoutUser} className="text-gray-800 hover:text-gray-600">Logout</button>
        </nav>
      </div>
    </>
  );
};

export default Topmenu;
