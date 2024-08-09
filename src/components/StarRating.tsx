import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
    const handleClick = (newRating: number) => {
        if (onRatingChange) onRatingChange(newRating);
    };

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                    {rating >= star ? <FaStar /> : <FaRegStar />}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
