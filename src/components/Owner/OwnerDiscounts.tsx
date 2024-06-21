import React, { useEffect, useState } from 'react';
import SellerLayout from '../../elements/SellerLayout';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

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

const OwnerDiscounts: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [discounts, setDiscounts] = useState<DiscountData[]>([]);
    const [discountData, setDiscountData] = useState<DiscountData>({
        id: 0,
        name: '',
        initial_price: 0,
        discount: 0,
        expiry_date: '',
        service_time_hours: 0,
        image_url : '',
        category: '',
        description: '',
        shop_id: parseInt(id ?? '0')
    });
    const [openForm, setOpenForm] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<DiscountData | null>(null);
    const [showPopup, setShowPopup] = useState(false);
      const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/discounts`, {
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
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDiscountData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCloseAddDiscount = () => {
        setOpenForm(false);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('https://api.discoun3ree.com/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            setImageUrl(response.data.url);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            setIsLoading(true);

            await axios.post('https://api.discoun3ree.com/api/discounts', {
                ...discountData,
                image_url: imageUrl,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDiscountData({
                id: 0,
                name: '',
                initial_price: 0,
                discount: 0,
                expiry_date: '',
                service_time_hours: 0,
                image_url : imageUrl,
                category: '',
                description: '',
                shop_id: parseInt(id ?? '0')
            });
            setImageUrl('');
            setIsLoading(false);
            setOpenForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding discount:', error);
            setIsLoading(false);
        }
    };

    const minExpiryDate = new Date();
    minExpiryDate.setDate(minExpiryDate.getDate() + 1);
    const minExpiryDateString = minExpiryDate.toISOString().split('T')[0];

    const handleRowClick = (discount: DiscountData) => {
        setSelectedDiscount(discount);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <SellerLayout>
            <div className="flex flex-col w-full">
                <div className="flex justify-start w-[220px]">
                    <button
                        className="bg-primary px-4 py-1.5 flex items-center gap-2 rounded-md text-white text-[14px]"
                        onClick={() => setOpenForm(true)}
                    >
                        <IoMdAdd />
                        Add New Discount
                    </button>
                </div>
                <div className="w-full gap-2 flex flex-col py-8">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
                        <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                    </div>
                    <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
                        <div className="bg-light w-full rounded-lg">
                            <table className="table-auto w-full rounded-md">
                                <thead className=''>
                                    <tr className="bg-light border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Expiry</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                                    {discounts.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">
                                            No Verified discounts found.
                                            </td>
                                        </tr>
                                    ) : (
                                        discounts.map((discount) => (
                                        <tr key={discount.id} onClick={() => handleRowClick(discount)} className="cursor-pointer border-b py-2 border-gray-100 hover:bg-gray-100">
                                            <td className="px-4 py-3">{discount.name}</td>
                                            <td className="px-4 py-3">{discount.initial_price}</td>
                                            <td className="px-4 py-3">{discount.discount}</td>
                                            <td className="px-4 py-3">{new Date(discount.expiry_date).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {openForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-h-[90vh] overflow-auto relative rounded-lg shadow-lg p-8 w-full max-w-md">
                        <button onClick={handleCloseAddDiscount} className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-300">
                            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Discount</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Discount Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={discountData.name}
                                    placeholder='e.g. Summer Sale'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="initial_price" className="block text-sm font-medium text-gray-700">Initial Price</label>
                                <input
                                    type="number"
                                    id="initial_price"
                                    name="initial_price"
                                    value={discountData.initial_price}
                                    placeholder='e.g. 5000'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount Amount</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={discountData.discount}
                                    placeholder='e.g. 1500'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    type="date"
                                    id="expiry_date"
                                    name="expiry_date"
                                    value={discountData.expiry_date}
                                    min={minExpiryDateString}
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="service_time_hours" className="block text-sm font-medium text-gray-700">Service Time (hrs)</label>
                                <input
                                    type="number"
                                    id="service_time_hours"
                                    name="service_time_hours"
                                    value={discountData.service_time_hours}
                                    placeholder='e.g. 2'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={discountData.category}
                                    placeholder='e.g. Beauty, Spa'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={discountData.description}
                                    placeholder='Enter discount description...'
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                                    onChange={handleImageChange}
                                />
                                {loading && (
                                    <div className="flex justify-center items-center mt-4">
                                    <FaSpinner className="animate-spin text-primary text-2xl" />
                                    </div>
                                )}
                                {imageUrl && (
                                    <div>
                                    <img src={imageUrl} alt="Uploaded" className="mt-4 w-full h-[100px] rounded" />
                                    </div>
                                )}
                                </div>
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
                                    {isLoading ? 'Loading...' : 'Add Discount'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
             {showPopup && selectedDiscount && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-h-[90vh] overflow-auto rounded-lg shadow-lg relative p-8 w-full max-w-md">
                        <button onClick={closePopup} className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-300">
                            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">{selectedDiscount.name}</h2>
                        <p className='text-gray-600 text-[15px] flex w-full justify-between border-b border-gray-200 mt-2'>Initial Price <span>{selectedDiscount.initial_price}</span></p>
                        <p className='text-gray-600 text-[15px] flex w-full justify-between border-b border-gray-200 mt-2'>Discount <span>{selectedDiscount.discount}</span></p>
                        <p className='text-gray-600 text-[15px] flex w-full justify-between border-b border-gray-200 mt-2'>EXpiry Date <span>{new Date(selectedDiscount.expiry_date).toLocaleDateString()}</span></p>
                        <p className='text-gray-600 text-[15px] flex w-full justify-between border-b border-gray-200 mt-2'>Service Time (hrs) <span>{selectedDiscount.service_time_hours}</span></p>
                        <p className='text-gray-600 text-[15px] flex w-full justify-between border-b border-gray-200 mt-2'>Category <span>{selectedDiscount.category}</span></p>
                        <p className='text-gray-600 text-center font-light text-[13px]'>{selectedDiscount.description}</p>
                        {selectedDiscount.image_url && <img src={selectedDiscount.image_url} alt="Discount" className="mt-4 w-full rounded" />}
                        <div className="flex justify-end mt-4">
                            <button className="bg-primary text-white px-6 py-1.5 rounded-md hover:bg-opacity-80" onClick={closePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SellerLayout>
    );
};

export default OwnerDiscounts;
