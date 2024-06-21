import React from 'react';

interface UnverifiedModalProps {
  discount: any;
  onClose: () => void;
  onVerify: (id: number) => void;
}

const UnverifiedModal: React.FC<UnverifiedModalProps> = ({ discount, onClose, onVerify }) => {

  const handleVerify = () => {
    // Implement verification logic here
    onVerify(discount.id); // Call parent function to handle verification
    onClose(); // Close modal after verification
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Unverified Discount Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-500 mb-1">Name</label>
            <p className="font-medium">{discount.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-500 mb-1">Initial Price</label>
            <p className="font-medium">${discount.initial_price}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-500 mb-1">Discount</label>
            <p className="font-medium">${discount.discount}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-500 mb-1">Expiry Date</label>
            <p className="font-medium">{new Date(discount.expiry_date).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-sm text-gray-500 mb-1">Description</label>
            <p className="font-medium">{discount.description}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-sm text-gray-500 mb-1">Category</label>
            <p className="font-medium">{discount.category}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-sm text-gray-500 mb-1">Shop ID</label>
            <p className="font-medium">{discount.shop_id}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-sm text-gray-500 mb-1">Created At</label>
            <p className="font-medium">{new Date(discount.created_at).toLocaleString()}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-sm text-gray-500 mb-1">Updated At</label>
            <p className="font-medium">{new Date(discount.updated_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mr-2 focus:outline-none">
            Close
          </button>
          <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnverifiedModal;
