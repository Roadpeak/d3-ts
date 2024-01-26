import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <>
    <div className='flex w-full py-2 px-[5%] items-center justify-between bg-primary '>
      <div className="flex items-center gap-[30px] ">
        <p className='text-white font-medium text-[24px]'>Discoun3</p>
        <div className="hidden md:flex items-center bg-white rounded-md w-[450px] gap-2 px-10">
            <FaSearch size={20} className='text-gray-500' />
            <input type="text" placeholder='Search' className='outline-none py-2 w-full ' />
        </div>
      </div>
      <div className="flex items-center  text-white gap-3 ">
        <Link to={`/bought`} className='px-3 py-1.5 text-gray-500 bg-white rounded-md '>Cart</Link>
        <Link to={`/bought`} className='px-3 py-1.5 text-gray-500 bg-white rounded-md '>Bookings</Link>
        <div className="bg-white flex items-center justify-center text-gray-400 p-2 rounded-full">
            <FiUser size={20} />
        </div>
      </div>
    </div>
    <div className="bg-secondary flex items-center justify-center gap-2 py-2 ">
        <Link to={`/`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Home</Link>
        <Link to={`/stores`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Stores</Link>
        <Link to={`/deals`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Deals</Link>
        <Link to={`/`} className='text-gray-600 px-4 hover:text-primary cursor-pointer'>Big</Link>
    </div>
    </>
  )
}

export default Navbar
