import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    image_url: string;
    price: number;
}

const Checkout: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
    const [mpesaDetails, setMpesaDetails] = useState({ phoneNumber: '' });
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', cvv: '', expiry: '' });
    const [discount, setDiscount] = useState<any>(null);
    const [showPaymentPopup, setShowPaymentPopup] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/discounts/${id}`);
                setDiscount(response.data);
            } catch (error) {
                console.error('Error fetching discount:', error);
            }
        };

        fetchDiscount();
    }, [id]);

    const handleGatewaySelect = (gateway: string) => {
        setSelectedGateway(gateway);
        setMpesaDetails({ phoneNumber: '' });
        setCardDetails({ cardNumber: '', cvv: '', expiry: '' });
        setShowPaymentPopup(true);
    };

    const handleMpesaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMpesaDetails({ phoneNumber: e.target.value });
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleCheckout = () => {
        console.log(`Product: ${selectedProduct?.name}, Gateway: ${selectedGateway}`);
        console.log('Details:', selectedGateway === 'mpesa' ? mpesaDetails : cardDetails);
        navigate('/receipt/view')
    };

    const handleClosePopup = () => {
        setShowPaymentPopup(false);
        window.location.reload();
    };

    return (
        <>
            <Navbar />
            <div className="px-[5%] mx-auto bg-white py-[2%]">
                <h2 className="text-[18px] font-medium mb-4">Checkout</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        {discount && (
                            <div className='flex items-center gap-2 bg-gray-100 p-2 rounded-md'>
                                <img src={discount.imageUrl} className='w-[110px] rounded-lg' alt="" />
                                <div className="flex flex-col ">
                                    <p className='font-medium text-[20px]'>{discount?.name}</p>
                                    <p className="text-gray-600">Voucher: <span className="font-medium">Ksh. {((discount.initial_price) - (discount.price_after_discount)) * 0.2}</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 ">
                        <h3 className="text-[16px] font-medium text-black mb-2">Make payment Via</h3>
                        <div className="flex flex-col gap-4">
                            <label
                                className={`cursor-pointer p-4 border rounded-md ${selectedGateway === 'mpesa' ? 'bg-gray-50' : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="gateway"
                                    value="mpesa"
                                    onChange={() => handleGatewaySelect('mpesa')}
                                />
                                <img src='https://imgs.search.brave.com/-8NOtwE_p1CKFQNjYquNzIoND4bFQE51XUbNGQITkzU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8zODgt/Mzg4OTMzMV9tLXBl/c2EtbG9nby1wbmct/bS1wZXNhLXRyYW5z/cGFyZW50LXBuZy5w/bmc' alt="" className="w-[100px]" />
                                <div className="flex flex-col">
                                    Mpesa
                                </div>
                            </label>

                            <label className={`cursor-pointer p-4 border rounded-md transition-colors duration-300 ${selectedGateway === 'card' ? 'bg-gray-50 border-gray-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="gateway"
                                    value="card"
                                    onChange={() => handleGatewaySelect('card')}
                                />
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://imgs.search.brave.com/dXCE-WJuXRMQUkkb88Uh5dpDISHy1mc4Yc9_2hBqApI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91c2Eu/dmlzYS5jb20vZGFt/L1ZDT00vcmVnaW9u/YWwvdmUvcm9tYW5p/YS9ibG9ncy9oZXJv/LWltYWdlL3Zpc2Et/bG9nby04MDB4NDUw/LmpwZw"
                                        className='w-[100px] h-auto'
                                        alt="Visa/Mastercard Logo"
                                    />
                                    <img
                                        src="https://imgs.search.brave.com/FTbABrpr5DauchTd3jS5PmLhGIvA8oZY3csPRDwzIw0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmhxL2lt/YWdlcy9wcmV2aWV3/cy82NDAvbWFzdGVy/Y2FyZC1sb2dvLTY3/OTMyLmpwZz9mbXQ"
                                        alt="Visa/Mastercard Logo"
                                        className="w-[100px] h-auto"
                                    />
                                </div>
                            </label>
                            <label
                                className={`cursor-pointer p-4 border rounded-lg ${selectedGateway === 'paypal' ? 'bg-blue-100' : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="gateway"
                                    value="paypal"
                                    onChange={() => handleGatewaySelect('paypal')}
                                />
                                <img
                                    src="https://imgs.search.brave.com/1DfyBY-t63tkQ27ZvIctOXgJ8C56tK2ed3HvxVG3VlI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1MzAu/cG5n"
                                    alt=""
                                    className="w-[120px]"
                                />
                                Paypal
                            </label>
                        </div>
                    </div>
                </div>

                {showPaymentPopup && (
                    <div className="absolute h-full top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 w-[80%] md:w-1/3 rounded-lg">

                            {selectedGateway === 'mpesa' && (
                                <div className="flex flex-col">
                                    <p className="text-center mb-2 ">Enter Your Mpesa number</p>
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        className="border outline-none p-2 mt-2"
                                        value={mpesaDetails.phoneNumber}
                                        onChange={handleMpesaInputChange}
                                    />
                                    <div className="flex w-full items-center justify-end">
                                        <button className="mt-4 text-primary mr-4 border-none outline-none" onClick={handleClosePopup}>Cancel</button>
                                        <button
                                            className="mt-4 bg-primary text-white py-3 px-6 rounded-md"
                                            onClick={handleCheckout}
                                        >
                                            Complete
                                        </button>
                                    </div>
                                </div>
                            )}
                            {selectedGateway === 'card' && (
                                <div className='flex flex-col justify-center '>
                                    <p className="text-center text-gray-700 text-[18px] mb-4 font-medium">Enter Your Visa/Mastercard Information</p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Card Number"
                                            className="border rounded-md outline-none p-3 text-gray-800 placeholder-gray-500 focus:border-primary focus:ring-primary"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="CVV"
                                            className="border rounded-md outline-none flex-1 p-3 text-gray-800 placeholder-gray-500 focus:border-primary focus:ring-primary"
                                            value={cardDetails.cvv}
                                            onChange={handleCardInputChange}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="Expiry Date"
                                        className="border rounded-md outline-none flex-1 p-3 text-gray-800 placeholder-gray-500 focus:border-primary focus:ring-primary"
                                        value={cardDetails.expiry}
                                        onChange={handleCardInputChange}
                                    />
                                    <div className="flex w-full items-center justify-end">
                                        <button className="mt-4 text-primary mr-4 border-none outline-none" onClick={handleClosePopup}>Cancel</button>
                                        <button
                                            className="mt-4 bg-primary text-white py-3 px-6 rounded-md"
                                            onClick={handleCheckout}
                                        >
                                            Complete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    {selectedProduct && selectedGateway && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Purchase Summary</h3>
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <p className="text-lg font-semibold">{selectedProduct.name}</p>
                                <p className="text-gray-500">Amount for discount: <span className="font-medium">Ksh. {(0.2 * selectedProduct.price).toLocaleString("en-US")}</span></p>
                                <p className="text-gray-500">Payment: <span className="uppercase font-medium">{selectedGateway}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
