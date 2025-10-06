import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck } from 'react-icons/fi';

const ShippingCalculator = () => {
    const [zipCode, setZipCode] = useState('');
    const [shippingInfo, setShippingInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalculate = (e) => {
        e.preventDefault();
        if (!/^\d{5}$/.test(zipCode)) {
            setError('Please enter a valid 5-digit zip code.');
            return;
        }

        setError('');
        setIsLoading(true);
        setShippingInfo(null);
        setTimeout(() => {
            setIsLoading(false);
            setShippingInfo({
                standard: { price: 'FREE', delivery: '5-7 business days' },
                express: { price: '$24.99', delivery: '2-3 business days' },
                whiteGlove: { price: '$99.99', delivery: 'Scheduled delivery & assembly' },
            });
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div>
                <h4 className="font-serif text-xl text-charcoal mb-4">Estimate Shipping</h4>
                <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter 5-digit Zip Code"
                        maxLength="5"
                        className="flex-grow w-full px-4 py-3 bg-warm-ivory/50 border-2 border-earth-tone/50 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors disabled:bg-earth-tone/50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Calculating...' : 'Calculate'}
                    </button>
                </form>
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <AnimatePresence>
                    {shippingInfo && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 p-4 bg-sage-green/20 rounded-md border border-sage-green/50 overflow-hidden"
                        >
                            <div className="flex justify-between items-center py-2 border-b border-sage-green/30">
                                <div className="flex items-center gap-3">
                                    <FiTruck />
                                    <span className="font-bold">Standard Shipping</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{shippingInfo.standard.price}</p>
                                    <p className="text-sm text-charcoal/70">{shippingInfo.standard.delivery}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-sage-green/30">
                                <div className="flex items-center gap-3">
                                    <FiTruck className="text-forest-green" />
                                    <span className="font-bold">Express Shipping</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{shippingInfo.express.price}</p>
                                    <p className="text-sm text-charcoal/70">{shippingInfo.express.delivery}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-3">
                                    <FiTruck className="text-forest-green font-bold" />
                                    <span className="font-bold">White Glove Delivery</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{shippingInfo.whiteGlove.price}</p>
                                    <p className="text-sm text-charcoal/70">{shippingInfo.whiteGlove.delivery}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <h4 className="font-serif text-xl text-charcoal mb-4">Our Return Policy</h4>
                <p className="mb-2">
                    We believe in the quality of our products and want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within **30 days** of delivery for a full refund.
                </p>
                <p>
                    Please ensure items are in their original condition and packaging. To initiate a return, please visit our contact page.
                </p>
            </div>
        </div>
    );
};

export default ShippingCalculator;