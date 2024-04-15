import React from 'react'
import SideNav from './SideNav'

const AdminDash: React.FC = () => {
  return (
    <div className='w-full flex h-[100vh] overflow-y-hidden'>
      <SideNav />
      <div className="w-[82%] h-[100vh] px-[5%] py-[2%] bg-[#131415]">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">
            This is the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDash
