import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleLeft, FaFacebookF, FaInstagram, FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  user: string;
  comment: string;
}

const ProductView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [newReview, setNewReview] = useState<{ user: string; comment: string }>({
    user: '',
    comment: '',
  });

 const reviews: Review[] = [
  { id: 1, user: 'Wanjiku Njoroge', comment: 'Impressive product! It exceeded my expectations.' },
  { id: 2, user: 'Kipchoge Bett', comment: 'Fast and efficient delivery. Very satisfied with the service.' },
  { id: 3, user: 'Amina Odhiambo', comment: 'Quality is top-notch. Will definitely buy again.' },
  { id: 4, user: 'Muthoni Kamau', comment: 'Great customer service. They were very helpful.' },
  { id: 5, user: 'Omondi Otieno', comment: 'The product arrived on time and in perfect condition.' },
  { id: 6, user: 'Naisiae Letoluai', comment: 'Impressed with the packaging. Everything was well-protected.' },
  { id: 7, user: 'Kagiso Maina', comment: 'I recommend this product to anyone looking for quality. Thumbs up!' },
];

const handlePostReview = () => {
    if (newReview.user.trim() !== '' && newReview.comment.trim() !== '') {
    //   setReviews([...reviews, { id: reviews.length + 1, ...newReview }]);
      setNewReview({ user: '', comment: '' });
    }
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
            <div className="w-full flex gap-[2%]">
                <div className="flex flex-col w-full gap-[2%] md:w-2/3">
                    <div className="border p-4 flex flex-col md:flex-row w-full">
                        <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full md:w-1/2">
                            <div className="px-[5%] w-full md:w-2/3 mt-4 md:mt-0">
                                <img 
                                    className='rounded-md'
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
                    <div className="flex gap-2 items-center mb-2">
                      <p
                        className={`font-medium text-[18px] cursor-pointer ${
                          activeTab === 'details' ? 'text-primary border-b border-primary' : 'text-gray-600'
                        }`}
                        onClick={() => setActiveTab('details')}
                      >
                        Details
                      </p>
                      <p
                        className={`font-medium text-[18px] cursor-pointer ${
                          activeTab === 'reviews' ? 'text-primary border-b border-primary' : 'text-gray-600'
                        }`}
                        onClick={() => setActiveTab('reviews')}
                      >
                        Reviews ({reviews.length})
                      </p>
                    </div>
                    {activeTab === 'details' ? (
                      <div className="">
                        <p className="">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quisquam amet
                          optio officiis similique est sunt quod eum tenetur assumenda, officia
                          aliquam! Modi omnis debitis labore eveniet, aliquam recusandae obcaecati!
                        </p>
                        <p className="">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quam! Eum
                          autem porro facere, nisi nostrum necessitatibus aliquid quo illum aut veniam
                          sed consectetur quisquam optio numquam ea voluptatum nihil!
                        </p>
                        <p className="">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum enim nam
                          deserunt totam porro sed quas modi eos vero laboriosam! Placeat officiis
                          excepturi incidunt possimus praesentium minus explicabo dolorem
                          consequatur?
                        </p>
                      </div>
                    ) : (
                      <div className="">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b py-2">
                            <p className="text-gray-600">{review.user}</p>
                            <p>{review.comment}</p>
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
                </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default ProductView
