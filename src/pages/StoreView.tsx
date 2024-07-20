import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/context/AuthContext';
import ReviewComponent from '../components/ReviewComponent';
import { followShop, getShopById, getShopFollowers, initializeConversation, unfollowShop } from '../services/apiService';
import { CiLocationOn } from 'react-icons/ci';
import { LuUsers2 } from 'react-icons/lu';
import { MdOutlineLightMode, MdOutlineLocalPhone } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTwitter,
  faLinkedin,
  faPinterest,
  faTiktok,
  faSnapchat,
  faReddit,
  faGithub,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import SendMessageModal from '../utils/elements/SendMessageModal';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { Discount, Follower, Service, SocialLink, Store } from '../types';
import Calendar from '../components/Calendar';

const getIcon = (url: string): IconDefinition | null => {
  if (url.includes('instagram.com')) return faInstagram;
  if (url.includes('facebook.com')) return faFacebook;
  if (url.includes('youtube.com')) return faYoutube;
  if (url.includes('twitter.com')) return faTwitter;
  if (url.includes('linkedin.com')) return faLinkedin;
  if (url.includes('pinterest.com')) return faPinterest;
  if (url.includes('tiktok.com')) return faTiktok;
  if (url.includes('snapchat.com')) return faSnapchat;
  if (url.includes('reddit.com')) return faReddit;
  if (url.includes('github.com')) return faGithub;
  return null;
};

