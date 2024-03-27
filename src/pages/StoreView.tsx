import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../utils/context/AuthContext';

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

const StoreView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<{ user: string; comment: string }>({
    user: '',
    comment: '',
  });

  const { user } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/stores/${id}`);
        setStore(response.data.store);
        console.log(response.data.store);
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    fetchStore();
  }, [id]);

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/discounts/shop/${id}`);
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
      await axios.post(`http://localhost:4000/api/v1/followers/follow`, {
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
    } catch (error) {
      console.error('Error following store:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:4000/api/v1/followers/unfollow`, {
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
    } catch (error) {
      console.error('Error unfollowing store:', error);
    }
  };

  const handlePostReview = async () => {
    try {
      if (newReview.user.trim() !== '' && newReview.comment.trim() !== '') {
        const response = await axios.post('http://localhost:4000/api/v1/reviews', {
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
        const response = await axios.get<{ reviews: Review[] }>(`http://localhost:4000/api/v1/reviews/entity/${id}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className='w-full h-full scroll-smooth flex flex-col'>
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row w-full px-[5%] py-[2%] bg-white text-black gap-[2%]">
          <div className="w-full flex flex-col md:w-[20%] p-4">
            <img
              src={store?.imageUrl}
              alt="Store Image"
              className="w-[40%] rounded-md justify-center mx-auto flex items-center"
            />
            <p className="text-center text-[20px] font-medium py-2">
              {store?.name} <span className="text-gray-600"></span>
            </p>
            <div className="w-full flex gap-4 items-center">
              <button className="bg-primary rounded-md text-white font-medium w-full px-3 py-1.5">
                Start Shopping
              </button>
              <Link to={`/`} className="bg-secondary rounded-md text-black p-2 flex items-center justify-center">
                <FaExternalLinkAlt size={24} />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 font-medium">Phone <span className="">{store?.owner?.phone}</span></p>
              <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 font-medium">Email <span className="">{store?.owner.email}</span></p>
              <p className="text-sm text-gray-800 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 ">Location <span className="">{store?.location}</span></p>
              <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2">Type <span className="">{store?.storeType}</span></p>
              <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2">Followers <span className="">{store?.followers}</span></p>
              <div className="w-full flex gap-4 items-center">
                <Link to={`/`} className="bg-secondary rounded-md text-black w-full p-2 flex items-center justify-center">
                  Contact
                </Link>
                <button onClick={isFollowing ? handleUnfollow : handleFollow} className={`bg-primary rounded-md text-white font-medium w-full px-3 py-1.5 ${isFollowing ? 'bg-red-500' : ''}`}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[80%] md:border md:p-4 rounded-md">
            <div className="flex items-center w-full mb-2 justify-between">
              <p className="capitalize text-gray-600 text-[20px] font-medium">
                all
              </p>
              <input
                type="text"
                className='border rounded-md px-2 outline-none focus:outline-none text-gray-500 py-1'
                placeholder='Search'
              />
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:grid-col-5">
              {discounts.map((discount) => (
                <Link to={`/products/${discount._id}/see-details`} key={discount._id} className="shadow-md hover:shadow-xl hover:border flex flex-col justify-between rounded-md p-4">
                  <img src={discount.imageUrl} alt={discount.name} className="w-full object-cover rounded-md" />
                  <div className="flex flex-col">
                    <p className="text-[14px] text-gray-500">{discount.store.name}</p>
                    <p className="text-[17px] font-medium">{discount.name}</p>
                    <p className="text-[14px] text-gray-500">{discount.description}</p>
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
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                className="border p-2 rounded-md"
              />
              <textarea
                placeholder="Your Comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="border p-2 rounded-md"
              />
              <button type="submit" className="bg-primary rounded-md text-white font-medium px-4 py-2">
                Post Review
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2">
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
      <Footer />
    </div>
  );
};

export default StoreView;
