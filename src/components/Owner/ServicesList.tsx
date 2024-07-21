import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';
import { useParams } from 'react-router-dom';
import SellerLayout from '../../elements/SellerLayout';
import { Service } from '../../types';
import { FiEdit3 } from 'react-icons/fi';
import { BiDetail } from 'react-icons/bi';
import ServiceDetails from './ServiceDetails';
import { FaRegEye } from 'react-icons/fa';

const ServicesList: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState<Service | null>(null);
    const [editService, setEditService] = useState<Service | null>(null);
    const { id } = useParams();
    const shopId = parseInt(id || '0', 10);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`https://api.discoun3ree.com/api/shops/${shopId}/services`);
                setServices(response.data);
            } catch (error) {
                console.error('Failed to fetch services', error);
            }
        };

        fetchServices();
    }, [shopId]);

    const handleFormSuccess = () => {
        fetchServices();
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/shops/${shopId}/services`);
            setServices(response.data);
        } catch (error) {
            console.error('Failed to fetch services', error);
        }
    };

    const handleEditClick = (service: Service) => {
        setEditService(service);
        setShowForm(true);
    };

    const handleDetailsClick = (service: Service) => {
        setShowDetails(service);
    };
    const handleClose = () => {
        setShowForm(false);
        window.location.reload();
    };

    return (
        <SellerLayout>
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl font-semibold"></h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-primary hover:bg-red-700 text-white py-1.5 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        >
                            Add Service
                        </button>
                    </div>
                </div>

                <div className="w-full gap-2 flex flex-col pb-8 pt-2">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-medium text-[13px] text-dark tracking-wide">Services</p>
                        <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                    </div>
                    <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
                        <div className="bg-light w-full rounded-lg">
                            <table className="table-auto w-full rounded-md">
                                <thead className=''>
                                    <tr className="bg-light border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Price (KES)</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Duration</th>
                                        <th className="px-4 text-start font-normal pb-2 pt-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                                    {services.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">
                                                No services found.
                                            </td>
                                        </tr>
                                    ) : (
                                        services.map((service) => (
                                            <tr key={service.id} className="cursor-pointer border-b py-2 border-gray-100 hover:bg-gray-100">
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3" >{service.name}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3" >{service.price}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3" >{service.duration}</td>
                                                <td className="px-4 text-[14px] text-gray-600 font-light py-3 flex gap-2">
                                                    <button onClick={() => handleEditClick(service)} className=""><FiEdit3 /></button>
                                                    <button onClick={() => handleDetailsClick(service)} className="ml-2"><FaRegEye /></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {showForm && (
                    <ServiceForm
                        onClose={() => {
                            setShowForm(false);
                            window.location.reload();
                        }}
                        onSuccess={handleFormSuccess}
                        service={editService}
                    />
                )}
                {showDetails && (
                    <ServiceDetails
                        service={showDetails}
                        onClose={() => setShowDetails(null)}
                    />
                )}
            </div>
        </SellerLayout>
    );
};

export default ServicesList;
