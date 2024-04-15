import React from 'react'
import AdminLayout from '../../utils/layouts/AdminLayout'

const Vouchers:React.FC = () => {
  return (
    <AdminLayout>
        <div className="">
              <div className="w-full py-4 border-b border-gray-600 px-[5%] flex justify-between">
                  <input type="text" placeholder='Search...' className='bg-transparent border border-gray-600 outline-none focus:border-gray-400 text-gray-500  px-4 py-2 rounded-md md:w-[350px]' />
                  <div className="flex gap-3 items-center ">
                      <button className="bg-fast text-gray-500 border border-gray-600 px-4 py-1.5 rounded-md hover:shadow-md">Actions</button>
                  </div>
              </div>
              <div className="px-[5%] py-[2%] flex flex-col">
                  <div className="flex gap-1 items-center">
                      <p className="text-gray-200 text-[18px] font-medium">Dashboard</p>
                      <span className="text-gray-300">/</span>
                      <p className="text-gray-400 text-[16px]">vouchers</p>
                  </div>
              </div>
        </div>
    </AdminLayout>
  )
}

export default Vouchers
