import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SellerLayout from '../../utils/layouts/SellerLayout';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { Spinner } from '@material-tailwind/react';
import { CgProfile } from 'react-icons/cg';
import { FaChevronDown } from 'react-icons/fa';
import { IoLocation } from "react-icons/io5";

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

const SellerSingleStore: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<Store | null>(null);
    const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        initialPrice: '',
        discount: '',
        expiryDate: '',
        category: '',
        serviceTime: '',
        description: '',
    });

    useEffect(() => {
        const fetchDiscountsByShop = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/discounts/shop/${id}`);
                setDiscounts(response.data.discounts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching discounts:', error);
                setLoading(false);
            }
        };

        fetchDiscountsByShop();
    }, [id]);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post('http://localhost:4000/api/v1/cloudinary/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { name, initialPrice, discount, expiryDate, category, serviceTime, description } = formData;

            const token = localStorage.getItem('token');
            setIsLoading(true);

            await axios.post('http://localhost:4000/api/v1/discounts', {
                name,
                initialPrice: parseInt(initialPrice),
                discount: parseInt(discount),
                expiryDate,
                category,
                serviceTime,
                description,
                imageUrl,
                store: id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFormData({
                name: '',
                initialPrice: '',
                discount: '',
                expiryDate: '',
                category: '',
                serviceTime: '',
                description: '',
            });
            setImageUrl('');
            setIsLoading(false);

            // Handle any additional actions after successful submission, like refetching data
        } catch (error) {
            console.error('Error adding discount:', error);
            setIsLoading(false);
        }
    };

    const handleFollowStore = () => {
        // Implement follow/unfollow functionality here
    };

    const openFollowersPopup = () => {
        // Implement followers popup functionality here
    };

    const handleAddDiscountClick = () => {
        setIsAddDiscountOpen(true);
    };

    const handleCloseAddDiscount = () => {
        setIsAddDiscountOpen(false);
    };

    return (
        <SellerLayout>
            {store && (
                <div className="">
                    <div className="w-full flex justify-between p-4 shadow-md border-b px-[3%]">
                        <div className=""></div>
                        <div className="flex items-center gap-2 text-gray-500 ">
                            <CgProfile size={26} />
                            <p className="text-gray-500 ">Salvato Luis</p>
                            <FaChevronDown />
                        </div>
                    </div>
                    <div className="flex flex-col w-full px-[5%] py-[2%] bg-white text-black gap-[2%]">
                        <div className="flex items-center bg-gray-100 py-[10px] px-[5%] rounded-b-md shadow mb-2 justify-between">
                            <div className="flex items-center gap-[10px]">
                                <img
                                    src={store?.imageUrl}
                                    alt={store?.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-xl font-semibold">{store?.name}</h2>
                                    <p
                                        onClick={openFollowersPopup}
                                        className="text-[14px] cursor-pointer text-gray-400 hover:text-black pb-4 rounded-md"
                                    >
                                        {store?.followers?.length} followers
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex">
                                    <p
                                        className="text-[14px] cursor-pointer text-gray-400 flex items-center gap-2 hover:text-black"
                                    >
                                        {store?.location} <IoLocation size={24} />
                                    </p>
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
                                <button onClick={handleAddDiscountClick} className="bg-primary text-white px-4 py-2 flex gap-2 items-center rounded-md"><IoMdAdd /> Add Discount</button>
                                <input
                                    type="text"
                                    className='border rounded-md px-2 outline-none focus:outline-none text-gray-500 py-1'
                                    placeholder='Search'
                                />
                            </div>
                            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:grid-cols-6">
                                {discounts.map((discount) => (
                                    <Link to={`/seller/products/${discount._id}/see-details`} key={discount._id} className="shadow-md hover:shadow-xl hover:border flex flex-col justify-between rounded-md p-4">
                                        <img src={discount.imageUrl} alt={discount.name} className="w-full object-cover rounded-md" />
                                        <div className="flex flex-col">
                                            <p className="text-[14px] text-gray-500 mt-4">{discount.store.name}</p>
                                            <p className="text-[17px] font-medium">{discount.name}</p>
                                            <p className="text-[14px] text-gray-500">{discount.description}</p>
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
                        </div>
                    </div>
                </div>
            )}
            {isAddDiscountOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
                        <p className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Discount</p>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="initialPrice" className="block text-sm font-medium text-gray-700">Initial Price</label>
                                <input type="number" id="initialPrice" name="initialPrice" value={formData.initialPrice} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                                <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image</label>
                                <input type="file" onChange={handleImageChange} id="imageUrl" name="imageUrl" accept="image/*" className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="serviceTime" className="block text-sm font-medium text-gray-700">Service Time</label>
                                <input type="text" id="serviceTime" value={formData.serviceTime} onChange={handleChange} name="serviceTime" className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 mb-4" />
                            </div>
                            {imageUrl && (
                                <div className='border border-gray-300 p-2 rounded-md mb-1'>
                                    <img src={imageUrl} alt="Uploaded" className="mt-4 w-[25%] rounded" />
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-gray-600 mr-4"
                                    onClick={handleCloseAddDiscount}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-80"
                                >
                                    {isLoading ? <Spinner /> : 'Add Discount'}
                                    {/* Add Discount */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SellerLayout>
    );
};

export default SellerSingleStore;
