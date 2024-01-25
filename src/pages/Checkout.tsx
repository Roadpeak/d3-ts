import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Soul soothing massage',
    price: 500,
  },
  {
    id: 2,
    title: 'Car tyre repair, 70% OFF',
    price: 8000,
  },
  // Add more products as needed
];

const Checkout: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const [mpesaDetails, setMpesaDetails] = useState({ phoneNumber: '' });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', cvv: '', expiry: '' });

  const navigate = useNavigate();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleGatewaySelect = (gateway: string) => {
    setSelectedGateway(gateway);
    setMpesaDetails({ phoneNumber: '' });
    setCardDetails({ cardNumber: '', cvv: '', expiry: '' });
  };

  const handleMpesaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMpesaDetails({ phoneNumber: e.target.value });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCheckout = () => {
    // Add your checkout logic here
    console.log(`Product: ${selectedProduct?.title}, Gateway: ${selectedGateway}`);
    console.log('Details:', selectedGateway === 'mpesa' ? mpesaDetails : cardDetails);
    navigate('/receipt/view')
  };

  return (
    <>
        <Navbar />
         <div className="px-[5%] mx-auto bg-white py-[2%]">
        <h2 className="text-3xl font-semibold mb-4">Checkout</h2>

        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">Select Product</h3>
            <ul>
                {products.map((product) => (
                <li
                    key={product.id}
                    className={`cursor-pointer my-2 p-4 border rounded-lg ${
                    selectedProduct?.id === product.id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => handleProductSelect(product)}
                >
                    <div className="flex items-center justify-between">
                    <span>{product.title}</span>
                    <span className="font-semibold">Ksh. {product.price}</span>
                    </div>
                </li>
                ))}
            </ul>
            </div>

            <div className="w-full md:w-1/2 ">
            <h3 className="text-xl font-semibold mb-2">Payment via</h3>
            <div className="flex flex-col gap-4">
                <label
                className={`cursor-pointer p-4 border rounded-md ${
                    selectedGateway === 'mpesa' ? 'bg-gray-50' : ''
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
                {selectedGateway === 'mpesa' && (
                    <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="border outline-none p-2 mt-2"
                    value={mpesaDetails.phoneNumber}
                    onChange={handleMpesaInputChange}
                    />
                )}
                </div>
                </label>

                <label
                className={`cursor-pointer p-4 border rounded-md ${
                    selectedGateway === 'card' ? 'bg-gray-50' : ''
                }`}
                >
                <input
                    type="radio"
                    name="gateway"
                    value="card"
                    onChange={() => handleGatewaySelect('card')}
                />
                <div className="flex items-center gap-2">
                    <img 
                        src="https://imgs.search.brave.com/dXCE-WJuXRMQUkkb88Uh5dpDISHy1mc4Yc9_2hBqApI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91c2Eu/dmlzYS5jb20vZGFt/L1ZDT00vcmVnaW9u/YWwvdmUvcm9tYW5p/YS9ibG9ncy9oZXJv/LWltYWdlL3Zpc2Et/bG9nby04MDB4NDUw/LmpwZw" 
                        className='w-[100px]' 
                        alt=""
                    />
                    <img 
                        src="https://imgs.search.brave.com/FTbABrpr5DauchTd3jS5PmLhGIvA8oZY3csPRDwzIw0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmhxL2lt/YWdlcy9wcmV2aWV3/cy82NDAvbWFzdGVy/Y2FyZC1sb2dvLTY3/OTMyLmpwZz9mbXQ" 
                        alt="" 
                        className="w-[100px]" 
                    />
                </div>
                <div className="flex flex-col ">
                    Visa/Mastercard
                    {selectedGateway === 'card' && (
                        <>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            className="border rounded-md outline-none p-2 mt-2"
                            value={cardDetails.cardNumber}
                            onChange={handleCardInputChange}
                        />
                        <div className="flex items-center w-full gap-[2%]">
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                className="border rounded-md outline-none w-full p-2 mt-2"
                                value={cardDetails.cvv}
                                onChange={handleCardInputChange}
                            />
                            <input
                                type="text"
                                name="expiry"
                                placeholder="Expiry Date"
                                className="border rounded-md outline-none w-full p-2 mt-2"
                                value={cardDetails.expiry}
                                onChange={handleCardInputChange}
                            />
                        </div>
                        </>
                    )}
                </div>
                </label>

                <label
                className={`cursor-pointer p-4 border rounded-lg ${
                    selectedGateway === 'paypal' ? 'bg-blue-100' : ''
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

        <div className="mt-8">
            {selectedProduct && selectedGateway && (
            <div>
                <h3 className="text-xl font-semibold mb-4">Purchase Summary</h3>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-lg font-semibold">{selectedProduct.title}</p>
                    <p className="text-gray-500">Amount for discount: Ksh. {(0.2 * selectedProduct.price).toLocaleString("en-US")}</p>
                    <p className="text-gray-500">Payment: <span className="uppercase">{selectedGateway}</span></p>
                </div>
            </div>
            )}

            <button
                className="mt-4 bg-primary text-white py-3 px-6 rounded-md"
                onClick={handleCheckout}
                // disabled={!selectedProduct || !selectedGateway}
                >
                Complete
            </button>
        </div>
        </div>
        <Footer />
    </>
  );
};

export default Checkout;