const StoreView: React.FC = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [open, setOpen] = useState(false);
  const [des, setDes] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [view, setView] = useState<'offers' | 'services'>('offers');

  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const maxLength = 52;
  const shopId = id ? parseInt(id, 10) : 0;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';


  const fetchSocialLinks = async () => {
    try {
      const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/social-links`);
      const parsedLinks = JSON.parse(response.data.social_links || '[]');

      const formattedLinks: SocialLink[] = parsedLinks.map((url: string, index: number) => ({
        id: index + 1,
        url,
      }));

      setSocialLinks(formattedLinks);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, [id])

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await getShopById(shopId);
        setStore(storeData);
      } catch (error) {
        console.error('Error fetching store:', error);
      } finally {

      }
    };

    fetchStore();
  }, [id]);

  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true);
      try {
        const data = await getShopFollowers(shopId);
        setFollowers(data);
        const isCurrentUserFollowing = data.some((follower: Follower) => follower.phone === user?.phone);
        setIsFollowing(isCurrentUserFollowing);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchFollowers();
    }
  }, [shopId, user]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await followShop(shopId);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following shop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      await unfollowShop(shopId);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing shop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/discounts`);
        setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        setLoading(false);
      }
    };

    fetchDiscountsByShop();
  }, [id]);

  useEffect(() => {
    const fetchServicesByShop = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesByShop();
  }, [id]);

  const openCalendar = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setShowCalendar(true);
  };

  return (
    <div className='w-full h-full scroll-smooth flex bg-gray-100 flex-col'>
      <Navbar />
      <div className="flex flex-col bg-gray-100">
        <div className="flex flex-col w-full px-[5%] py-[2%] text-black gap-[2%]">
          <div className="w-full flex bg-gray-200 h-auto justify-between p-2 rounded-md">
            <div className="flex h-full items-center gap-4">
              <img
                src={store?.image_url || placeholderImage}
                alt="Store logo"
                className="w-[100px] rounded-full h-full justify-center mx-auto flex items-center"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-center text-[20px] font-medium">
                  {store?.name}
                </p>
                <p className="lowercase text-[14px] flex items-center gap-2 text-gray-600"><CiLocationOn /> {store?.location}</p>
                <p className="lowercase text-[14px] flex items-center gap-2 text-gray-600 cursor-pointer" onClick={() => setOpen(!open)}><LuUsers2 /> {followers?.length} followers</p>
                <a href={`tel:${store?.seller_phone}`} className="lowercase text-[14px] flex items-center gap-2 text-gray-600"><MdOutlineLocalPhone /> {store?.seller_phone}</a>
                <button onClick={openModal} className="lowercase text-[14px] flex items-center gap-2 text-gray-600"><IoChatboxEllipsesOutline />Chat </button>
                {store?.description !== null && (
                  <button onClick={() => setDes(!des)} className="lowercase text-[14px] flex items-center gap-2 text-gray-600">
                    <MdOutlineLightMode />
                    about store
                  </button>
                )}
                {socialLinks.length === 0 ? (
                  ''
                ) : (
                  <div className='flex items-center gap-1'>
                    {socialLinks.map(link => (
                      <div key={link.id} className="flex flex-col rounded-md ">
                        <div className='flex flex-col'>
                          <a href={link.url} target='_blank' className="border-b border-gray-200">
                            {getIcon(link.url) && (
                              <FontAwesomeIcon icon={getIcon(link.url) as IconDefinition} className="mr-1" />
                            )}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className='flex md:hidden mt-1'>
                  {isFollowing ? (
                    <button onClick={handleUnfollow} className="bg-red-500 px-4 py-1.5 text-white rounded-md">
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollow} className="bg-primary px-4 py-1.5 text-white rounded-md">
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <button onClick={openModal} className="hidden md:flex items-center gap-1 text-gray-600 text-[15px]">Chat <IoChatboxEllipsesOutline /></button>
              <SendMessageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                sellerId={store?.seller_id ?? null}
              />
              <span className="hidden md:block">|</span>
              <div className='hidden md:flex'>
                {isFollowing ? (
                  <button onClick={handleUnfollow} className="bg-red-500 px-4 py-1.5 text-white rounded-md">
                    Unfollow
                  </button>
                ) : (
                  <button onClick={handleFollow} className="bg-primary px-4 py-1.5 text-white rounded-md">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-4 rounded-md">
            <div className="flex items-center gap-4 border-b border-gray-300 mb-4 gap-4">
              <button
                onClick={() => setView('offers')}
                className={`${view === 'offers' ? 'border-b-[2px] border-primary text-primary font-medium' : 'text-gray-600'}`}
              >
                Offers
              </button>
              <button
                onClick={() => setView('services')}
                className={`${view === 'services' ? 'border-b-[2px] border-primary text-primary font-medium' : 'text-gray-600'}`}
              >
                Services
              </button>
            </div>
            {view === 'offers' ? (
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:grid-col-5">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  discounts.length > 0 ? (
                    discounts.map(discount => (
                      <a href={`/discount/${discount.slug}/${discount.id}/see-details`} key={discount.id} className="hover:shadow-md bg-white flex flex-col justify-between rounded-md p-4">
                        <img src={discount.image_url || placeholderImage} alt={discount.name} className="w-full object-cover rounded-md" />
                        <div className="flex flex-col">
                          <p className="text-[17px] font-medium truncate-2-lines">{discount.name}</p>
                          <p className="text-[14px] text-gray-500 mt-1">
                            {discount.description?.length > maxLength
                              ? `${discount.description.substring(0, maxLength)}...`
                              : discount.description}
                          </p>
                          <div className="flex items-center">
                            <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initial_price}`}</p>
                            <p className="text-primary font-medium text-[14px] ml-2">
                              Ksh. {discount.price_after_discount}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p>No offers available.</p>
                  )
                )}
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 lg:grid-col-5">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  services.length > 0 ? (
                    services.map(service => (
                      <div key={service.id} className="bg-white p-4 rounded-md">
                        {/* <h2 className="text-xl font-medium">{service.name}</h2> */}
                        <img src={service.image_url} alt={service.name} className="w-full h-auto rounded-md" />
                        <p className="mt-2 mb-1 text-gray-700 font-medium text-[18px]">{service.name}</p>
                        <p className="mt-2 text-gray-600 font-light text-[14px]">{service.description}</p>
                        <p className="text-gray-900 text-[14px] mb-1 ">Kes <span className="font-medium">{service.price}</span></p>
                        <div className="flex w-full items-center gap-2 ">
                          <button className="w-full border border-primary px-4 py-1.5 text-primary text-[14px] rounded-md">Details</button>
                          <button
                            onClick={() => openCalendar(Number(service.id))}
                            className="w-full bg-primary px-4 py-1.5 text-white text-[14px] rounded-md"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No services available.</p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="px-[5%] flex w-full gap-[2%] pb-4 flex-col md:flex-row ">
          <ReviewComponent reviewableType="shop" reviewableId={shopId} />
        </div>
      </div>
      <Footer />
      {des && (
        <div className="absolute h-full top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[80%] md:w-1/3 max-h-[90vh] overflow-y-auto rounded-lg relative">
            <button
              onClick={() => setDes(false)}
              className="absolute top-4 right-4 text-gray-600 rounded-full p-1 hover:text-gray-800"
            >
              <IoMdClose />
            </button>
            <p className="border-b mb-3 text-gray-700 font-medium pb-1 border-gray-200 ">More info about {store?.name}</p>
            <p className="text-gray-600 font-light text-[14px]">{store?.description}</p>
          </div>
        </div>
      )}
      {open && (
        <div className="absolute h-full top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[80%] md:w-1/3 max-h-[90vh] overflow-y-auto rounded-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-600 border rounded-full p-1 border-gray-400 hover:text-gray-800"
            >
              <IoMdClose />
            </button>
            <p className="border-b font-medium text-gray-600 text-[16px]">Followers</p>
            {followers.length > 0 ? (
              followers.map((follower) => (
                <div key={follower.follower_id} className="py-1">
                  <p className='text-[14px] font-light text-gray-600'>{`${follower.first_name} ${follower.last_name}`}</p>
                </div>
              ))
            ) : (
              <div>No Followers at this time.</div>
            )}
          </div>
        </div>
      )}
      {showCalendar && selectedServiceId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Calendar serviceId={selectedServiceId} shopId={shopId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreView;
