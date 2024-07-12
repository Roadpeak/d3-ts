import React from 'react';
import axios from 'axios';

const VerificationModal: React.FC<{ onClose: () => void; onVerify: (phone: string) => void; phone: string }> = ({ onClose, onVerify, phone }) => {
    const handleSubmit = async () => {
        try {
            await axios.post('https://api.discoun3ree.com/api/users/request-otp', { phone });
            onVerify(phone);
            onClose();
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-[24px] border-b border-gray-200 mb-2 font-medium">Verify Your Account</h2>
                <p className='mb-2 text-gray-600 font-medium '>Please verify your phone number to activate your account.</p>
                <p className='text-gray-700 font-light mb-1'>{phone}</p>
                <button onClick={handleSubmit} className="bg-primary text-white px-4 py-1 rounded">Verify</button>
                <button onClick={onClose} className="ml-2 p-2 rounded">Cancel</button>
            </div>
        </div>
    );
};

export default VerificationModal;
