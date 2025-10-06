import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShippingCalculator from './ShippingCalculator';
import ReviewsSection from './ReviewSection';
import ProductSpecifications from './ProductSpecification';

const ProductInfoTabs = ({product, activeTab, setActiveTab }) => {

    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <div className="w-full">
            <div className="flex border-b-2 border-earth-tone/30">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`font-serif text-xl px-6 py-3 transition-colors ${
                        activeTab === 'description' ? 'border-b-2 border-forest-green text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('shipping')}
                    className={`font-serif text-xl px-6 py-3 transition-colors ${
                        activeTab === 'shipping' ? 'border-b-2 border-forest-green text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                >
                    Shipping & Returns
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`font-serif text-xl px-6 py-3 transition-colors ${
                        activeTab === 'reviews' ? 'border-b-2 border-forest-green text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                >
                    Reviews
                </button>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-sans text-charcoal/80 leading-relaxed"
                >
                    {activeTab === 'description' && (
                        <ProductSpecifications product={product} />
                    )}
                    {activeTab === 'shipping' && (
                        <ShippingCalculator />
                    )}
                    {activeTab === 'reviews' && (
                        <ReviewsSection productId={product.id} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ProductInfoTabs;