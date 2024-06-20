import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { manageReview, getReviewsByReviewable } from '../services/apiService';
import { Spinner } from '@material-tailwind/react';
import { useAuth } from '../utils/context/AuthContext';
import Modal from '../utils/elements/Modal';
import LoginModal from '../utils/context/LoginModal';

interface Review {
  id: number;
  body: string;
  user_id: number;
  user_name: string;
  created_at: string;
}

interface ReviewComponentProps {
  reviewableType: 'shop' | 'discount';
  reviewableId: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ reviewableType, reviewableId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [deleteReview, setDeleteReview] = useState<Review | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getReviewsByReviewable(reviewableType, reviewableId);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [reviewableType, reviewableId]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!newReview.trim()) return;

    setIsLoading(true);
    try {
      await manageReview('post', { body: newReview, reviewable_type: reviewableType, reviewable_id: reviewableId });
      setNewReview('');
      fetchReviews();
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (editReview) {
      setEditReview({ ...editReview, body: e.target.value });
    }
  };

  const handleEditSubmit = async () => {
    if (editReview) {
      setIsLoading(true);
      try {
        await manageReview('put', { id: editReview.id, body: editReview.body });
        setEditReview(null);
        fetchReviews();
      } catch (error) {
        console.error('Error updating review:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteSubmit = async () => {
    if (deleteReview) {
      setIsLoading(true);
      try {
        await manageReview('delete', { id: deleteReview.id });
        setDeleteReview(null);
        fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Optionally, you may refresh the reviews or perform other actions after login
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="w-full border borde-gray-200 rounded-md p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 mb-4">
          <p className="text-gray-600 text-[14px] font-light mb-2">Post a Review</p>
          <textarea
            value={newReview}
            onChange={handleInputChange}
            placeholder="Write your review..."
            className="w-full p-2 bg-white outline-none border text-[14px] border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </button>
        </form>

        {showLoginModal && (
          <LoginModal onClose={handleCloseLoginModal} onLogin={handleLoginSuccess} />
        )}

        {isLoading ? (
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full md:w-1/2 mt-4">
            {reviews.length === 0 ? (
              <p className='text-gray-600 text-[14px] font-light'>No reviews yet.</p>
            ) : (
              reviews.slice(0, 4).map((review) => (
                <div key={review.id} className="w-full border-b py-2">
                  <p className="text-gray-700 font-medium text-[14px]">{review.user_name}</p>
                  <p className="text-gray-600 font-light text-[13px]">{review.body}</p>
                  <p className="text-gray-600 font-light text-[12px]">
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                  {user?.id === review.user_id && (
                    <div className="flex gap-2 mt-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setEditReview(review)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => setDeleteReview(review)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {editReview && (
        <Modal isOpen={Boolean(editReview)} onClose={() => setEditReview(null)}>
          <p className="text-[18px] text-gray-700 font-medium mb-2">Edit Review</p>
          <textarea
            value={editReview.body}
            onChange={handleEditChange}
            className="w-full p-2 bg-white border  outline-none border-gray-300 rounded-lg"
          />
          <div className="flex justify-end mt-4">
            <button
              className="text-primary text-[15px] font-light     mr-2"
              onClick={() => setEditReview(null)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-1.5 bg-primary text-white rounded-lg"
              onClick={handleEditSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Save'}
            </button>
          </div>
        </Modal>
      )}

      {deleteReview && (
        <Modal isOpen={Boolean(deleteReview)} onClose={() => setDeleteReview(null)}>
          <h2 className="text-lg font-semibold mb-2">Delete Review</h2>
          <p>Are you sure you want to delete this review?</p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              onClick={() => setDeleteReview(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleDeleteSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Delete'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReviewComponent;
