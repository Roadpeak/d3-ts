import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface Category {
  name: string;
  image_url: string;
}

const CategorySlider: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = localStorage.getItem('cachedCategories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }

        const response = await axios.get<Category[]>('https://api.discoun3ree.com/api/categories/random');
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

  const CustomNextArrow = (props: any) => (
    <button {...props} className="slick-arrow next bg-opacity-50 text-primary p-4 rounded-full shadow-md absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
      <FaChevronRight />
    </button>
  );

  const CustomPrevArrow = (props: any) => (
    <button {...props} className="slick-arrow prev bg-opacity-50 text-primary p-4 rounded-full shadow-md absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-20 focus:outline-none">
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
    slidesToShow: getSlidesToShow(),
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className='bg-gray-100'>      
      <Slider {...settings}>
        {categories.map((category, index) => (
          <a href={`/search?query=${category.name.toLowerCase()}`} key={index} className='w-full md:w-1/6 px-2'>
              <div className='cursor-pointer relative'>
                <div className='image-container'>
                  <img src={category.image_url} alt={category.name} className='w-[90%] h-fit m-auto rounded-md mt-3 object-cover' />
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-2 text-center font-medium w-fit mx-auto text-[15px] text-white'>
                  <span className="bg-black bg-opacity-50 px-3 py-1 rounded-md">{category.name}</span>
                </div>
              </div>
            </a>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
