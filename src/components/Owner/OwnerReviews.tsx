import React, { useState, useEffect } from 'react';
import SellerLayout from '../../elements/SellerLayout';
import { getShopReviews } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import { Review } from '../../types';

const OwnerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const shopId = Number(id);
        if (isNaN(shopId)) {
          console.error('Invalid shop ID');
          return;
        }

        const data = await getShopReviews(shopId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const truncateBody = (body: string, length: number) => {
    return body.length > length ? body.substring(0, length) + '...' : body;
  };

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <SellerLayout>
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full rounded-md">
              <thead>
                <tr className='bg-light border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium'>
                  <th className="px-4 text-start font-normal pb-2 pt-4">ID</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">User</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Review</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Date</th>
                  
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="cursor-pointer border-b py-2 border-gray-100 hover:bg-gray-100"
                    onClick={() => handleReviewClick(review)}
                  >
                    <td className="px-4 py-2 border-b">{review.id}</td>
                    <td className="px-4 py-2 border-b">{review.user_name}</td>
                    <td className="px-4 py-2 border-b">{truncateBody(review.body, 30)}</td>
                    <td className="px-4 py-2 border-b">{new Date(review.created_at).toLocaleDateString()}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedReview && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-h-[90vh] overflow-y-auto md:w-1/2 lg:w-1/3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Review Details</h2>
                <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <p><strong>User:</strong> {selectedReview.user_name}</p>
                <p><strong>Date:</strong> {new Date(selectedReview.created_at).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {selectedReview.reviewable_type}</p>
                <p><strong>Review:</strong> {selectedReview.body}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default OwnerReviews;
