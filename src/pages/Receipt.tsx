import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ReceiptProps {
  orderNumber: string;
  productName: string;
  amountPaid: number;
}

const Receipt: React.FC<ReceiptProps> = ({ orderNumber, productName, amountPaid }) => {
  return (
    <>
        <Navbar />
        <div className="px-[5%] mx-auto w-full md:w-2/5 my-8 p-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Receipt & Info</h2>
            <div className="mb-6">
                <p className="text-lg">
                <span className="font-semibold">Order Number:</span> {orderNumber}
                </p>
                <p className="text-lg">
                <span className="font-semibold">Product Name:</span> {productName}
                </p>
                <p className="text-lg">
                <span className="font-semibold">Store Name:</span> LC Waikiki
                </p>
                <p className="text-lg">
                <span className="font-semibold">Code:</span> QBF7R90MV
                </p>
            </div>
            <div className="mb-6">
                <p className="text-lg">
                <span className="font-semibold">Amount Paid:</span> Ksh. {amountPaid.toLocaleString("en-US")}
                </p>
            </div>
            <div className="mb-6 flex items-center">
                <FaCheckCircle className="text-2xl mr-2" />
                <p className="text-lg">Payment Successful!</p>
            </div>
            <div className="flex justify-between">
                <Link to="/" className="text-lg underline hover:text-gray-300">
                Back to Home
                </Link>
                <button className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-gray-100">
                Download Receipt
                </button>
            </div>
            </div>
        <Footer />
    </>
  );
};

export default Receipt;
