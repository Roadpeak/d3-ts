import React from 'react'
import hero from '../assets/one.webp'
import one from '../assets/two.webp'
import two from '../assets/three.webp'

const Hero = () => {
  return (
    <div className='flex w-full h-full gap-[2%] px-[5%] py-[2%] '>
     <div className="w-full h-full flex gap-[2%]">
         <div className="w-[70%]">
            <img src={hero} className='h-full rounded-md' alt="" />
         </div>
         <div className="flex w-[30%] flex-col gap-[2%]">
            <img className='h-[200px] rounded-md' src={two} alt="banner" />
            <img className='h-[200px] rounded-md' src={one} alt="banner" />
         </div>
     </div>
    </div>
  )
}

export default Hero
