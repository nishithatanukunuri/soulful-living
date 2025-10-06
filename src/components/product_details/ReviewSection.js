import React, { useMemo } from 'react';
import allReviews from '../../data/reviews.json';
import StarRating from '../StarRating';

const ReviewsSection = ({ productId }) => {
    const productReviews = useMemo(() => {
        return allReviews.filter(review => review.productId === productId);
    }, [productId]);
    const { averageRating, totalReviews } = useMemo(() => {
        if (productReviews.length === 0) {
            return { averageRating: 0, totalReviews: 0 };
        }
        const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
        const avg = (totalRating / productReviews.length).toFixed(1);
        return { averageRating: parseFloat(avg), totalReviews: productReviews.length };
    }, [productReviews]);

    if (totalReviews === 0) {
        return (
            <div>
                <h4 className="font-serif text-xl text-charcoal mb-4">No Reviews Yet</h4>
                <p>Be the first to share your thoughts on this product!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="p-6 bg-sage-green/20 rounded-lg border border-sage-green/50">
                <h4 className="font-serif text-2xl text-charcoal mb-2">Customer Reviews</h4>
                <div className="flex items-center gap-4">
                    <StarRating rating={averageRating} />
                    <p className="font-bold text-lg text-charcoal">
                        {averageRating} out of 5
                    </p>
                    <p className="text-charcoal/70">
                        ({totalReviews} review{totalReviews > 1 ? 's' : ''})
                    </p>
                </div>
            </div>
            {productReviews.map((review) => (
                <div key={review.id} className="border-b border-earth-tone/30 pb-6">
                    <div className="flex items-center mb-2">
                        <StarRating rating={review.rating} />
                        <span className="ml-4 font-bold text-charcoal">{review.author}</span>
                    </div>
                    <p className="text-sm text-charcoal/60 mb-3">{review.date}</p>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewsSection;