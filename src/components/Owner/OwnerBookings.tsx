import React from 'react'
import SellerLayout from '../../elements/SellerLayout'

const OwnerBookings:React.FC = () => {
  return (
    <SellerLayout>
        <div className="flex w-full">
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
                                <th className="px-4 text-start font-normal pb-2 pt-4">Discount name</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">User name</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Time</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Status</th>
                                <th className="px-4 text-start font-normal pb-2 pt-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                            <tr>
                                <td className=" px-4 py-2">Phot Studio</td>
                                <td className=" px-4 py-2">David Otieno</td>
                                <td className=" px-4 py-2">10AM -12, 4th July 2024</td>
                                <td className=" px-4 py-2">Approved</td>
                                <td className=" px-4 py-2">Approve</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </SellerLayout>
  )
}

export default OwnerBookings