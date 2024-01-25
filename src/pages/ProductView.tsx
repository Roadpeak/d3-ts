import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaAngleLeft, FaCartArrowDown, FaFacebookF, FaInstagram, FaLock, FaRegHeart, FaWhatsapp } from 'react-icons/fa'
import { FaArrowsRotate, FaXTwitter } from 'react-icons/fa6'
import { MdOutlineVerified } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const ProductView: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
                <div className="flex px-[5%] flex-col py-[2%]">
                    <div className="flex flex-col gap-2 items-start ">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2">
                        <FaAngleLeft />
                        <span>Go back</span>
                    </button>
                    <div className="w-full flex gap-[2%]">
                                <div className="flex flex-col w-full gap-[2%] md:w-2/3">
                                    <div className="border p-4 flex flex-col md:flex-row w-full">
                                        <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full md:w-1/2">
                                            <div className="px-[5%] w-full md:w-2/3 mt-4 md:mt-0">
                                                <img 
                                                    alt='image'
                                                    src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3BwaW5nfGVufDB8fDB8fHww" 
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full md:w-1/2">
                                            <p className="text-gray-400 font-light text-[11px]">Category</p>
                                            <p className="font-medium text-[24px] ">Soul soothing massage</p>
                                            <span className="text-primary font-medium text-[17px]">
                                                34% OFF
                                            </span>
                                            <div className="flex items-center gap-2 ">
                                                <span className='font-light text-gray-600 '>was</span>
                                                <p className="text-[17px] line-through">
                                                    Ksh {(4900).toLocaleString('KES')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className='font-light text-gray-600'>now</span>
                                                <p className="font-semibold text-[24px]">
                                                    Ksh {(4300).toLocaleString('KES')}
                                                </p>
                                            </div>
                                            <button onClick={() => navigate('/checkout')} className="w-full py-2 bg-primary rounded-md text-white font-medium capitalize text-[17px] flex items-center justify-center mb-2">
                                                Get this discount
                                            </button>
                                            <div className="flex flex-col my-3.5">
                                                <span className="font-medium text-[16px]">
                                                    Save this product for later
                                                </span>
                                                <button className='flex border border-gray-300 px-2 py-1.5 w-fit items-center gap-2'>
                                                    <FaRegHeart />
                                                    Favorite
                                                </button>
                                            </div>
                                            <div className="flex flex-col mb-2">
                                                <p className="text-[16px] font-light">
                                                    Share with friends and family
                                                </p>
                                                <div className="flex flex-wrap items-center w-fit gap-4">
                                                    <div className="bg-gray-100 p-1 items-end flex gap-1">
                                                        <FaFacebookF size={24} className='bg-blue-500 text-white p-1' />
                                                        <span className="text-gray-400 font-light">
                                                            share
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-100 p-1 items-end flex gap-1">
                                                        <FaWhatsapp size={24} className='bg-green-500 text-white p-1' />
                                                        <span className="text-gray-400 font-light">
                                                            share
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-100 p-1 items-end flex gap-1">
                                                        <FaInstagram size={24} className='bg-rose-200 text-black p-1' />
                                                        <span className="text-gray-400 font-light">
                                                            share
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-100 p-1 items-end flex gap-1">
                                                        <FaXTwitter size={24} className='bg-gray-200 text-black p-1' />
                                                        <span className="text-gray-400 font-light">
                                                            share
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full mt-[2%] p-[2%] bg-gray-100">
                                        <p className="font-medium border-b text-[18px]">
                                            Details
                                        </p>
                                        <div className="">
                                            <p className="">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quisquam amet optio officiis similique est sunt quod eum tenetur assumenda, officia aliquam! Modi omnis debitis labore eveniet, aliquam recusandae obcaecati!
                                            </p>
                                            <p className="">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quam! Eum autem porro facere, nisi nostrum necessitatibus aliquid quo illum aut veniam sed consectetur quisquam optio numquam ea voluptatum nihil!
                                            </p>
                                            <p className="">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum enim nam deserunt totam porro sed quas modi eos vero laboriosam! Placeat officiis excepturi incidunt possimus praesentium minus explicabo dolorem consequatur?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <Footer />
    </div>
  )
}

export default ProductView
