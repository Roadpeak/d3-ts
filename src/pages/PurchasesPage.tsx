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
      <div className="flex flex-col px-4 py-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Your Purchases</h1>
          <section className='w-full flex flex-col overflow-x-auto'>
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 text-start py-2">#</th>
                    <th className="px-4 text-start py-2">Product</th>
                    <th className="px-4 text-start py-2">Amount Paid</th>
                    <th className="px-4 text-start py-2">To Store Owner</th>
                    <th className="px-4 text-start py-2">Discount</th>
                    <th className="px-4 text-start py-2">Coupon Code</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <PurchaseRow key={product.id} purchase={product} index={index + 1} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 text-start py-2">#</th>
                    <th className="px-4 text-start py-2">Service</th>
                    <th className="px-4 text-start py-2">Amount Paid</th>
                    <th className="px-4 text-start py-2">To Store Owner</th>
                    <th className="px-4 text-start py-2">Discount</th>
                    <th className="px-4 text-start py-2">Coupon Code</th>
                    <th className="px-4 text-start py-2">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <PurchaseRow key={service.id} purchase={service} index={index + 1} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PurchaseRow: React.FC<{ purchase: Purchase; index: number }> = ({ purchase, index }) => {
  return (
    <tr>
      <td className="px-4 py-2 border-b">{index}</td>
      <td className="px-4 py-2 border-b">
        <div className="flex items-center">
          <FaShoppingBag className="text-primary mr-2" />
          <p className="text-lg font-medium">{purchase.productName}</p>
        </div>
      </td>
      <td className="px-4 py-2 border-b">Ksh. {purchase.amountPaid.toLocaleString('en-US')}</td>
      <td className="px-4 py-2 border-b">Ksh. {purchase.amountToStoreOwner.toLocaleString('en-US')}</td>
      <td className="px-4 py-2 border-b">{purchase.discount}%</td>
      <td className="px-4 py-2 border-b">{purchase.couponCode}</td>
      <td className="px-4 py-2 border-b">{purchase.bookingDateTime || '-'}</td>
    </tr>
  );
};


export default PurchasesPage;