import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { FiUser } from 'react-icons/fi';
import { CiBookmarkPlus } from "react-icons/ci";
import { BiSolidDiscount } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/context/AuthContext';
import { MdOutlineAddShoppingCart, MdOutlineDiscount } from 'react-icons/md';
import axios from 'axios';
import logo from '../assets/logo1.png'

interface Shop {
  id: string;
  name: string,
  location: string,
  store_type: string,
}

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState<Shop[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };
  const token = localStorage.getItem('access_token');

  const fetchStores = async () => {
    try {
      const response = await axios.get(`https://api.discoun3ree.com/api/user/shops`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <>
      <div className="w-full hidden md:flex bg-white py-2 justify-between px-[5%] ">
        <div className="flex items-center gap-3 ">
          <p className="hidden md:block text-[15px] text-gray-600"></p>
          <p className="text-[15px] text-gray-600"></p>
        </div>
        <div className="relative">
          {user && user?.user_type === 'admin' ? (
            <div className="">
              <Link to='/manage' className="bg-primary text-white px-4 py-2 rounded-md">Admin Dashboard</Link>
            </div>
          ) : (
            <div className="">
              {user && user.user_type === 'seller' && stores.length !== 0 ? (
                <a href={stores.length > 0 ? `/store/${stores[0].id}/home` : '#'} className=''>
                    <button
                      className="bg-primary px-4 py-1.5 rounded-md text-white"
                    >
                      Dashboard
                    </button>
                </a>
              ) : (
                <div className='flex items-center gap-3'>
                  <Link to={`/accounts/seller/sign-up`} className='text-gray-600 text-[16px] hover:text-primary'>Seller Signup</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex w-full py-2 px-[5%] items-center justify-between bg-gray-50 '>
        <img className='w-[150px] pb-[10px]' src={logo} alt="" />
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
                <Link to={`/accounts/sign-up`} className='px-4 py-1.5 text-gray-500 bg-transparent border  border-gray-300 rounded-full hover:text-primary hover:border-primary'>Register</Link>
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
       <div className="flex items-center gap-[30px] px-4">
          <form onSubmit={handleSearch} className="active:border-primary md:hidden mb-2  flex items-center bg-transparent rounded-full border border-gray-300 w-[450px] gap-2 pl-10 pr-4">
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
      <div className="bg-primary flex items-center justify-center gap-2 py-2 ">
        <Link to={`/`} className='text-gray-50 px-4 hover:text-white cursor-pointer  '>Home</Link>
        <Link to={`/stores`} className='text-gray-50 px-4 hover:text-white cursor-pointer  '>Stores</Link>
        <Link to={`/deals`} className='text-gray-50 px-4 hover:text-whitw cursor-pointer  '>Deals</Link>
      </div>     
    </>
  )
}

export default Navbar;
