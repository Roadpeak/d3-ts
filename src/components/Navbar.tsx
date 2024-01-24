import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
    <div className='flex w-full py-2 px-[5%] items-center justify-between bg-primary '>
      <div className="flex items-center gap-[30px] ">
        <p className='text-white font-medium text-[24px]'>Discoun3</p>
        <div className="flex items-center bg-white rounded-md w-[450px] gap-2 px-10">
            <FaSearch size={20} className='text-gray-500' />
            <input type="text" placeholder='Search' className='outline-none py-2 w-full ' />
        </div>
      </div>
      <div className="flex items-center  text-white gap-3 ">
        <p className='px-3 py-1.5 text-gray-500 bg-white rounded-md '>Cart</p>
        <p className='px-3 py-1.5 text-gray-500 bg-white rounded-md '>Bookings</p>
        <div className="bg-white flex items-center justify-center text-gray-400 p-2 rounded-full">
            <FiUser size={20} />
        </div>
      </div>
    </div>
    <div className="bg-secondary flex items-center justify-center gap-2 py-2 ">
        <p className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Home</p>
        <p className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Stores</p>
        <p className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Deals</p>
        <p className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Big discounts</p>
    </div>
    </>
  )
}

export default Navbar
