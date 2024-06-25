import React from 'react'
import { useAuth } from '../utils/context/AuthContext'
import { MdOutlineDiscount } from 'react-icons/md';
import { CiBookmarkCheck } from 'react-icons/ci';

const Dashboard:React.FC = () => {
    const {user} = useAuth();
  return (
     <div className="flex flex-col w-full tracking-wide">
            <p className="subheading">Hello 👋, {user?.firstName}</p>
            <div className="flex w-full justify-between py-6 flex-col md:flex-row gap-4">
                <div className="bg-[#FAB040] w-full p-6 rounded-xl items-center flex gap-4">
                    <div className="rounded-md text-[#FAB040] bg-white flex items-center justify-center p-1">
                        <MdOutlineDiscount />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="font-medium text-[#FFFFFF] text-[12px] tracking-wide">Total Discounts</p>
                        <hr className='w-full bg-[#FFFFFF]' />
                        <p className="text-[#FFFFFF] text-[17px]"><span className="font-medium text-[17px]">7</span></p>
                    </div>
                </div>
                <div className="bg-primary w-full p-6 items-center rounded-xl flex gap-4">
                    <div className="rounded-md text-primary bg-white flex items-center justify-center p-1">
                        <CiBookmarkCheck />
                    </div>
                    <div className="flex flex-col text-light gap-3 w-full">
                        <p className="font-medium text-[#FFFFFF] text-[12px] tracking-wide">Total Bookings</p>
                        <hr className='w-full bg-[#FFFFFF]' />
                        <p className="text-[#FFFFFF] text-[17px]"><span className="font-medium text-[17px]">40</span></p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center text-gray-600">
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Verified Discounts</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">89</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Pending Verifications</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">34</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Fullfilled Appointments</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">54</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Pending Appointments</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">34</p>
                </div>
            </div>
            <div className="w-full gap-2 flex flex-col py-8">
                <div className="flex w-full justify-between items-center">
                    <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
                    <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                </div>
                <div className="w-full rounded-md mt-2 bg-white overflow-x-auto py-4">
                    <div className="bg-light w-full rounded-lg">
                        <table className="table-auto w-full rounded-md">
                        <thead className=''>
                            <tr className="bg-light border-b border-gray-100 text-[13px] text-[#002A4D] font-medium">
                                <th className="px-4 text-start font-normal pb-2 pt-4">ID</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Date/Time</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                            <tr>
                                {/* <td className=" px-4 py-2">YCXKLO45KAL</td>
                                <td className=" px-4 py-2 whitespace-nowrap">John Oduol</td>
                                <td className=" px-4 py-2">13-05-22 14:45</td>
                                <td className=" px-4 py-2">Photoshoot</td>
                                <td className=" px-4 py-2">Approved</td> */}
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Dashboard