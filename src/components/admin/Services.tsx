import React, { useEffect, useState } from 'react'
import { fetchServices } from '../../services/apiService';
import { Service } from '../../types';
import AdminLayout from '../../utils/layouts/AdminLayout';
import SideMenu from './SideMenu';
import { FaRegEye } from 'react-icons/fa';
import Modal from './Modal';

const Services:React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    useEffect(() => {
        const fetchServicesData = async () => {
            setLoading(true);
            try {
                const servicesData = await fetchServices();
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicesData();
    }, []);

    const handleRowClick = (service: Service) => {
        setSelectedService(service);
    };

  return (
      <AdminLayout>
        <div className="flex flex-col">
            <SideMenu />
              <div>
                  <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
                      <div className="w-full rounded-lg">
                          <table className="table-auto w-full rounded-md">
                              <thead className="">
                                  <tr className="bg-gray-200 border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Image</th>
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Duration (minutes)</th>
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Store</th>
                                      <th className="px-4 text-start font-normal pb-2 pt-4">Action</th>
                                  </tr>
                              </thead>
                              <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                                  {services.length === 0 ? (
                                      <tr>
                                          <td colSpan={6} className="text-center py-4">
                                              No services found.
                                          </td>
                                      </tr>
                                  ) : (
                                      services.map((service, index) => (
                                          <tr
                                              key={service.id}
                                              className="border-b py-2 border-gray-100 hover:bg-gray-50 cursor-pointer" 
                                              onClick={() => handleRowClick(service)}                                             
                                          >
                                              <td className="px-4 py-3">
                                                  <img src={service.image_url} className='w-[50px] rounded-full' alt="" />
                                              </td>
                                              <td className="px-4 py-3">{service.name}</td>
                                              <td className="px-4 py-3">{service.price}</td>
                                              <td className="px-4 py-3">{service.duration}</td>
                                              <td className="px-4 py-3">{service.shop_id}</td>
                                              <td className="px-4 py-3" onClick={() => handleRowClick(service)}><FaRegEye /></td>
                                          </tr>
                                      ))
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              {selectedService && (
                  <Modal onClose={() => setSelectedService(null)}>
                      <div className="p-4">
                          <h2 className="text-xl font-semibold mb-4">Shop Details</h2>
                          <div className="mb-4">
                              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Name <span className="text-gray-600 font-light text-[14px]">{selectedService.name}</span></p>
                              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Price <span className="text-gray-600 font-light text-[14px]">{selectedService.price}</span></p>
                              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Duration (minutes) <span className="text-gray-600 font-light text-[14px]">{selectedService.duration}</span></p>
                              <a href={`/stores/${selectedService.shop_id}/view`} className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Store<span className="text-gray-600 font-light text-[14px]">{selectedService.shop_id}</span></a>
                              <p className="text-center text-gray-600 text-[14px] font-light mb-2.5">{selectedService.description}</p>
                              <button
                                  className="bg-gray-200 text-gray-700 px-6 py-1 rounded"
                                  onClick={() => setSelectedService(null)}
                              >
                                  Close
                              </button>
                              
                          </div>
                      </div>
                  </Modal>
              )}
        </div>
      </AdminLayout>
  )
}

export default Services