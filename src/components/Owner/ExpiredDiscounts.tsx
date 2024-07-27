import React, { useEffect, useState } from 'react';
import SellerLayout from '../../elements/SellerLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RepostModal from './RepostModal'; 
import { toast } from 'react-toastify';

interface DiscountData {
    id: number;
    name: string;
    initial_price: number;
    discount: number;
    image_url: string;
    expiry_date: string;
    service_time_hours: number;
    category: string;
    description: string;
    shop_id: number;
}

const ExpiredDiscounts: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [discounts, setDiscounts] = useState<DiscountData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<DiscountData | null>(null);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/discounts/expired`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, [id]);

    const handleRepostClick = (discount: DiscountData) => {
        setSelectedDiscount(discount);
        setIsModalOpen(true);
    };

    const handleRepost = async (newExpiryDate: string) => {
        if (!selectedDiscount) return;

        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`https://api.discoun3ree.com/api/discounts/${selectedDiscount.id}/repost`, {
                new_expiry_date: newExpiryDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDiscounts((prevDiscounts) =>
                prevDiscounts.map((discount) =>
                    discount.id === selectedDiscount.id ? { ...discount, expiry_date: newExpiryDate } : discount
                )
            );
            setIsModalOpen(false);
            setSelectedDiscount(null);
            window.location.reload();
        } catch (error) {
            toast.error("An error occured.")
        }
    };

    return (
        <SellerLayout>
            <div className="flex flex-col w-full">
                <div className="w-full gap-2 flex flex-col">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
                        <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                    </div>
                    <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
                        <div className="bg-light w-full rounded-lg">
                            <table className="table-auto w-full rounded-md">
                                <thead className=''>
                                    <tr className="border-b-[2px] border-gray-200 text-[13px] bg-gray-50 text-[#002A4D] font-medium">
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Status</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                                    {discounts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">
                                                No expired discounts found.
                                            </td>
                                        </tr>
                                    ) : (
                                        discounts.map((discount) => (
                                            <tr key={discount.id} className="cursor-pointer border-b py-2 border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3">{discount.name}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3">{discount.initial_price}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3">{discount.discount}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3">Expired</td>
                                                <td className="px-4 text-[14px] text-primary underline font-light py-3">
                                                    <button onClick={() => handleRepostClick(discount)}>Repost</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedDiscount && (
                <RepostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onRepost={handleRepost}
                    discountName={selectedDiscount.name}
                />
            )}
        </SellerLayout>
    );
};

export default ExpiredDiscounts;
