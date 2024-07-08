import React from 'react';

interface PopupModalProps {
  discount: any;
  actionType: 'delete' | 'verify'; 
  onClose: () => void;
  onAction: () => void; 
}

const PopupModal: React.FC<PopupModalProps> = ({ discount, actionType, onClose, onAction }) => {
  
  const handleAction = () => {
    onAction();
    onClose(); 
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-md max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Discount Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
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
            <label className="text-[16px] font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-500 text-[14px] font-light">{discount.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Initial Price</label>
            <p className="text-gray-500 text-[14px] font-light">Ksh {discount.initial_price}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Discount</label>
            <p className="ftext-gray-500 text-[14px] font-light">Ksh {discount.discount}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Price After Discount</label>
            <p className="text-gray-500 text-[14px] font-light">Ksh {discount.price_after_discount}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Percentage Discount</label>
            <p className="text-gray-500 text-[14px] font-light">{discount.percentage_discount}%</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Voucher Amount</label>
            <p className="text-gray-500 text-[14px] font-light">KSh {discount.amount}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Expiry Date</label>
            <p className="text-gray-500 text-[14px] font-light">{new Date(discount.expiry_date).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-500 text-[14px] font-light">{discount.description}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Category</label>
            <p className="text-gray-500 text-[14px] font-light">{discount.category}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Shop ID</label>
            <p className="text-gray-500 text-[14px] font-light">{discount.shop_id}</p>
          </div>
          <div className="flex flex-col mb-4 col-span-2">
            <label className="text-[16px] font-medium text-gray-700 mb-1">Uploaded</label>
            <p className="text-gray-500 text-[14px] font-light">{new Date(discount.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mr-2 focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={handleAction}
            className={`${
              actionType === 'delete' ? 'bg-red-500' : 'bg-green-500'
            } text-white px-4 py-2 rounded-md hover:bg-${
              actionType === 'delete' ? 'red-600' : 'green-600'
            } focus:outline-none`}
          >
            {actionType === 'delete' ? 'Delete' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
