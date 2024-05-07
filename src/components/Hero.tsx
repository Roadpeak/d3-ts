import React from 'react'
import banner2 from '../assets/banner2 (1).jpg'
import banner3 from '../assets/discount.jpg'
import banner1 from '../assets/banner1.jpg'

const Hero:React.FC = () => {
  return (
    <div className='flex w-full h-full gap-[2%] px-[5%] py-[2%] '>
      <div className="w-full h-full flex">
        <div className="w-full md:w-[70%]">
          <img src={banner1} className='h-full rounded-md' alt="" />
        </div>
        <div className="hidden md:flex w-[30%] flex-col gap-[2%]">
          <img className='h-ful] mb-2 rounded-md' src={banner3} alt="banner" />
          {/* <img className='h-[190px] rounded-md' src={banner2} alt="banner" /> */}
        </div>
      </div>
    </div>
  )
}

export default Hero
