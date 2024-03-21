import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SellerLayout from '../../utils/layouts/SellerLayout';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

interface Store {
    _id: string;
    name: string;
    owner: {
        username: string;
    };
    followers: string[];
    imageUrl: string;
}
interface Product {
    id: number;
    title: string;
    storeName: string;
    image: string;
    initialPrice: number;
    discount: number;
}

const products: Product[] = [
    {
        id: 1,
        title: 'Eco-Friendly Handwoven Basket',
        storeName: 'Maasai Crafts Emporium',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
        initialPrice: 1200,
        discount: 15,
    }
];


const SellerSingleStore: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<Store | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/stores/${id}`);
                setStore(response.data.store);
            } catch (error) {
                console.error('Error fetching store:', error);
            }
        };

        fetchStore();
    }, [id]);

    const handleFollowStore = () => {
        // Implement follow/unfollow functionality here
    };

    const openFollowersPopup = () => {
        // Implement followers popup functionality here
    };

    return (
        <SellerLayout>
            {store && (
                <div className="">
                    <div className="flex flex-col w-full px-[5%] py-[2%] bg-white text-black gap-[2%]">
                        <div className="flex items-center bg-gray-200 py-[10px] px-[5%] border-t border-b border-gray-300 justify-between">
                            <div className="flex items-center gap-[10px]">
                                <img
                                    src={store?.imageUrl}
                                    alt={store?.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold">{store?.name}</h2>
                                    <p
                                        onClick={openFollowersPopup}
                                        className="text-[14px] cursor-pointer text-gray-400 hover:text-black py-4 rounded-md"
                                    >
                                        {store?.followers?.length} followers
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex">
                                    {/* <Reviews /> */}
                                </div>
                                <div className="h-[50px] w-[1px] bg-gray-400 text-gray-200">.</div>
                                <button
                                    onClick={handleFollowStore}
                                    className={`text-white py-2 px-6 bg-primary flex items-center py-1 rounded-md ${isFollowing ? "bg-red-500" : "bg-primary"
                                        }`}
                                >
                                    {isFollowing === true ? "Unfollow" : "Follow"}
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:border md:p-4 rounded-md">
                            <div className="flex items-center w-full mb-2 justify-between">
                                <button className="bg-primary text-white px-4 py-2 flex gap-2 items-center rounded-md"><IoMdAdd /> Add Discount</button>
                                <input
                                    type="text"
                                    className='border rounded-md px-2 outline-none focus:outline-none text-gray-500 py-1'
                                    placeholder='Search'
                                />
                            </div>
                            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:grid-cols-6">
                                {products.map((product) => (
                                    <Link to={`/products/${product.id}/see-details`} key={product.id} className="shadow-md hover:shadow-xl hover:border flex flex-col justify-between rounded-md p-4">
                                        <img src={product.image} alt={product.title} className="w-full object-cover rounded-md" />
                                        <div className="flex flex-col">
                                            <p className="text-[14px] text-gray-500">{product.storeName}</p>
                                            <p className="text-[17px] font-medium">{product.title}</p>
                                            <div className="flex items-center">
                                                <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${product.initialPrice.toLocaleString("KES")}`}</p>
                                                <p className="text-primary font-medium text-[14px] ml-2">
                                                    {`Ksh. ${(product.initialPrice - (product.initialPrice * product.discount) / 100).toLocaleString("KES")}`}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SellerLayout>
    );
};

export default SellerSingleStore;
