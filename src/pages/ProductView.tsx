import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleLeft, FaFacebookF, FaInstagram, FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BookingSlotsList from '../components/seller/BookingSlotsList';

interface Review {
  _id: string;
  entityType: string;
  entityId: string;
  reviewerName: string;
  reviewDate: Date;
  reviewText: string;
}


interface Discount {
  _id: string;
  name: string;
  initialPrice: number;
  discount: number;
  percentageDiscount: number;
  serviceTime: string;
  category: string;
  imageUrl: string;
  priceAfterDiscount: number;
  expiryDate: Date;
  description: string;
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
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<{ user: string; comment: string }>({
    user: '',
    comment: '',
  });

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
    const fetchDiscount = async () => {
      try {
        const response = await axios.get<{ discount: Discount }>(`https://d3-api.onrender.com/api/v1/discounts/${id}`);
        setDiscount(response.data.discount);
        console.log(discount);
      } catch (error) {
        console.error('Error fetching discount:', error);
      }
    };

    fetchDiscount();
  }, [id]);

  useEffect(() => {
    const fetchBookingSlots = async () => {
      try {
        const response = await axios.get<{ bookingSlots: BookingSlot[] }>(`https://d3-api.onrender.com/api/v1/discounts/${id}/booking-slots`);
        setBookingSlots(response.data.bookingSlots);
      } catch (error) {
        console.error('Error fetching booking slots:', error);
      }
    };

    if (discount) {
      fetchBookingSlots();
    }
  }, [discount, id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleBookSlot = (slot: BookingSlot) => {
  };

  return (
    <div>
      <Navbar />
      <div className="flex px-[5%] flex-col py-[2%]">
        <div className="flex flex-col gap-2 items-start ">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <FaAngleLeft />
            <span>Go back</span>
          </button>
          <div className="w-full flex flex-col md:flex-row gap-[2%]">
            <div className="flex flex-col w-full gap-[2%] md:w-2/3">
              <div className="border p-4 flex flex-col md:flex-row w-full">
                <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full md:w-1/2">
                  <div className="px-[5%] w-full md:w-2/3 mt-4 md:mt-0">
                    <img
                      className='rounded-md'
                      alt='image'
                      src={discount?.imageUrl}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <p className="text-gray-400 font-light text-[11px]">{discount?.category}</p>
                  <p className="font-medium text-[24px] ">{discount?.name}</p>
                  <span className="text-primary font-medium text-[17px]">
                    {discount?.percentageDiscount.toFixed(1)}% OFF
                  </span>
                  <div className="flex items-center gap-2 ">
                    <span className='font-light text-gray-600 '>was</span>
                    <p className="text-[17px] line-through">
                      Ksh {discount?.initialPrice.toLocaleString('KES')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className='font-light text-gray-600'>now</span>
                    <p className="font-semibold text-[24px]">
                      Ksh {discount?.priceAfterDiscount.toLocaleString('KES')}
                    </p>
                  </div>
                  <button onClick={() => navigate(`/${discount?._id}/checkout`)} className="w-full py-2 bg-primary rounded-md text-white font-medium capitalize text-[17px] flex items-center justify-center mb-2">
                    Get this discount
                  </button>
                  <div className="flex flex-col my-3.5">
                    <span className="font-medium text-[16px]">
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
              <div className="flex flex-col w-full mt-[2%] p-[2%] bg-gray-100">
                <div className="flex gap-2 w-full justify-between items-center mb-2">
                  <p
                    className={`font-medium text-[18px] cursor-pointer ${activeTab === 'details' ? 'text-primary border-b border-primary' : 'text-gray-600'
                      }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </p>
                  <p
                    className={`font-medium text-[18px] cursor-pointer ${activeTab === 'reviews' ? 'text-primary border-b border-primary' : 'text-gray-600'
                      }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({reviews.length})
                  </p>
                </div>
                {activeTab === 'details' ? (
                  <div className="">
                    <p className="">
                      {discount?.description}
                    </p>
                  </div>
                ) : (
                  <div className="">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b py-2">
                        <p className="font-medium">{review.reviewerName}</p>
                        <p className='text-gray-700'>{review.reviewText}</p>
                        <p className="text-gray-400 text-[13px]">{new Date(review.reviewDate).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
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
                    className="border p-2 focus:border-primary outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Your Comment"
                    value={newReview.comment}
                    required
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="border p-2 rounded-md focus:border-primary outline-none"
                  />
                  <button type="submit" className="bg-primary rounded-md text-white font-medium px-4 py-2">
                    Post Review
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <BookingSlotsList bookingSlots={bookingSlots} handleClickOpen={handleClickOpen} handleBookSlot={handleBookSlot} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductView
