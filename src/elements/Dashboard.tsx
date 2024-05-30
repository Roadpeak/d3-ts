import React from 'react'

const Dashboard = () => {
  return (
     <div className="flex flex-col w-full tracking-wide">
            <p className="subheading">Hello 👋,</p>
            <p className="normal-text">Here's whats going on today</p>
            <div className="flex w-full justify-between py-6 flex-col md:flex-row gap-4">
                <div className="bg-[#FAB040] w-full p-6 rounded-xl items-center flex gap-4">
                    <div className="rounded-md text-[#FAB040] bg-white flex items-center justify-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="font-medium text-[#FFFFFF] text-[12px] tracking-wide">Current balance</p>
                        <hr className='w-full bg-[#FFFFFF]' />
                        <p className="text-[#FFFFFF] text-[17px]">Kes <span className="font-medium text-[17px]">58.90</span></p>
                    </div>
                </div>
                <div className="bg-primary w-full p-6 items-center rounded-xl flex gap-4">
                    <div className="rounded-md text-primary bg-white flex items-center justify-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-light gap-3 w-full">
                        <p className="font-medium text-[#FFFFFF] text-[12px] tracking-wide">Total Deposit</p>
                        <hr className='w-full bg-[#FFFFFF]' />
                        <p className="text-[#FFFFFF] text-[17px]">Kes <span className="font-medium text-[17px]">58.90</span></p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center text-gray-600">
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Transaction Orders</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">2312</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Transaction Orders</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">2312</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Transaction Orders</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">2312</p>
                </div>
                <div className="w-full bg-white gap-1 flex flex-col rounded-md">
                    <p className="text-[#656575] text-[12px] pt-3 pb-1.5 px-4 font-medium">Transaction Orders</p>
                    <hr className='w-full bg-gray-100' />
                    <p className="py-2 px-4 text-[#002A4D] text-[15px] font-medium">2312</p>
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
                                <td className=" px-4 py-2">YCXKLO45KAL</td>
                                <td className=" px-4 py-2 whitespace-nowrap">John Oduol</td>
                                <td className=" px-4 py-2">13-05-22 14:45</td>
                                <td className=" px-4 py-2">Photoshoot</td>
                                <td className=" px-4 py-2">Approved</td>
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