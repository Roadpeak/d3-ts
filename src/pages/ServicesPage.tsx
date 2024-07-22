import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Category, Service } from '../types';
import axios from 'axios';
import { fetchServices } from '../services/apiService';
import Calendar from '../components/Calendar';

const ServicesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = localStorage.getItem('cachedCategories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }

        const response = await axios.get<Category[]>('https://api.discoun3ree.com/api/random-categories');
        setCategories(response.data);
        localStorage.setItem('cachedCategories', JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();

    const interval = setInterval(fetchCategories, 180000);

    return () => clearInterval(interval);
  }, []);

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
    <div>
      <Navbar />
      <div className="flex flex-col w-full py-6 px-[5%]">
        <div className="flex flex-col my-6 h-full w-full">
          <p className="text-black font-semibold text-[20px]">Top picks for you</p>
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-7 bg-gray-50 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category, index) => (
              <a href={`/search?query=${category.name.toLowerCase()}`} key={index} className='w-full'>
                <div className='cursor-pointer flex items-center justify-center flex-col bg-gray-50 p-4 rounded-md'>
                  <div className='image-container bg-gray-50'>
                    <img src={category.image_url || placeholderImage} alt={category.name} className='w-full h-fit m-auto rounded-md mt-3 object-cover' />
                  </div>
                  <span className="text-black mx-auto w-full text-center text-[14px] text-gray-600 font-light mt-2">{category.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-black font-semibold text-[20px] mb-2">Top selling services</p>
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
      </div>
      <Footer />
    </div>
  )
}

export default ServicesPage;
