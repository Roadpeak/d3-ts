import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkeletonLoader from '../utils/elements/SkeletonLoader';

interface Discount {
    id: string;
    name: string;
    initial_price: number;
    discount: number;
    expiryDate: string;
    category: string;
    store: Store;
    service_time: string;
    description: string;
    image_url: string;
    price_after_discount: number;
}

interface Store {
    _id: string;
    name: string;
    imageUrl: string;
    storeType: string;
}

const SearchResults: React.FC = () => {
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
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
            const response = await axios.get<{ discounts: Discount[], stores: Store[] }>(`https://api.discoun3ree.com/api/search?query=${query}`);
            setDiscounts(response.data.discounts);
            setStores(response.data.stores);
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
                <p className="text-gray-600 font-meduim my-2 text-[18px]">
                    Stores
                </p>
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
                {stores?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 w-full lg:grid-cols-6 gap-4 my-[2%]">
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
                                <a href={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
                                    <img
                                        src={store?.imageUrl}
                                        alt={store?.name}
                                        className="w-[70%] rounded-md object-cover mb-2"
                                    />
                                    <p className="text-black font-semibold">{store?.name}</p>
                                    <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
                                </a>
                            ))
                        )}
                    </div>
                ) : (
                        <>
                            {!loading && <p>No stores found.</p>}
                        </>
                    )
                }

                <p className="text-gray-600 font-meduim my-2 text-[18px]">
                    Discounts
                </p>
                {discounts.length > 0 ? (
                    <div className='w-full mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 lg:grid-cols-5'>
                        {discounts.map((discount) => (
                            <a href={`/discount/${discount.id}/see-details`} key={discount.id} className="flex flex-col bg-gray-50 justify-between rounded-md p-4">
                                <img src={discount.image_url} alt={discount.name} className="w-full object-cover rounded-md" />
                                <div className="flex flex-col">
                                    {/* <p className="text-[14px] text-gray-500">{discount?.store.name}</p> */}
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
                ) : (
                    <p>No discounts found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
