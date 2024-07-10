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
import { MdOutlineLocalPhone } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import SendMessageModal from '../utils/elements/SendMessageModal';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

interface Store {
  id: number;
  name: string;
  location: string;
  image_url: string;
  verified: number;
  seller_id: number;
  created_at: string;
  updated_at: string;
  seller_phone: string;
  store_type: string | null;
}

interface Discount {
  id: string;
  name: string;
  initial_price: number;
  discount: number;
  expiryDate: string;
  category: string;
  store: Store;
  serviceTime: string;
  description: string;
  image_url: string;
  price_after_discount: number;
}

interface Follower {
  follower_id: number;
  shop_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user: any; 
}

const StoreView: React.FC = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
    const maxLength = 27;
  const shopId = id ? parseInt(id, 10) : 0;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='w-full h-full scroll-smooth flex bg-gray-100 flex-col'>
      <Navbar />
      <div className="flex flex-col bg-gray-100">
        <div className="flex flex-col w-full px-[5%] py-[2%] text-black gap-[2%]">
          <div className="w-full flex bg-gray-200 h-auto justify-between p-2 rounded-md">
            <div className="flex h-full items-center gap-4">
              <img
                src={store?.image_url}
                alt="Store logo"
                className="w-[100px] rounded-full h-full justify-center mx-auto flex items-center"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-center text-[20px] font-medium">
                  {store?.name} <span className="text-gray-600"></span>
                </p>
                <p className="lowercase text-[14px] flex items-center gap-2 text-gray-600"><CiLocationOn /> {store?.location}</p>
                <p className="lowercase text-[14px] flex items-center gap-2 text-gray-600 cursor-pointer" onClick={() => setOpen(!open)}><LuUsers2 /> {followers?.length} followers</p>
                <a href={`tel:${store?.seller_phone}`} className="lowercase text-[14px] flex items-center gap-2 text-gray-600"><MdOutlineLocalPhone /> {store?.seller_phone}</a>
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
              <button onClick={openModal} className="flex items-center gap-1 text-gray-600 text-[15px]">Chat <IoChatboxEllipsesOutline /></button>
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
            <div className="flex items-center w-full mb-2 justify-between">
              <p className="capitalize text-gray-600 text-[20px] font-medium">
                all
              </p>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className='border rounded-md px-2 outline-none focus:outline-none text-gray-500 py-1'
                placeholder='Search'
              />
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:grid-col-5">
              {discounts.map((discount) => (
                <a href={`/discount/${discount.id}/see-details`} key={discount.id} className="hover:shadow-md bg-white flex flex-col justify-between rounded-md p-4">
                  <img src={discount.image_url} alt={discount.name} className="w-full object-cover rounded-md" />
                  <div className="flex flex-col">
                    <p className="text-[17px] font-medium">{discount.name}</p>
                    <p className="text-[14px] text-gray-500">
                      {discount.description.length > maxLength ?
                        `${discount.description.substring(0, maxLength)}...` :
                        discount.description
                      }
                    </p>
                    <div className="flex items-center">
                      <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initial_price}`}</p>
                      <p className="text-primary font-medium text-[14px] ml-2">
                        Ksh. {discount.price_after_discount}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[5%] flex w-full gap-[2%] pb-4 flex-col md:flex-row ">
          <ReviewComponent reviewableType="shop" reviewableId={shopId} />
        </div>
      </div>
      <Footer />
      {open && (
        <div className="absolute h-full top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[80%] md:w-1/3 max-h-[90vh] overflow-y-auto rounded-lg relative">
            <button 
              onClick={() => setOpen(false)} 
              className="absolute top-4 right-4 text-gray-600 border rounded-full p-1 border-gray-400 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
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
    </div>
  );
};

export default StoreView;
