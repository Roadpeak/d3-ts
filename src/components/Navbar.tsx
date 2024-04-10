import React, { useState } from 'react';
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { FiUser } from 'react-icons/fi';
import { CiBookmarkPlus } from "react-icons/ci";
import { BiSolidDiscount } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/context/AuthContext';
import { MdOutlineAddShoppingCart, MdOutlineDiscount } from 'react-icons/md';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <div className="w-full flex bg-white py-2 justify-between px-[5%] ">
        <div className="flex items-center gap-3">
          <p className="text-[15px] text-gray-600">info@d-three.com</p>
          <p className="text-[15px] text-gray-600">+254 113 794219</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to={``} className='text-gray-600 text-[16px] hover:text-primary'>Seller Login</Link>
          <p className="">|</p>
          <Link to={``} className='text-gray-600 text-[16px] hover:text-primary'>Seller Signup</Link>
        </div>
      </div>
      <div className='flex w-full py-2 px-[5%] items-center justify-between bg-gray-50 '>
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
        <div className="relative">
          <>
            {user ? (
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 hover:text-primary cursor-pointer">
                <p className="">Hi, {user?.firstName}</p> <FiUser size={24} className='text-gray-500 border rounded-full border-gray-400 p-1' />
              </button>
            ) : (
              <div className="flex items-center  text-white gap-3">
                <Link to={`/accounts/sign-in`} className='px-4 py-1.5 text-gray-500 bg-transparent border  border-gray-300 rounded-full hover:text-primary hover:border-primary'>Login</Link>
                <Link to={`/accounts/sign-up`} className='px-4 py-1.5 text-gray-500 bg-transparent border  border-gray-300 rounded-full hover:text-primary hover:border-primary'>Sign Up</Link>
              </div>
            )}
            {open && (
              <div className="absolute top-[100%] mt-4 right-0 w-[150px] bg-white shadow-md rounded-md flex flex-col p-4 gap-2">
                <Link to='/accounts/profile' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegUser /> Account</Link>
                <Link to='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><CiBookmarkPlus />Bookings</Link>
                <Link to='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineAddShoppingCart /> Cart</Link>
                <Link to='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegHeart /> Saved</Link>
                <Link to='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineDiscount /> Coupons</Link>
                <Link to='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><BiSolidDiscount /> Vouchers</Link>
                <button className="bg-primary text-white rounded-md py-1.5" onClick={logoutUser}>
                  Log Out
                </button>
              </div>
            )}
          </>
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
