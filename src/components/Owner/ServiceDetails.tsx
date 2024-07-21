import React from 'react';
import { Service } from '../../types';

interface ServiceDetailsProps {
    service: Service;
    onClose: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg">
                <h2 className="text-xl mb-4">Service Details</h2>
                <div className="mb-4">
                    <label className="text-gray-800 font-medium text-[14px]">Name</label>
                    <p className='text-gray-600 font-light text-[13px]'>{service.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <p>{service.description}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <p>{service.price}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duration</label>
                    <p>{service.duration}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <p>{service.category}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    {service.image_url && <img src={service.image_url} alt="Service" className="w-full h-auto" />}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
