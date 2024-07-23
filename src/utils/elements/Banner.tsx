import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../assets/1.jpg';
import banner2 from '../../assets/2.jpg';
import banner3 from '../../assets/3.jpg';
import banner4 from '../../assets/4.jpg';
import banner5 from '../../assets/5.jpg';

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

  const banners = [banner1, banner2, banner3, banner4, banner5];

  useEffect(() => {
    localStorage.setItem('bannerUrls', JSON.stringify(banners));
  }, [banners]);

  return (
    <div className='w-full'>
      <div className="w-fit md:w-full h-auto md:h-[440px]">
        <img src={banner1} alt={`Banner`} className="w-full h-full rounded-md object-cover" />
      </div>
      {/* <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-fit md:w-full h-auto md:h-[440px]">
            <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full rounded-md object-cover" />
          </div>
        ))}
      </Slider> */}
    </div>
  );
}

export default Banner;
