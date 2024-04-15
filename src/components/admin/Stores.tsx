import React, { useEffect, useState } from 'react'
import AdminLayout from '../../utils/layouts/AdminLayout'
import axios from 'axios';

interface Store {
    _id: string;
    name: string;
    owner: {
        first_name: string;
        last_name: string;
    };
    followers: string[];
    imageUrl: string;
    location: string;
    storeType: string;
}

const ManageStores: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);

    const fetchStores = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://d3-api.onrender.com/api/v1/stores', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStores(response.data.stores);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <AdminLayout>
            <div>
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
                        <p className="text-gray-400 text-[16px]">stores</p>
                    </div>
                    <div className="">
                        <table className="w-full mt-4 border-collapse">
                            <thead>
                                <tr className='bg-gray-600 uppercase'>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">#</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Name</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Type</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Location</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Owner</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Status</th>
                                    <th className="border-b border-gray-600 text-gray-300 px-4 text-start py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((store, index) => (
                                    <tr key={store._id}>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{index + 1}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{store.name}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{store?.storeType}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{store?.location}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">{store?.owner.first_name} {store?.owner.last_name}</td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">
                                            <button className="bg-green-600 text-gray-300 px-4 rounded-md py-0.5">Active</button>
                                        </td>
                                        <td className="border-b border-gray-600 text-gray-400 px-4 py-2">
                                            <button className="bg-rose-800 text-gray-300 px-4 rounded-md py-0.5">Suspend</button>
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

export default ManageStores
