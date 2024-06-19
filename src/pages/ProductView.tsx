import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleLeft, FaFacebookF, FaInstagram, FaRegHeart, FaSlideshare, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BookingSlotsList from '../components/seller/BookingSlotsList';
import { ClipLoader } from 'react-spinners';

interface Review {
  _id: string;
  entityType: string;
  entityId: string;
  reviewerName: string;
  reviewDate: Date;
  reviewText: string;
}


interface Discount {
  id: number;
  name: string;
  initial_price: string;
  price_after_discount: string;
  percentage_discount: string;
  expiry_date: string;
  slug: string;
  image_url: string;
  service_time_hours: number;
  category: string;
  description: string;
  verified: boolean;
  shop_id: number;
  created_at: string;
  updated_at: string;
}


interface BookingSlot {
  date: Date;
  startTime: string;
  endTime: string;
  booked: boolean;
}

const ProductView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [error, setError] = useState(''); const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<{ user: string; comment: string }>({
    user: '',
    comment: '',
  });

  const handlePostReview = async () => {
    try {
      setLoading(true)
      if (newReview.user.trim() !== '' && newReview.comment.trim() !== '') {
        const response = await axios.post('https://d3-api.onrender.com/api/v1/reviews', {
          entityType: 'discount',
          entityId: id,
          reviewerName: newReview.user,
          reviewText: newReview.comment
        });
        window.location.reload();
        setNewReview({ user: '', comment: '' });
        setLoading(false)
      }
    } catch (error) {
      console.error('Error posting review:', error);
      setLoading(false)
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
    const fetchDiscount = async () => {
      setLoading(true)
      try {
        const response = await axios.get<Discount>(`https://api.discoun3ree.com/api/discounts/${id}`);
        setDiscount(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('An error occurred while fetching discount data.');
      }
    };

    fetchDiscount();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="flex px-[5%] flex-col py-[2%]">
        <div className="flex flex-col gap-2 items-start ">
          <button onClick={() => navigate(-1)} className="flex text-gray-600 font-light text-[15px] items-center gap-2">
            <FaAngleLeft />
            <span>Go back</span>
          </button>
          <div className="w-full flex flex-col md:flex-row gap-[2%]">
            <div className="flex flex-col w-full gap-[2%] md:w-2/3">
              {
                loading ? (
                  <div className="border p-4 flex flex-col md:flex-row w-full">
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
                        <img
                          className='rounded-md'
                          alt='image'
                          src={discount?.image_url}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                      <p className="text-gray-400 font-light text-[11px]">{discount?.category}</p>
                      <p className="font-medium text-[20px] ">{discount?.name}</p>
                      <span className="text-primary font-medium text-[17px]">
                        {discount?.percentage_discount}% OFF
                      </span>
                      <div className="flex items-center gap-2 ">
                        <span className='font-light text-[12px] text-gray-600 '>was</span>
                        <p className="text-[13px] line-through">
                          Ksh {discount?.initial_price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className='font-light text-gray-600'>now</span>
                        <p className="font-medium text-[18px]">
                          Ksh {discount?.price_after_discount}
                        </p>
                      </div>
                      <p className="text-third">
                      </p>
                      <button onClick={() => navigate(`/${discount?.id}/checkout`)} className="w-full py-2 bg-primary rounded-md text-white capitalize text-[14px] flex items-center justify-center mb-2">
                        Get this discount
                      </button>
                      <div className="flex flex-col my-3.5">
                        <span className="text-[15px]">
                          Save this for later
                        </span>
                        <button className='flex border rounded-md border-gray-300 px-2 py-1.5 w-fit items-center gap-2'>
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
                )
              }
              <div className="flex flex-col w-full mt-[2%] p-[2%] bg-gray-100">
                <div className="flex gap-2 w-full justify-between items-center mb-2">
                  <p
                    className={`font-medium text-[18px] cursor-pointer ${activeTab === 'details' ? 'text-primary border-b border-primary' : 'text-gray-600'
                      }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </p>
                </div>
                {activeTab === 'details' ? (
                  <div className="">
                    <p className="text-[14px] font-light text-[14px] text-gray-600">
                      {discount?.description}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-4 w-full">
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
                    required
                    value={newReview.user}
                    onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                    className="p-2 outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Your Comment"
                    value={newReview.comment}
                    required
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="p-2 rounded-md outline-none"
                  />
                  <button type="submit" className="bg-primary rounded-md text-white font-medium mt-2 px-4 py-2">
                    {loading ? <ClipLoader color="#fff" /> : 'Post Review'}
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <p
                className={`font-medium text-[18px] cursor-pointer text-primary border-b border-primary`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </p>
              <div className="">
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
      </div>
      <Footer />
    </div>
  )
}

export default ProductView
