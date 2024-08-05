import React, { useEffect, useState } from 'react';
import { FaRegUser, FaSearch } from "react-icons/fa";
import { FiUser } from 'react-icons/fi';
import { CiBookmarkPlus } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/context/AuthContext';
import logo from '../assets/icon2.png'
import { IoMdAdd } from 'react-icons/io';
import fetchOwnerStores from '../services/fetchownerStores';
import { LuLayoutDashboard } from "react-icons/lu";
import { BsTicketDetailed } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { MdOutlineDiscount } from 'react-icons/md';
import { Shop } from '../types';
import { getCookie } from '../utils/cookiUtils';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState<Shop[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };
  const token = getCookie('access_token'); ;

  useEffect(() => {
    if (token) {
      fetchOwnerStores(token, setStores);
    }
  }, [token]);

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <>
      <div className='flex w-full py-2 px-[5%] items-center justify-between items-center bg-gray-50 '>
        <img className='w-[80px] hidden md:flex' src={logo} alt="" />
        <img className="w-[70px] h-full -mx-6 flex md:hidden" src={logo} />
        <div className="flex items-center gap-[30px] w-fit px-4">
          <form onSubmit={handleSearch} className="active:border-primary md:hidden flex items-center bg-transparent rounded-full border border-gray-300 w-fit gap-2 pl-2 md:pl-10 pr-2 md:pr-4">
            <input
              type="text"
              placeholder='Search'
              className='outline-none py-1 w-fit bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="outline-none" type='submit'>
              <FaSearch size={20} className='text-gray-600 font-light text-[15px]' />
            </button>
          </form>
        </div>
          <div className="flex items-center gap-[30px] md:pr-[13%] ">
            <form onSubmit={handleSearch} className="hidden active:border-primary md:flex items-center bg-transparent rounded-full border border-gray-300  w-[450px] gap-2 pl-10 pr-4">
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
                <p className="hidden md:flex">Hi, {user?.first_name}</p> <FiUser size={24} className='text-gray-500 border rounded-full border-gray-400 p-1' />
              </button>
            ) : (
              <>
                <div className="flex flex-col items-center relative text-white">
                  <div className="flex relative w-full items-center">
                    <Link to='/accounts/sign-in' className="flex text-black md:hidden">
                        <FiUser size={24} className='text-gray-500 border rounded-full border-gray-400 p-1' />
                    </Link>
                    <div className="flex flex-col relative">
                        <button onClick={() => setLogin(!login)} className='mr-3 hidden md:flex text-primary hover:underline text-[14px] font-medium'>Login</button>
                        {login && (
                          <div className="flex flex-col absolute top-full left-0 rounded-md p-4 bg-white gap-2">
                            <Link className='text-primary text-[14px] font-medium hover:underline' to={`/accounts/sign-in`}>User</Link>
                            <Link className='text-primary text-[14px] font-medium hover:underline' to={`https://merchants.discoun3ree.com/accounts/login`} target='_blank'>Merchant</Link>
                          </div>
                        )}
                    </div>
                      <div className="flex flex-col relative">
                        <button onClick={() => setRegister(!register)} className='hidden md:flex text-white hover:underline font-medium text-[14px] bg-primary px-6 py-1.5 rounded-md'>Register</button>
                        {register && (
                          <div className="flex flex-col absolute top-full right-0 rounded-md p-4 bg-white gap-2">
                            <Link className='text-primary text-[14px] font-medium hover:underline' to={`/accounts/sign-up`}>User</Link>
                            <Link className='text-primary text-[14px] font-medium hover:underline' to={`https://merchants.discoun3ree.com/accounts/register`} target='_blank'>Merchant</Link>
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </>
            )}
            {open && (
              <div className="absolute z-20 top-[100%] mt-4 right-0 w-[150px] bg-white shadow-md rounded-md flex flex-col p-4 gap-2">
                <Link to='/accounts/profile' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegUser /> Account</Link>
                <Link to='/my-vouchers' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineDiscount /> Vouchers</Link>
                <Link to='/chat' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><IoChatboxEllipsesOutline /> Chat</Link>
                <Link to='/my-bookings' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><CiBookmarkPlus />Bookings</Link>
                <Link to='/my-tickets' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><BsTicketDetailed /> Tickets</Link>
                {user && user.user_type === 'admin' ? (
                  <>
                  <Link to={`/manage`} className=''>
                    <button
                      className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                    >
                      <LuLayoutDashboard />
                      Dashboard
                    </button>
                  </Link>
                  </>
                ) : (
                  <></>
                )}
                {user && user.user_type === 'seller' && stores.length !== 0 ? (
                  <Link target='_blank' to={stores.length > 0 ? `https://merchants.discoun3ree.com/merchant/${stores[0]?.id}/dashboard` : '#'} className=''>
                    <button
                      className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                    >
                      <LuLayoutDashboard />
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <div>
                    {user?.user_type === 'seller' && (
                      <button
                        onClick={() => {}}
                        className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                      >
                        <IoMdAdd />
                        Add Store
                      </button>
                    )}
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
        <Link to={`/`} className='text-gray-50 px-4 hover:text-white cursor-pointer font-medium '>Home</Link>
        <Link to={`/merchants`} className='text-gray-50 px-4 hover:text-white cursor-pointer font-medium '>Merchants</Link>
        <Link to={`/deals`} className='text-gray-50 px-4 hover:text-whitw cursor-pointer font-medium '>Deals</Link>
        <Link to={`/services`} className='text-gray-50 px-4 hover:text-whitw cursor-pointer font-medium '>Services</Link>
      </div>
    </>
  )
}

export default Navbar;
