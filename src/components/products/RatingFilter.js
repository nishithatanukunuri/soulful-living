import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingFilter = ({ activeRating, onSelectRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div
            className="flex items-center space-x-1"
            onMouseLeave={() => setHoverRating(0)}
        >
            {[1, 2, 3, 4, 5].map((star) => {
                const ratingValue = hoverRating || activeRating;

                return (
                    <button
                        key={star}
                        onClick={() => onSelectRating(star === activeRating ? 0 : star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="focus:outline-none"
                        aria-label={`Filter by ${star} stars or more`}
                    >
                        <FaStar
                            className={`text-2xl transition-colors duration-200 ${
                                star <= ratingValue
                                    ? 'text-gold-star'
                                    : 'text-charcoal/30'
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default RatingFilter;