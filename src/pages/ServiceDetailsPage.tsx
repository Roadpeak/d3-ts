import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaAngleLeft, FaFacebookF, FaInstagram, FaLink, FaRegHeart, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { Service } from '../types'
import axios from 'axios'
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share'
import { MdContentCopy } from 'react-icons/md'
import Calendar from '../components/Calendar'

const ServiceDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';


    useEffect(() => {
        const fetchService = async () => {
            setLoading(true)
            try {
                const response = await axios.get<Service>(`https://api.discoun3ree.com/api/services/${id}`);
                setService(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('An error occurred while fetching service data.');
            }
        };

        fetchService();
    }, [id]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                console.log("Copied!")
            })
            .catch((error) => {
                console.error('Failed to copy link: ', error);
            });
    };


    return (
        <div>
            <Navbar />
            <div className="flex px-[5%] flex-col py-[2%]">
                <div className="flex w-full flex-col gap-2 items-start ">
                    <button onClick={() => navigate(-1)} className="flex text-gray-600 font-light text-[15px] items-center gap-2">
                        <FaAngleLeft />
                        <span>Go back</span>
                    </button>
                    <div className="w-full flex flex-col md:flex-row gap-[2%]">
                        <div className="flex flex-col w-full gap-[2%] md:w-2/3">
                            {
                                loading ? (
                                    <div className="border rounded-md p-4 flex flex-col md:flex-row w-full">
                                        <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full md:w-1/2">
                                            <div className="px-[5%] w-full md:w-2/3 mt-4 md:mt-0">
                                                <div className="bg-gray-300 h-64 rounded-md animate-pulse"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full md:w-1/2 space-y-4">
                                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                                            <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>
                                            <div className="flex flex-col space-y-2">
                                                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="flex border rounded-md border-gray-300 px-2 py-1.5 w-fit items-center gap-2">
                                                    <div className="h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                                    <div className="h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="h-12 w-12 bg-gray-100 rounded-full items-end flex gap-1 animate-pulse">
                                                        <div className="h-6 bg-blue-500 rounded-full"></div>
                                                        <div className="h-6 bg-gray-400 rounded-full"></div>
                                                    </div>
                                                    <div className="h-12 w-12 bg-gray-100 rounded-full items-end flex gap-1 animate-pulse">
                                                        <div className="h-6 bg-green-500 rounded-full"></div>
                                                        <div className="h-6 bg-gray-400 rounded-full"></div>
                                                    </div>
                                                    <div className="h-12 w-12 bg-gray-100 rounded-full items-end flex gap-1 animate-pulse">
                                                        <div className="h-6 bg-rose-200 rounded-full"></div>
                                                        <div className="h-6 bg-gray-400 rounded-full"></div>
                                                    </div>
                                                    <div className="h-12 w-12 bg-gray-100 rounded-full items-end flex gap-1 animate-pulse">
                                                        <div className="h-6 bg-gray-200 rounded-full"></div>
                                                        <div className="h-6 bg-gray-400 rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border p-4 flex flex-col md:flex-row w-full">
                                        <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full md:w-1/2">
                                            <div className="w-full md:w-2/3 mt-4 md:mt-0">
                                                <img className="rounded-md" alt="image" src={service?.image_url || placeholderImage} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full md:w-1/2">
                                            <p className="text-gray-400 font-light text-[11px]">{service?.category}</p>
                                            <p className="font-medium text-[20px] ">{service?.name}</p>
                                            <p className="font-medium text-primary text-[18px]">Ksh {service?.price}</p>
                                            <button onClick={() => setOpen(true)} className="w-full py-2 bg-primary rounded-md text-white capitalize text-[14px] flex items-center justify-center mb-2">Reserve</button>
                                            <div className="flex flex-col my-3.5">
                                                <span className="text-[15px]">Save this for later</span>
                                                <button className="flex border rounded-md border-gray-300 px-2 py-1.5 w-fit items-center gap-2">
                                                    <FaRegHeart />
                                                    Favorite
                                                </button>
                                            </div>
                                            <div className="flex flex-col mb-2">
                                                <p className="text-[16px] font-light">Share with friends and family</p>
                                                <div className="flex flex-wrap items-center w-fit gap-4">
                                                    <FacebookShareButton url={window.location.href} className="flex items-center">
                                                        <div className="bg-gray-100 rounded-md p-1 items-end flex gap-1">
                                                            <FaFacebookF size={24} className="bg-blue-500 text-white p-1" />
                                                            <span className="text-gray-600 text-[14px] font-light">share</span>
                                                        </div>
                                                    </FacebookShareButton>
                                                    <WhatsappShareButton url={window.location.href} className="flex items-center">
                                                        <div className="bg-gray-100 p-1 rounded-md items-end flex gap-1">
                                                            <FaWhatsapp size={24} className="bg-green-500 text-white p-1" />
                                                            <span className="text-gray-600 text-[14px] font-light">share</span>
                                                        </div>
                                                    </WhatsappShareButton>
                                                    <InstapaperShareButton url={window.location.href} className="flex items-center">
                                                        <div className="bg-gray-100 p-1 rounded-md items-end flex gap-1">
                                                            <FaInstagram size={24} className="bg-rose-200 text-black p-1" />
                                                            <span className="text-gray-600 text-[14px] font-light">share</span>
                                                        </div>
                                                    </InstapaperShareButton>
                                                    <TwitterShareButton url={window.location.href} className="flex items-center">
                                                        <div className="bg-gray-100 p-1 rounded-md items-end rounded-md flex gap-1">
                                                            <FaTwitter size={24} className="bg-gray-200 text-black p-1" />
                                                            <span className="text-gray-600 text-[14px] font-light">share</span>
                                                        </div>
                                                    </TwitterShareButton>
                                                    <button onClick={handleCopyLink} className="p-1 flex items-center gap-1 text-gray-600 text-[14px]">
                                                        <MdContentCopy className="text-[17px] text-gray-500" /> Copy Link
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full md:w-1/3">
                            <div className="flex gap-6 w-full items-center border-b border-gray-200 mb-2">
                                <p
                                    className='font-medium text-[18px] cursor-pointer'
                                >
                                    Description
                                </p>
                                <a href={`/stores/${service?.shop_id}/view`} className="text-primary font-nromal text-[14px] flex items-center gap-1">View Store <FaLink /></a>
                            </div>
                            <p className="text-[14px] font-light text-[14px] text-gray-600">
                                {service?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <Calendar serviceId={Number(service?.id)} shopId={Number(service?.shop_id)} />
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    )
}

export default ServiceDetailsPage