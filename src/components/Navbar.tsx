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
import { IoIosMenu } from 'react-icons/io';

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
    navigate(`/search?query=${searchQuery}`);
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
      <div className='flex w-full py-2 px-[5%] items-center justify-between items-center bg-gray-50 '>
        <img className='w-[150px] hidden md:flex pb-[10px]' src={logo} alt="" />
        <p className="text-[18px] flex md:hidden font-medium italic">D3</p>
        <div className="flex items-center gap-[30px] px-4">
          <form onSubmit={handleSearch} className="active:border-primary md:hidden flex items-center bg-transparent rounded-full border border-gray-300 w-fit gap-2 pl-10 pr-4">
            <input
              type="text"
              placeholder='Search value'
              className='outline-none py-1 w-fit bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="outline-none" type='submit'>
              <FaSearch size={20} className='text-gray-600 font-light text-[15px]' />
            </button>
          </form>
        </div>
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
                <p className="hidden md:flex">Hi, {user?.firstName}</p> <FiUser size={24} className='text-gray-500 border rounded-full border-gray-400 p-1' />
              </button>
            ) : (
              <>
                <div className="flex flex-col items-center relative text-white">
                  {/* <span>
                    
                  </span> */}
                  <div className="flex relative w-full">
                    <a href='/accounts/sign-in' className="flex text-black md:hidden">
                      <IoIosMenu size={24} />
                    </a>
                    <a href={`/accounts/sign-in`} className='px-4 py-1 text-gray-500 mr-2 bg-transparent border hidden md:flex border-gray-300 rounded-full hover:text-primary hover:border-primary'>Login</a>
                    <a href={`/accounts/sign-up`} className='px-4 py-1 text-gray-500 ml-2 bg-transparent border hidden md:flex border-gray-300 rounded-full hover:text-primary hover:border-primary'>Register</a>
                  </div>
                </div>
              </>
            )}
            {open && (
              <div className="absolute z-20 top-[100%] mt-4 right-0 w-[150px] bg-white shadow-md rounded-md flex flex-col p-4 gap-2">
                <a href='/accounts/profile' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegUser /> Account</a>
                <a href='/my-bookings' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><CiBookmarkPlus />Bookings</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineAddShoppingCart /> Cart</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegHeart /> Saved</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineDiscount /> Coupons</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><BiSolidDiscount /> Vouchers</a>
                {user && user.user_type === 'seller' && stores.length !== 0 ? (
                  <a href={stores.length > 0 ? `/store/${stores[0]?.id}/home` : '#'} className=''>
                    <button
                      className=""
                    >
                      Dashboard
                    </button>
                  </a>
                ) : (
                  <div>
                  </div>
                )}
                <button className="bg-primary text-white rounded-md py-1.5" onClick={logoutUser}>
                  Log Out
                </button>
              </div>
            )}
          </>
        </div>
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
