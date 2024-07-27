import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRepost: (newExpiryDate: string) => void;
    discountName: string;
}

const RepostModal: React.FC<ModalProps> = ({ isOpen, onClose, onRepost, discountName }) => {
    const [newExpiryDate, setNewExpiryDate] = useState('');

    if (!isOpen) return null;

    const handleRepost = () => {
        onRepost(newExpiryDate);
    };

    const minExpiryDate = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[20px] font-medium">Repost Offer</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className="mb-4">
                    <p>Repost the discount  <span className="font-medium">{discountName}</span></p>
                    <label className="block text-gray-700 text-sm mb-1" htmlFor="newExpiryDate">
                        Set New Expiry Date:
                    </label>
                    <input
                        type="date"
                        id="newExpiryDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newExpiryDate}
                        onChange={(e) => setNewExpiryDate(e.target.value)}
                        min={minExpiryDate}
                    />
                </div>
                <div className="text-right">
                    <button
                        onClick={handleRepost}
                        className="bg-primary text-white px-4 py-1.5 rounded"
                    >
                        Repost
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepostModal;
