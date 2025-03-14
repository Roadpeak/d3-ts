import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchDiscounts, fetchRandomDiscounts } from '../services/discountService';
import { Category, Discount } from '../types';
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa';
import CategorySlider from '../utils/elements/CategorySlider';
import Banner from '../utils/elements/Banner';
import axios from 'axios';

const Hero: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const data = await fetchRandomDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscountData();
  }, []);

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
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CustomNextArrow = (props: any) => (
    <button {...props} className="slick-arrow next bg-opacity-70 bg-white text-primary p-4 rounded-full shadow-md absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
      <FaChevronRight size={20} />
    </button>
  );

  const CustomPrevArrow = (props: any) => (
    <button {...props} className="slick-arrow prev bg-opacity-70 bg-white text-primary p-4 rounded-full shadow-md absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
      <FaAngleLeft size={20} />
    </button>
  );

  const getSlidesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 5;
    } else if (screenWidth >= 1024) {
      return 4;
    } else if (screenWidth >= 768) {
      return 3;
    } else if (screenWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const renderDiscounts = () => {
    if (discounts.length === 0) {
      return <p className='text-center text-gray-600'>No discounts available at the moment.</p>;
    }

    if (discounts.length <= slidesToShow) {
      return (
        <div className="flex flex-wrap justify-center">
          {discounts.map((discount, index) => (
            <a href={`/discount/${discount?.slug}/${discount?.id}/see-details`} key={index} className='w-full md:w-1/5 px-2 mb-4 relative'>
              <div className="absolute top-4 right-4 rounded-full bg-[#FF9021] text-white text-[14px] font-light w-10 h-10 flex items-center justify-center">
                -{Math.floor(discount.percentage_discount)}%
              </div>
              <div className='max-w-sm rounded overflow-hidden bg-white'>
                <img src={discount.image_url || placeholderImage} alt={discount.name} className='w-full p-2 object-cover' />
                <div className='text-[14px] font-medium p-2 truncate-2-lines'>{discount.name}</div>
                <div className='flex flex-col gap-2 justify-between w-full p-2'>
                  <span className='text-[13px] text-gray-600 font-light'>
                    in {discount.category}
                  </span>
                  <span className='text-primary font-medium text-[16px]'>
                    ksh. {discount.price_after_discount}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      );
    }

    return (
      <Slider {...settings}>
        {discounts.slice(0, 10).map((discount, index) => (
          <a href={`/discount/${discount.slug}/${discount.id}/see-details`} key={index} className='w-full h-full justify-between md:w-1/5 px-2 relative'>
            <div className="absolute top-4 right-6 rounded-full bg-[#FF9021] text-white text-[14px] font-light w-10 h-10 flex items-center justify-center">
              -{Math.floor(discount.percentage_discount)}%
            </div>
            <div className='max-w-sm rounded overflow-hidden bg-white'>
              <img src={discount.image_url || placeholderImage} alt={discount.name} className='w-full p-2 object-cover' />
              <div className='text-[14px] font-medium text-black p-2 truncate-2-lines'>{discount.name}</div>
              <div className='flex flex-col gap-2 justify-between w-full p-2'>
                <span className='text-[13px] text-gray-600 font-light'>
                  in {discount.category}
                </span>
                <span className='text-primary font-medium text-[15px]'>
                  ksh. {discount.price_after_discount}
                </span>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    );
  };

  return (
    <div className='py-4 px-[5%] bg-gray-100'>
      <p className='text-black font-semibold mt-4 mb-2 text-[20px]'>Featured | {getCurrentMonthAndYear()}</p>
      <div className="border border-gray-200 rounded-md p-2">
        {renderDiscounts()}
      </div>
      <div className="flex mt-3 flex-col">
        <p className='text-black font-semibold text-[20px]'>Trending searches</p>
        <div className='w-full bg-gray-100 gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
            {categories.map((category, index) => (
              <a href={`/search?query=${category.name.toLowerCase()}`} key={index} className='w-full mb-2 h-full'>
                <div className='cursor-pointer flex items-center justify-center flex-col bg-gray-50 p-4 rounded-md'>
                  <div className='image-container bg-gray-50'>
                    <img src={category.image_url || placeholderImage} alt={category.name} className='w-full h-fit m-auto rounded-md mt-3 object-cover' />
                  </div>
                  <span className="mx-auto w-full text-center text-[13px] text-black truncate mt-2">{category.name}</span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
