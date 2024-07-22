import React, { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiBookmarkRemove } from 'react-icons/ci';
import { TbTicket } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdMiscellaneousServices, MdOutlineCategory, MdOutlineDiscount, MdPayment } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { AiTwotoneShopping } from 'react-icons/ai';
import { IoMdClose, IoMdNotificationsOutline } from 'react-icons/io';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex md:hidden mb-2 bg-white rounded-md p-2 w-full items-center justify-between">
        <RiMenu2Fill onClick={toggleMenu} />
        <a href='/' className="uppercase">Discoun3</a>
        <a href="/accounts/profile" className="text-gray-600">
          <FaRegUserCircle />
        </a>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 bg-white w-4/5 z-50 p-4 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">Menu</p>
          <button className="text-gray-600 text-lg" onClick={toggleMenu}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex h-full flex-col">
          <div className="flex flex-col mt-4 text-gray-700 text-[14px] font-light gap-2">
            <a
              href='/manage'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <IoHomeOutline className='' /> Dashboard
            </a>
            <a
              href='/manage/discounts'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/discounts' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <MdOutlineDiscount /> Discounts
            </a>
            <a
              href='/manage/services'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/services' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <MdMiscellaneousServices /> Services
            </a>
            <a
              href='/manage/unverified'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/unverified' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <MdOutlineDiscount /> Pending
            </a>
            <a
              href='/manage/stores'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/stores' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <AiTwotoneShopping /> Stores
            </a>
            <a
              href='/manage/categories'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/vouchers' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <MdOutlineCategory /> Categories
            </a>
            <a
              href='/manage/appointments'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/appointments' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <CiBookmarkRemove /> Appointments
            </a>
            <a
              href='/manage/payments'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/payments' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <MdPayment /> Payments
            </a>
            <a
              href='/manage/users'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/users' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <HiOutlineUsers /> Users
            </a>
            <a
              href='/manage/tickets'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/manage/tickets' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <TbTicket /> Tickets
            </a>
            <a
              href='/'
              className={`py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary ${location.pathname === '/' ? 'bg-gray-100 text-primary' : ''
                }`}
            >
              <IoMdNotificationsOutline /> Notifications
            </a>
          </div>
          <div className="flex flex-col gap-2 mt-[25%] text-gray-400">
            <a href='/' className='py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary'>
              <CgProfile /> Profile
            </a>
            <a href='/' className='py-1.5 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-primary'>
              <IoSettingsOutline /> Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
