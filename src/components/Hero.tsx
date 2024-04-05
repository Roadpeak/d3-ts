import React from 'react'
import one from '../assets/two.webp'

const Hero:React.FC = () => {
  return (
    <div className='flex w-full h-full gap-[2%] px-[5%] py-[2%] '>
      <div className="w-full h-full flex gap-[2%]">
        <div className="w-full md:w-[70%]">
          <img src="https://fatcoupon.com/_next/image?url=https%3A%2F%2Fd3itvsmwj0r86k.cloudfront.net%2Fimages%2F1f0cc785-d79d-4232-93db-016072562ded.webp&w=1920&q=75" className='h-full rounded-md' alt="" />
        </div>
        <div className="hidden md:flex w-[30%] flex-col gap-[2%]">
          <img className='h-[190px] mb-2 rounded-md' src='https://fatcoupon.com/_next/image?url=https%3A%2F%2Fd3itvsmwj0r86k.cloudfront.net%2Fimages%2F2049fca0-0c31-427b-a4d5-da3c4fc86be3.png&w=1920&q=75' alt="banner" />
          <img className='h-[190px] rounded-md' src={one} alt="banner" />
        </div>
      </div>
    </div>
  )
}

export default Hero
