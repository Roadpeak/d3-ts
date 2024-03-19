import React, { useState } from 'react';
import SellerLayout from '../../utils/layouts/SellerLayout';
import { CgProfile } from 'react-icons/cg';
import { FaChevronDown, FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';

const fakeAppointments = [
  { id: 1, name: 'John Doe', phoneNumber: '123-456-7890', status: 'Paid', fulfilled: true, amount: 100, discount: 10 },
  { id: 2, name: 'Jane Smith', phoneNumber: '987-654-3210', status: 'Unpaid', fulfilled: false, amount: 80, discount: 0 },
  { id: 3, name: 'Alice Johnson', phoneNumber: '456-789-0123', status: 'Paid', fulfilled: true, amount: 120, discount: 15 },
];

const Appointments: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSaveAsPDF = () => {
    // Logic to save appointments as PDF
    console.log('Appointments saved as PDF');
  };

  return (
    <SellerLayout>
      <div className="">
        <div className="w-full flex justify-between p-4 shadow-md border-b px-[3%]">
          <div className=""></div>
          <div className="flex items-center gap-2 text-gray-500 ">
            <CgProfile size={26} />
            <p className="text-gray-500 ">Salvato Luis</p>
            <FaChevronDown />
          </div>
        </div>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold mb-6">Appointments</h1>
          <div className="flex justify-end mb-4">
            <button className="bg-primary flex gap-1 items-center text-white px-4 py-2 rounded-md mr-2" onClick={() => setIsPopupOpen(true)}>
              <FaFilePdf className="" /> Save as PDF
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 text-start px-4">ID</th>
                <th className="py-2 text-start px-4">Name</th>
                <th className="py-2 text-start px-4">Phone Number</th>
                <th className="py-2 text-start px-4">Status</th>
                <th className="py-2 text-start px-4">Fulfilled</th>
                <th className="py-2 text-start px-4">Amount</th>
                <th className="py-2 text-start px-4">Discount</th>
                <th className="py-2 text-start px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fakeAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="py-2 px-4">{appointment.id}</td>
                  <td className="py-2 px-4">{appointment.name}</td>
                  <td className="py-2 px-4">{appointment.phoneNumber}</td>
                  <td className={`py-2 px-4 `}>
                    <p className={`w-fit px-3 py-1 rounded-md ${appointment.status === 'Paid' ? 'bg-green-200' : 'bg-red-200'}`}>
                        {appointment.status}
                    </p>
                  </td>
                  <td className={`py-2 px-4`}>
                    <p className={`w-fit px-3 py-1 rounded-md ${appointment.fulfilled ? 'bg-green-200' : 'bg-red-200'}`}>
                        {appointment.fulfilled ? 'Fulfilled' : 'Unfulfilled'}
                    </p>
                  </td>
                  <td className="py-2 px-4">KES {appointment.amount}</td>
                  <td className="py-2 px-4">KES {appointment.discount}</td>
                  <td className="py-2 px-4">
                    <FaEdit className="text-primary cursor-pointer mr-2" />
                    <FaTrash className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Save as PDF</h2>
            <p className="text-gray-600 mb-6">Do you want to save appointments as PDF?</p>
            <div className="flex justify-end">
              <button className="text-gray-600 mr-4" onClick={handlePopupClose}>Cancel</button>
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80" onClick={handleSaveAsPDF}>Save</button>
            </div>
          </div>
        </div>
      )}
    </SellerLayout>
  );
};

export default Appointments;
