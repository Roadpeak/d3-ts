import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <div className='hidden md:flex flex-col w-[15%] h-[100vh] p-4 bg-primary'>
      <p className="text-center text-white font-medium text-[24px]">D_THREE</p>
      <div className="flex flex-col gap-2 mt-4">
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Dashboard</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Discounts</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Sales</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Appointments</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Check Voucher</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Rewards</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Your Stores</Link>
        <p className="uppercase font-medium mt-8 text-white text-[18px]">Other</p>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Tickets</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Profile</Link>
        <Link to={'/'} className='text-white px-3 py-2 hover:bg-rose-400 rounded-md'>Log Out</Link>
      </div>
    </div>
  )
}

export default Sidebar
