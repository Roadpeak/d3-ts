// src/components/Hero.tsx
import React, { useEffect, useState } from 'react';
import { fetchDiscounts } from '../services/discountService';
import { Discount } from '../types';

const Hero: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerPage = 5;
  const totalSlides = discounts.length;

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const data = await fetchDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscountData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Featured Discounts</h1>
      <div className='relative overflow-hidden'>
        <div className='flex w-full transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)` }}>
          {discounts.concat(discounts).map((discount, index) => (
            <div key={index} className='w-full md:w-1/5 px-2'>
              <div className='max-w-sm rounded overflow-hidden shadow-lg'>
                <img src={discount.image_url} alt={discount.name} className='w-full h-64 object-cover' />
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2'>{discount.name}</div>
                  <p className='text-gray-700 text-base'>{discount.description}</p>
                </div>
                <div className='px-6 pt-4 pb-2'>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                    Category: {discount.category}
                  </span>
                </div>
                <div className='px-6 pt-4 pb-2'>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                    Price after discount: ${discount.price_after_discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md' onClick={prevSlide}>
          &#10094;
        </button>
        <button className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md' onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Hero;
