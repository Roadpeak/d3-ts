import React, { useEffect, useState } from 'react'
import banner from '../assets/4.jpg'
import { fetchServices } from '../services/apiService';
import { Service } from '../types';
import Calendar from './Calendar';

const TravelSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';

  useEffect(() => {
    const fetchServicesByShop = async () => {
      setLoading(true);
      try {
        const services = await fetchServices();
        setServices(services);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesByShop();
  }, []);

  const openCalendar = (service: Service) => {
    setSelectedServiceId(Number(service.id));
    setStoreId(service.shop_id);
    setShowCalendar(true);
  };

  return (
    <div className="">
      <div className='bg-primary w-full flex flex-col px-[5%] py-[2%]'>
        <p className="text-white font-semibold text-[24px]">
          Travel with us!
        </p>
        <p className="text-white text-[20px] font-medium">
          Wanna book a hotel?
        </p>
      </div>
      <div className="flex flex-col px-[5%] mt-6">
        <p className="text-black font-semibold text-[20px] mb-2">Featured services</p>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 lg:grid-col-5">
          {
            loading ?
              <p className="">Loading...</p>
              : (
                services.length > 0 ? (
                  services.map(service => (
                    <div key={service.id} className="bg-white p-4 rounded-md">
                      <img src={service.image_url} alt={service.name} className="w-full h-auto rounded-md" />
                      <p className="mt-2 mb-1 text-gray-700 font-medium text-[18px]">{service.name}</p>
                      <p className="mt-2 text-gray-600 font-light text-[14px] truncate-2-lines">{service.description}</p>
                      <p className="text-gray-900 text-[14px] mb-1 mt-2">Kes <span className="font-medium">{service.price}</span></p>
                      <div className="flex w-full items-center gap-2 ">
                        <a href={`/services/${service.slug}/${service.id}/see-details`} className="flex text-center items-center justify-center w-full border border-primary px-4 py-1.5 text-primary text-[14px] rounded-md">Details</a>
                        <button
                          onClick={() => openCalendar(service)}
                          className="w-full bg-primary px-4 py-1.5 text-white text-[14px] rounded-md"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No services available.</p>
                )
              )
          }
        </div>
      </div>
      {showCalendar && selectedServiceId !== null && storeId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md max-h-[90vh] overflow-y-auto w-full relative">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Calendar serviceId={selectedServiceId} shopId={storeId} />
          </div>
        </div>
      )}
      <div className="flex w-full py-6 px-[5%] h-auto">
        <img src={banner} className='rounded-lg' alt="" />
      </div>
    </div>
  )
}

export default TravelSection
