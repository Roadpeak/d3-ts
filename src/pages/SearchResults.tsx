import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkeletonLoader from '../utils/elements/SkeletonLoader';
import { Link } from 'react-router-dom';

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
        const query = searchParams.get('q');
        if (query) {
            fetchSearchResults(query);
        }
    }, [location]);

    const fetchSearchResults = async (query: string) => {
        try {
            setLoading(true);
            const response = await axios.get<{ discounts: Discount[], stores: Store[] }>(`https://d3-api.onrender.com/api/v1/search?q=${query}`);
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
            <div className='flex flex-col px-[5%]'>
                <p className="text-black font-semibold mb-[1%] text-[24px]">
                    Top Stores | Search Results
                </p>
                {stores.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-7 gap-4 my-[2%]">
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
                                <Link to={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
                                    <img
                                        src={store.imageUrl}
                                        alt={store.name}
                                        className="w-[70%] rounded-md object-cover mb-2"
                                    />
                                    <p className="text-black font-semibold">{store.name}</p>
                                    <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
                                </Link>
                            ))
                        )}
                    </div>
                ) : <>
                    <p>No stores found.</p>
                </>
                }

                <p className="text-black font-semibold mb-[1%] text-[24px]">
                    Top Discounts | Search Results
                </p>
                {discounts.length > 0 ? (
                    <div className='w-full mb-4 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 lg:grid-cols-6'>
                        {discounts.map((discount) => (
                            <Link to={`/discount/${discount._id}/see-details`} key={discount._id} className="border flex flex-col bg-gray-50 justify-between rounded-md p-4">
                                <img src={discount.imageUrl} alt={discount.name} className="w-full object-cover rounded-md" />
                                <div className="flex flex-col">
                                    <p className="text-[14px] text-gray-500">{discount?.store.name}</p>
                                    <p className="text-[17px] font-medium">{discount.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initialPrice.toLocaleString("KES")}`}</p>
                                        <p className="text-primary font-medium text-[14px] ml-2">
                                            {`Ksh. ${discount.priceAfterDiscount.toLocaleString("KES")}`}
                                        </p>
                                    </div>
                                </div>
                            </Link>
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
