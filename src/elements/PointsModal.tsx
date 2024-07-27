import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    points: number;
}

const PointsModal: React.FC<ModalProps> = ({ isOpen, onClose, points }) => {
    if (!isOpen) return null;

    const pointsToShillings = points * 0.5;
    const redeemable = points >= 1000;

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white rounded-lg shadow-xl p-8 max-w-md w-full transform transition-transform ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 ">Reward Points</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className="mb-4">
                    <p className="text-[15px] text-gray-600">You have <span className="font-semibold text-blue-600">{points} points</span>.</p>
                    <p className="text-[15px] text-gray-600">This is equivalent to <span className="font-semibold text-green-600">{pointsToShillings} shillings</span>.</p>
                    <p className="text-[15px] text-gray-600">
                        Points can only be redeemed into cash once you accrue at least 1000 points.
                        {redeemable ? (
                            <span className="text-green-600 font-medium"> You can redeem your points now!</span>
                        ) : (
                            <span className="text-red-600 font-medium"> You need more points to redeem.</span>
                        )}
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="text-[20px] font-medium text-gray-800">How to Earn Points:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>For every booking you get on any offer in your store, you earn 10 points.</li>
                    </ul>
                </div>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-4 py-1.5 rounded-md focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PointsModal;
