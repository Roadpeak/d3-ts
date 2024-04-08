import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <>
    <div className="w-full flex bg-white py-2 justify-between px-[5%] ">
      <div className="flex items-center gap-3">
        <p className="text-[15px] text-gray-600">English</p>
        <p className="text-[15px] text-gray-600">KES</p>
      </div>
      <div className="flex items-center gap-3">
        <Link to={``} className='text-gray-600 text-[16px] hover:text-primary'>Seller Login</Link>
        <p className="">|</p>
        <Link to={``} className='text-gray-600 text-[16px] hover:text-primary'>Seller Signup</Link>
      </div>
    </div>
      <div className='flex w-full py-2 px-[5%] items-center justify-between bg-gray-100 '>
        <p className='text-primary font-medium text-[24px]'>D-THREE</p>
        <div className="flex items-center gap-[30px] ">
          <form onSubmit={handleSearch} className="hidden active:border-primary md:flex items-center bg-transparent rounded-full border border-gray-300 w-[450px] gap-2 pl-10 pr-4">
            <input
              type="text"
              placeholder='Search'
              className='outline-none py-2 w-full bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="outline-none" type='submit'>
              <FaSearch size={20} className='text-gray-500' />
            </button>
          </form>
        </div>
        <div className="flex items-center  text-white gap-3 ">
          <Link to={`/discounts/bought`} className='px-4 py-1.5 text-gray-500 bg-transparent border  border-gray-300 rounded-full hover:text-primary hover:border-primary'>Cart</Link>
          <Link to={`/discounts/bought`} className='px-4 py-1.5 text-gray-500 bg-transparent border  border-gray-300 rounded-full hover:text-primary hover:border-primary'>Bookings</Link>
          <Link to={`/profile`} className="bg-white flex items-center justify-center text-gray-400 p-2 rounded-full">
            <FiUser size={20} />
          </Link>
        </div>
      </div>
      <div className="bg-white flex items-center justify-center gap-2 py-2 ">
        <Link to={`/`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Home</Link>
        <Link to={`/stores`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Stores</Link>
        <Link to={`/deals`} className='text-gray-600 px-4 hover:text-primary cursor-pointer  '>Deals</Link>
        <Link to={`/`} className='text-gray-600 px-4 hover:text-primary cursor-pointer'>Categories</Link>
      </div>
    </>
  )
}

export default Navbar;
