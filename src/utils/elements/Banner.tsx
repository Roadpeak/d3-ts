import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';

const Banner: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const banners = [banner1, banner2, banner3, banner4];

  useEffect(() => {
    localStorage.setItem('bannerUrls', JSON.stringify(banners));
  }, [banners]);

  return (
    <div className='w-full'>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-fit md:w-full h-auto md:h-[400px]">
            <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
