import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReceiptProps {
  orderNumber: string;
  productName: string;
  amountPaid: number;
}

const Receipt: React.FC<ReceiptProps> = ({ orderNumber, productName, amountPaid }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadReceipt = () => {
    const input = receiptRef.current;
    if (input) {
      input.classList.add('hide-links-buttons');
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('receipt.pdf');
        input.classList.remove('hide-links-buttons');
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full px-4 md:px-0 flex-col gap-2">
        <div ref={receiptRef} className="px-[3%] mx-auto w-full md:w-2/5 mt-8 mb-4 p-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">Receipt & Info</h2>
          <div className="mb-6">
            <p className="text-lg flex w-full items-center justify-between">
              <span className="font-medium">Order Number:</span> {orderNumber}
            </p>
            <p className="text-lg flex w-full items-center justify-between">
              <span className="font-medium">Product Name:</span> {productName}
            </p>
            <p className="text-lg flex w-full items-center justify-between">
              <span className="font-medium">Store Name:</span> LC Waikiki
            </p>
            <p className="text-lg flex w-full items-center justify-between">
              <span className="font-medium">Coupon Code:</span> QBF7R90MV
            </p>
          </div>
          <div className="mb-6">
            <p className="text-lg flex w-full items-center justify-between">
              <span className="font-medium">Amount Paid:</span> Ksh. {amountPaid.toLocaleString("en-US")}
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <FaCheckCircle className="text-2xl mr-2" />
            <p className="text-lg">Payment Successful!</p>
          </div>
        </div>
        <div className="mx-auto px-[3#] w-full md:w-2/5 mb-4 items-center flex justify-between">
          <Link to="/" className="text-lg underline hover:text-gray-500">
            Back to Home
          </Link>
          <button onClick={downloadReceipt} className="bg-[#F24E51] text-white px-6 py-2 rounded-full hover:bg-gray-100">
            Download Receipt
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Receipt;
