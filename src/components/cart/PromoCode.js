import React, { useState } from 'react';

const validCodes = {
    ECO10: { discount: 0.10, message: "10% off for being eco-conscious!" },
    SOUL20: { discount: 0.20, message: "20% off your soulful order!" },
};

const PromoCode = ({ onApplyPromo }) => {
    const [promoCode, setPromoCode] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleApply = () => {
        const code = promoCode.toUpperCase();
        if (validCodes[code]) {
            onApplyPromo(validCodes[code].discount);
            setFeedback({ message: validCodes[code].message, type: 'success' });
        } else {
            onApplyPromo(0);
            setFeedback({ message: 'Invalid or expired promo code.', type: 'error' });
        }
    };

    return (
        <div className="mt-6">
            <h3 className="font-serif text-xl text-charcoal mb-4">Promotion Code</h3>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g., ECO10"
                    className="flex-grow px-4 py-2 bg-warm-ivory/50 border-2 border-earth-tone/50 rounded-md focus:outline-none focus:border-accent"
                />
                <button onClick={handleApply} className="bg-earth-tone text-serene-white font-bold py-2 px-4 rounded-md hover:bg-earth-tone-dark">
                    Apply
                </button>
            </div>
            {feedback.message && (
                <p className={`mt-2 text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.message}
                </p>
            )}
        </div>
    );
};

export default PromoCode;