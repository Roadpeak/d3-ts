import React, { useEffect, useState } from 'react'
import AdminLayout from '../../utils/layouts/AdminLayout'
import axios from 'axios';

interface Voucher {
    _id: string;
    code: string;
    used: boolean;
    user: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    discount: {
        name: string;
    };
}

const Vouchers: React.FC = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    const fetchVouchers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await axios.get('https://d3-api.onrender.com/api/v1/vouchers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVouchers(response.data);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

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
                    <div className="mt-4">
                        <table className="w-full border-collapse border border-gray-600">
                            <thead>
                                <tr className='bg-gray-600'>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">#</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Voucher</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Name</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Email</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Phone</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Status</th>
                                    <th className="border-b text-gray-200 text-start uppercase font-normal border-gray-600 px-4 py-2">Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map((voucher, index) => (
                                    <tr key={voucher._id}>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{index + 1}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{voucher.code}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{`${voucher.user.first_name} ${voucher.user.last_name}`}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{voucher.user.email}</td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{voucher.user.phone}</td>
                                        <td className={`border-b border-gray-600 px-4 py-2 ${voucher.used ? 'text-red-500' : 'text-green-500'}`}>
                                            {voucher.used ? 'Used' : 'Unused'}
                                        </td>
                                        <td className="border-b text-gray-300 border-gray-600 px-4 py-2">{voucher.discount.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Vouchers
