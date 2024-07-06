import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchDiscounts } from '../services/discountService';
import { Discount } from '../types';
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa';
import CategorySlider from '../utils/elements/CategorySlider';
import Banner from '../utils/elements/Banner';

const Hero: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [slidesToShow, setSlidesToShow] = useState(1);

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

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CustomNextArrow = (props: any) => (
    <button {...props} className="slick-arrow next bg-white bg-opacity-50 text-primary p-4 rounded-full shadow-md absolute right-0 top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
      <FaChevronRight />
    </button>
  );

  const CustomPrevArrow = (props: any) => (
    <button {...props} className="slick-arrow prev bg-white bg-opacity-50 text-primary p-4 rounded-full shadow-md absolute left-0 top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
      <FaAngleLeft />
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
          {discounts.slice(0, 10).map((discount, index) => (
            <a href={`/discount/${discount.id}/see-details`} key={index} className='w-full md:w-1/5 px-2 mb-4'>
              <div className='max-w-sm rounded overflow-hidden bg-white'>
                <img src={discount.image_url} alt={discount.name} className='w-full p-2 object-cover' />
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
          <a href={`/discount/${discount.id}/see-details`} key={index} className='w-full h-full justify-between md:w-1/5 px-2'>
            <div className='max-w-sm rounded overflow-hidden bg-white'>
              <img src={discount.image_url} alt={discount.name} className='w-fit p-2 object-cover' />
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
      </Slider>
    );
  };

  return (
    <div className='py-4 px-[5%] bg-gray-100'>
      <Banner />
      <p className='text-black font-semibold mt-4 mb-2 text-[20px]'>Featured Discounts | {getCurrentMonthAndYear()}</p>
      <div className="border border-gray-200 rounded-md p-2">
        {renderDiscounts()}
      </div>
      <div className="flex mt-3 flex-col">
        <p className='text-black mb-2 font-semibold text-[20px]'>Top Categories</p>
        <CategorySlider />
      </div>
    </div>
  );
};

export default Hero;
