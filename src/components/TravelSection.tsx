import React from 'react'
import banner from '../assets/banner.jpg'

const TravelSection:React.FC = () => {
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
      <div className="flex w-full py-6 px-[5%] h-auto">
        <img src={banner} className='rounded-lg' alt="" />
      </div>
    </div>
  )
}

export default TravelSection
