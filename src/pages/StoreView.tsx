import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/context/AuthContext';
import { ClipLoader } from 'react-spinners';
import { CgWindows } from 'react-icons/cg';

interface Store {
  _id: string;
  name: string;
  owner: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  followers: string;
  imageUrl: string;
  location: string;
  storeType: string;
}

interface Discount {
  _id: string;
  name: string;
  initialPrice: number;
  discount: number;
  expiryDate: string;
  category: string;
  store: Store;
  serviceTime: string;
  description: string;
  imageUrl: string;
  priceAfterDiscount: number;
}

interface Review {
  _id: string;
  entityType: string;
  entityId: string;
  reviewerName: string;
  reviewDate: Date;
  reviewText: string;
}

interface Follower {
  _id: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  store: string;
}


const StoreView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<Follower[]>([])
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newReview, setNewReview] = useState<{ user: string; comment: string }>({
    user: '',
    comment: '',
  });

  const { user } = useAuth();
  const userId = user?.id;
  const token = localStorage.getItem('token');
  const maxLength = 100;

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`https://d3-api.onrender.com/api/v1/stores/${id}`);
        setStore(response.data.store);
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    fetchStore();
  }, [id]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`https://d3-api.onrender.com/api/v1/followers/${id}`);
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    fetchStore();
  }, [id]);

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`https://d3-api.onrender.com/api/v1/discounts/shop/${id}`);
        setDiscounts(response.data.discounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        setLoading(false);
      }
    };

    fetchDiscountsByShop();
  }, [id]);

  const handleFollow = async () => {
    try {
      await axios.post(`https://d3-api.onrender.com/api/v1/followers/follow`, {
        userId: user?.id,
        storeId: id
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsFollowing(true);
      window.location.reload();
    } catch (error) {
      console.error('Error following store:', error);
      window.location.reload();
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`https://d3-api.onrender.com/api/v1/followers/unfollow`, {
        userId: user?.id,
        storeId: id
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsFollowing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error unfollowing store:', error);
      window.location.reload();
    }
  };

  const handlePostReview = async () => {
    try {
      if (newReview.user.trim() !== '' && newReview.comment.trim() !== '') {
        const response = await axios.post('https://d3-api.onrender.com/api/v1/reviews', {
          entityType: 'discount',
          entityId: id,
          reviewerName: newReview.user,
          reviewText: newReview.comment
        });
        window.location.reload();
        setNewReview({ user: '', comment: '' });
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<{ reviews: Review[] }>(`https://d3-api.onrender.com/api/v1/reviews/entity/${id}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (userId && followers.length > 0) {
      const isUserFollowing = followers.some(follower => follower.user._id === userId);
      setIsFollowing(isUserFollowing);
    }
  }, [userId, followers]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiscounts = discounts.filter(discount =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-full scroll-smooth flex flex-col'>
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-col w-full px-[5%] py-[2%] bg-white text-black gap-[2%]">
          <div className="w-full flex bg-gray-200 h-[120px] justify-between p-2 rounded-md">
            <div className="flex h-full items-center gap-4">
              <img
                src={store?.imageUrl}
                alt="Store Image"
                className="w-[100px] rounded-full h-full justify-center mx-auto flex items-center"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-center text-[20px] font-medium">
                  {store?.name} <span className="text-gray-600"></span>
                </p>
                <p className="lowercase text-gray-500">
                  @{store?.owner.first_name}
                  {store?.owner.last_name}
                </p>
                <p className="text-gray-600 font-medium cursor-pointer hover:text-primary">
                  {Number(store?.followers) === 1 ?
                    `${store?.followers} follower`
                    : `${store?.followers} followers`}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <p className="hidden md:text-gray-500 h">{Number(reviews?.length) === 1 ?
                `${reviews?.length} review`
                : `${reviews?.length} reviews`}</p>
              <span className="hidden md:block">|</span>
              <div>
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
              {filteredDiscounts.map((discount) => (
                <Link to={`/discount/${discount._id}/see-details`} key={discount._id} className="hover:shadow-md border flex flex-col justify-between rounded-md p-4">
                  <img src={discount.imageUrl} alt={discount.name} className="w-full object-cover rounded-md" />
                  <div className="flex flex-col">
                    <p className="text-[14px] text-gray-500">{discount.store.name}</p>
                    <p className="text-[17px] font-medium">{discount.name}</p>
                    <p className="text-[14px] text-gray-500">
                      {discount.description.length > maxLength ?
                        `${discount.description.substring(0, maxLength)}...` :
                        discount.description
                      }
                    </p>
                    <div className="flex items-center">
                      <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initialPrice.toLocaleString("KES")}`}</p>
                      <p className="text-primary font-medium text-[14px] ml-2">
                        Ksh. {discount.priceAfterDiscount.toLocaleString("kes")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[5%] flex w-full gap-[2%] pb-4 flex-col md:flex-row bg-white ">
          <div className="mt-4 w-full md:w-1/2">
            <p className="font-medium text-[16px] mb-2">Post Your Review</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePostReview();
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.user}
                required
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                className="border p-2 rounded-md outline-none focus:border-primary"
              />
              <textarea
                placeholder="Your Comment"
                value={newReview.comment}
                required
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="border p-2 rounded-md outline-none focus:border-primary"
              />
              <button type="submit" className="bg-primary rounded-md text-white font-medium px-4 py-2">
                {loading ? <ClipLoader color="#fff" /> : 'Post Review'}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <p className='font-semibold text-lg'>Shop Revews <span className="text-gray-500">({reviews?.length})</span></p>
            <div className="flex flex-col w-full">
              {reviews.map((review) => (
                <div key={review._id} className="border-b py-2">
                  <p className="font-medium">{review.reviewerName}</p>
                  <p className='text-gray-700'>{review.reviewText}</p>
                  <p className="text-gray-400 text-[13px]">{new Date(review.reviewDate).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreView;
