import React, { useEffect, useState } from 'react'
import AdminLayout from '../../utils/layouts/AdminLayout'
import axios from 'axios';

interface Store {
    _id: string;
    name: string;
    owner: {
        username: string;
    };
    followers: string[];
    imageUrl: string;
    location: string;
}

interface Props {
    expiryDate: string; // Assuming expiryDate is a string in ISO 8601 format
}

interface Discount {
    _id: string;
    name: string;
    initialPrice: number;
    discount: number;
    expiryDate: string;
    category: string;
    store: Store;
    serviceTime: string;
    description: string;
    imageUrl: string;
    priceAfterDiscount: number;
    percentageDiscount: number;
}

const ManageDiscounts: React.FC = () => {
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get(`https://d3-api.onrender.com/api/v1/discounts`);
                setDiscounts(response.data.discounts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching discounts:', error);
                setLoading(false);
            }
        };

        fetchDiscounts();
    }, []);


    const formatDate = (expiryDate: string): string => {
        const date = new Date(expiryDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const suffix = getDaySuffix(day);
        return `${day}${suffix} ${month}, ${year}`;
    };

    const getDaySuffix = (day: number): string => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

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
                        <p className="text-gray-400 text-[16px]">discounts</p>
                    </div>
                    <div className="">
                        <table className="w-full mt-4 border-collapse">
                            <thead>
                                <tr className="bg-gray-600 uppercase">
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">#</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Name</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Discount</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">I. Price</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Shop</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Expiry</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">% discount</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {discounts.map((discount, index) => (
                                    <tr key={discount._id}>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{index + 1}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{discount.name}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{discount.discount.toLocaleString("KES")}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{discount.initialPrice.toLocaleString('KES')}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{discount.store.name}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{formatDate(discount.expiryDate)}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{discount?.percentageDiscount}%</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">
                                            <button className="bg-fast text-gray-500 border border-gray-600 px-4 py-0.5 rounded-md hover:shadow-md">Flag</button>
                                        </td>
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

export default ManageDiscounts
