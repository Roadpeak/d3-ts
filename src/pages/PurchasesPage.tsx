import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaClock, FaShoppingBag } from 'react-icons/fa';

interface Purchase {
  id: number;
  productName: string;
  amountPaid: number;
  amountToStoreOwner: number;
  discount: number;
  couponCode: string;
  image: string;
  bookingDateTime?: string; 
}

const PurchasesPage: React.FC = () => {

  const products: Purchase[] = [
  {
    id: 1,
    productName: 'Samsung Galaxy S21',
    amountPaid: 45000,
    amountToStoreOwner: 42000,
    discount: 10,
    couponCode: 'SALE2023',
    image: 'https://placekitten.com/200/300?random=1',
  },
  {
    id: 2,
    productName: 'Apple iPhone 13',
    amountPaid: 60000,
    amountToStoreOwner: 55000,
    discount: 8,
    couponCode: 'IPHONEXMAS',
    image: 'https://placekitten.com/200/300?random=2',
  },
  {
    id: 3,
    productName: 'Sony 65-inch 4K TV',
    amountPaid: 85000,
    amountToStoreOwner: 80000,
    discount: 6,
    couponCode: 'SONYTVSALE',
    image: 'https://placekitten.com/200/300?random=3',
  },

  {
    id: 10,
    productName: 'Dell Inspiron Laptop',
    amountPaid: 42000,
    amountToStoreOwner: 39000,
    discount: 12,
    couponCode: 'DELLSAVINGS',
    image: 'https://placekitten.com/200/300?random=10',
  },
];

const services: Purchase[] = [
  {
    id: 1,
    productName: 'Spa Massage Therapy',
    amountPaid: 2500,
    amountToStoreOwner: 2000,
    discount: 20,
    couponCode: 'RELAXNOW',
    image: 'https://placekitten.com/200/300?random=11',
    bookingDateTime: '2023-05-01 15:00',
  },
  {
    id: 2,
    productName: 'Gourmet Dinner Experience',
    amountPaid: 3500,
    amountToStoreOwner: 3000,
    discount: 15,
    couponCode: 'DININGDEAL',
    image: 'https://placekitten.com/200/300?random=12',
    bookingDateTime: '2023-04-25 19:30',
  },
  {
    id: 3,
    productName: 'Fitness Training Session',
    amountPaid: 2000,
    amountToStoreOwner: 1800,
    discount: 10,
    couponCode: 'FITNESS2023',
    image: 'https://placekitten.com/200/300?random=13',
    bookingDateTime: '2023-04-28 08:00',
  },

  {
    id: 10,
    productName: 'Online Cooking Class',
    amountPaid: 1800,
    amountToStoreOwner: 1600,
    discount: 12,
    couponCode: 'COOKINGFUN',
    image: 'https://placekitten.com/200/300?random=20',
    bookingDateTime: '2023-05-03 16:00',
  },
];

  return (
    <div>
      <Navbar />
      <div className="flex px-[5%] flex-col py-8 bg-gray-100 min-h-screen">
        <div className="flex flex-col gap-4 items-start w-full mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Your Purchases</h1>
          <div className="w-full flex-col md:flex-row flex gap-[2%]">
            <div className='w-full flex flex-col gap-[2%]'>
              {products.map((product) => (
                <div key={product.id} className="bg-white mb-2 md:mb-0 rounded-md flex gap-[2%] overflow-hidden shadow-md">
                  <div className="relative h-auto overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="object-cover hidden md:flex     w-full h-[100px]"
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <FaShoppingBag className="text-primary mr-2" />
                      <p className="text-lg font-semibold">{product.productName}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <p className="text-gray-500">Amount Paid: Ksh. {product.amountPaid.toLocaleString('en-US')}</p>
                        <p className="text-gray-500">To Store Owner: Ksh. {product.amountToStoreOwner.toLocaleString('en-US')}</p>
                      </div>
                      <div className="w-1/2">
                        <p className="text-gray-500">Discount Granted: {product.discount}%</p>
                        <p className="text-gray-500">Coupon Code: {product.couponCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          <div className='w-full flex flex-col gap-[2%]'>
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-md mb-2 flex gap-[2%] overflow-hidden shadow-md">
                  <div className="relative h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.productName}
                      className="object-cover hidden md:flex w-full h-[100px]"
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <FaShoppingBag className="text-primary mr-2" />
                      <p className="text-lg font-semibold">{service.productName}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <p className="text-gray-500">Amount Paid: Ksh. {service.amountPaid.toLocaleString('en-US')}</p>
                        <p className="text-gray-500">To Store Owner: Ksh. {service.amountToStoreOwner.toLocaleString('en-US')}</p>
                      </div>
                      <div className="w-1/2">
                        <p className="text-gray-500">Discount Granted: {service.discount}%</p>
                        <p className="text-gray-500">Coupon Code: {service.couponCode}</p>
                        <p className="text-gray-500">Booking Date & Time: {service.bookingDateTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasesPage;
