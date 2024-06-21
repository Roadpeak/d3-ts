import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa';

const CategorySlider: React.FC = () => {
  const categories = [
    { name: 'Cleaning', image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5pbmd8ZW58MHwwfDB8fHww' },
    { name: 'Photography', image_url: 'https://images.unsplash.com/photo-1522108098940-de49801b5b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXR5fGVufDB8MHwwfHx8MA%3D%3D' },
    { name: 'Beauty', image_url: 'https://images.unsplash.com/photo-1522108098940-de49801b5b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXR5fGVufDB8MHwwfHx8MA%3D%3D' },
    { name: 'Spa', image_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BhfGVufDB8MHwwfHx8MA%3D%3D' },
    { name: 'Hair and Salon', image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsb258ZW58MHwwfDB8fHww' },
    { name: 'Events', image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnRzfGVufDB8MHwwfHx8MA%3D%3D' },
  ];

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

  return (
    <div className='bg-gray-100'>      
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className='w-full md:w-1/6 px-2'>
              <div className='cursor-pointer relative'>
                <div className='image-container'>
                  <img src={category.image_url} alt={category.name} className='w-[90%] h-fit m-auto rounded-md mt-3 object-cover' />
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-2 text-center font-medium w-fit mx-auto text-[15px] text-white'>
                  <span className="bg-black bg-opacity-50 px-3 py-1 rounded-md">{category.name}</span>
                </div>
              </div>
            </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
