import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Service } from '../../types';

interface ServiceFormProps {
    onClose: () => void;
    onSuccess: () => void;
    service?: Service | null;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onClose, onSuccess, service }) => {
    const [name, setName] = useState(service?.name || '');
    const [description, setDescription] = useState(service?.description || '');
    const [price, setPrice] = useState(service?.price || '');
    const [duration, setDuration] = useState<string>(service?.duration?.toString() || '');
    const [durationUnit, setDurationUnit] = useState<'minutes' | 'hours' | 'days'>('minutes');
    const [category, setCategory] = useState(service?.category || '');
    const [imageUrl, setImageUrl] = useState(service?.image_url || '');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const shopId = parseInt(id || '0', 10);

    const convertDurationToMinutes = (value: string, unit: 'minutes' | 'hours' | 'days'): number => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue < 0) {
            return 0;
        }

        switch (unit) {
            case 'hours':
                return numericValue * 60;
            case 'days':
                return numericValue * 10 * 60; // 10 hours per day
            default:
                return numericValue;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const durationInMinutes = convertDurationToMinutes(duration, durationUnit);
        const serviceData = { name, shop_id: shopId, description, price, duration: durationInMinutes, category, image_url: imageUrl };

        try {
            if (service) {
                await axios.put(`https://api.discoun3ree.com/api/services/${service.id}`, serviceData);
            } else {
                await axios.post('https://api.discoun3ree.com/api/services', serviceData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to save service', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post('https://api.discoun3ree.com/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImageUrl(response.data.url);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl text-center font-medium mb-4">{service ? 'Edit Service' : 'Add Service'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder='Enter name of the service'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Description</label>
                        <textarea
                            value={description}
                            placeholder='More info about the service...'
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Price</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='How much does it cost?'
                            className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Duration</label>
                        <div className="flex items-center w-full">
                            <label className="mr-2 text-gray-600 font-light text-[13px]">
                                <input
                                    type="radio"
                                    value="minutes"
                                    checked={durationUnit === 'minutes'}
                                    onChange={() => setDurationUnit('minutes')}
                                    className="mr-1"
                                />
                                Minutes
                            </label>
                            <label className="mr-2 text-gray-600 font-light text-[13px]">
                                <input
                                    type="radio"
                                    value="hours"
                                    checked={durationUnit === 'hours'}
                                    onChange={() => setDurationUnit('hours')}
                                    className="mr-1"
                                />
                                Hours
                            </label>
                            <label className='text-gray-600 font-light text-[13px]'>
                                <input
                                    type="radio"
                                    value="days"
                                    checked={durationUnit === 'days'}
                                    onChange={() => setDurationUnit('days')}
                                    className="mr-1"
                                />
                                Days
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={duration}
                                placeholder='How long does it take?'
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                            />                            
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Category</label>
                        <input
                            type="text"
                            value={category}
                            placeholder='Category of service'
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-[14px] font-medium">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full px-3.5 border border-gray-200 rounded-md text-[14px] outline-none focus:border-primary py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        {imageUrl && <img src={imageUrl} alt="Service" className="w-full h-auto" />}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 text-gray-600 font-light text-[15px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-red-700 text-white text-[14px] py-1.5 px-4 rounded-md focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceForm;
