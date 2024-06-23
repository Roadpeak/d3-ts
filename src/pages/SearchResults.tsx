import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkeletonLoader from '../utils/elements/SkeletonLoader';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Discount {
    id: string;
    name: string;
    initial_price: number;
    discount: number;
    expiryDate: string;
    category: string;
    store: Shop;
    service_time: string;
    description: string;
    image_url: string;
    price_after_discount: number;
}

interface Shop {
    id: string;
    name: string;
    image_url: string;
    store_type: string;
}

const SearchResults: React.FC = () => {
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [stores, setStores] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        if (query) {
            fetchSearchResults(query);
        }
    }, [location]);

    const fetchSearchResults = async (query: string) => {
        try {
            setLoading(true);
            const response = await axios.get<{ discounts: Discount[], shops: Shop[] }>(`https://api.discoun3ree.com/api/search?query=${query}`);
            setDiscounts(response.data.discounts);
            setStores(response.data.shops);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Navbar />
            <div className='flex flex-col px-[5%] bg-gray-100'>
                {stores?.length > 0 && (
                    <p className="text-gray-600 font-meduim mt-2 text-[18px]">
                        Stores
                    </p>
                )}
                {loading && (
                    <div className='grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-7 gap-4'>
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                    </div>
                )}
                {stores?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 w-full lg:grid-cols-6 gap-4 my-2">
                        {loading ? (
                            <>
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                            </>
                        ) : (
                            stores.map((store) => (
                                <a href={`/stores/${store?.id}/view`} key={store?.id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 hover:shadow-md cursor-pointer">
                                    <div className="flex flex-col justify-center mx-auto relative ">
                                        <div className="bg-transparent mb-2  mx-auto  w-[40%]">
                                            <img
                                                src={store.image_url}
                                                alt={store.name}
                                                className="w-full mx-auto rounded-sm object-cover"
                                            />
                                            </div>
                                            <p className="text-center text-gray-600 font-medium">{store.name}</p>
                                            <p className="text-center text-[13px] text-[#FF9021]">{store.store_type}</p>
                                            <div className="text-[#FF9021] border border-[#FF9021] p-1 hover:border-primary hover:text-primary absolute top-0 right-0 rounded-md">
                                            <FaExternalLinkAlt />
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                )}

                {
                    discounts?.length > 0 && (
                        <p className="text-gray-600 font-meduim my-2 text-[18px]">
                            Discounts
                        </p>
                    )
                }
                {discounts.length > 0 && (
                    <div className='w-full mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 lg:grid-cols-5'>
                        {discounts.map((discount) => (
                            <a href={`/discount/${discount.id}/see-details`} key={discount.id} className="flex flex-col bg-gray-50 justify-between rounded-md p-4">
                                <img src={discount.image_url} alt={discount.name} className="w-full object-cover rounded-md" />
                                <div className="flex flex-col">
                                    <p className="text-[14px] text-gray-600">{discount.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initial_price}`}</p>
                                        <p className="text-primary font-medium text-[15px] ml-2">
                                            {`Ksh. ${discount.price_after_discount}`}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
