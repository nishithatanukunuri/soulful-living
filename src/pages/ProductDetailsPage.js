import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import allProducts from '../data/products.json';
import allReviews from '../data/reviews.json';
import { FiChevronLeft, FiChevronRight, FiHeart, FiPlus } from 'react-icons/fi';
import StarRating from '../components/StarRating';
import ProductInfoTabs from '../components/product_details/ProductInfoTabs';
import SmartRecommendations from '../components/product_details/SmartRecommendations';
import { CartContext } from '../context/CartContext';
import { AnimationContext } from '../context/AnimationContext';
import { FaHeart } from 'react-icons/fa';
import { ComparisonContext } from '../context/ComparisonContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const {wishlist, addToCart, addToWishlist, removeFromWishlist } = useContext(CartContext);
    const { triggerPlantAnimation } = useContext(AnimationContext);
    const { compareList, toggleCompare } = useContext(ComparisonContext);
    useEffect(() => {
        const newProduct = allProducts.find(p => p.id === parseInt(id));
        setProduct(newProduct);
        setCurrentImageIndex(0);
        setQuantity(1);
        setActiveTab(state?.focusTab || 'description');
        window.scrollTo(0, 0);
    }, [id, state]);
    const reviewCount = useMemo(() => {
        return allReviews.filter(review => review.productId === parseInt(id)).length;
    }, [id]);
    const handleNextImage = () => {
        setSlideDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };
    const isComparing = useMemo(() =>
            compareList.some(item => item.id === product?.id),
        [compareList, product]
    )
    const isInWishlist = useMemo(() =>
            wishlist.some(item => item.id === product?.id),
        [wishlist, product]
    );
    const handleCompareToggle = () => {
        toggleCompare(product);
    };
    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handlePrevImage = () => {
        setSlideDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        if (product.eco) {
            triggerPlantAnimation();
        }
    };

    const imageVariants = {
        hidden: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
        exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }),
    };

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="font-serif text-4xl text-text-charcoal">Loading...</h1>
            </div>
        );
    }

    return (
        <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12 md:py-20"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <div className="relative w-full aspect-square bg-serene-white rounded-lg shadow-xl overflow-hidden">
                        <AnimatePresence initial={false} custom={slideDirection}>
                            <motion.img
                                key={currentImageIndex}
                                src={product.images[currentImageIndex]}
                                alt={`${product.name} view ${currentImageIndex + 1}`}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={slideDirection}
                            />
                        </AnimatePresence>

                        {product.images.length > 1 && (
                            <>
                                <button onClick={handlePrevImage} className="absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-charcoal/40 text-serene-white p-2 rounded-full transition-colors hover:bg-charcoal/70" aria-label="Previous image"><FiChevronLeft size={24} /></button>
                                <button onClick={handleNextImage} className="absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-charcoal/40 text-serene-white p-2 rounded-full transition-colors hover:bg-charcoal/70" aria-label="Next image"><FiChevronRight size={24} /></button>
                            </>
                        )}
                    </div>
                    <div className="flex justify-center gap-3 mt-4">
                        {product.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentImageIndex ? 'bg-earth-tone-dark' : 'bg-earth-tone/50 hover:bg-earth-tone'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
                    <div className="flex flex-col h-full">
                        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <StarRating rating={product.rating} />
                            {reviewCount > 0 && (
                                <span className="text-charcoal/70">
                                    ({reviewCount} review{reviewCount > 1 ? 's' : ''})
                                </span>
                            )}
                        </div>

                        <p className="font-bold text-3xl text-earth-tone-dark mb-8">${product.price.toFixed(2)}</p>

                        <ProductInfoTabs product={product} activeTab={activeTab} setActiveTab={setActiveTab} />

                        <div className="mt-auto pt-8">
                            <div className="flex items-center gap-4 mb-6">
                                <label htmlFor="quantity" className="font-semibold text-charcoal">Quantity:</label>
                                <div className="flex items-center border-2 border-earth-tone/50 rounded-md">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-lg hover:bg-earth-tone/20" aria-label="Decrease quantity">–</button>
                                    <input type="number" id="quantity" value={quantity} readOnly className="w-12 text-center font-bold text-lg bg-transparent focus:outline-none" />
                                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-lg hover:bg-earth-tone/20" aria-label="Increase quantity">+</button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-grow flex items-center justify-center gap-2 bg-forest-green text-serene-white font-bold py-4 px-6 rounded-md hover:bg-charcoal transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <FiPlus />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className="bg-serene-white text-charcoal p-4 rounded-md border-2 border-earth-tone/50 hover:border-earth-tone-dark transition-all shadow-lg"
                                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                    {isInWishlist ? (
                                        <FaHeart size={24} className="text-red-500" />
                                    ) : (
                                        <FiHeart size={24} />
                                    )}
                                </button>
                                <button
                                    onClick={handleCompareToggle}
                                    className={`p-4 rounded-md border-2 transition-all shadow-lg ${
                                        isComparing
                                            ? 'bg-sage-green border-forest-green text-white'
                                            : 'bg-serene-white border-earth-tone/50 text-charcoal hover:border-earth-tone-dark'
                                    }`}
                                    aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
                                >
                                    <span className="font-bold text-sm">Compare</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <SmartRecommendations currentProduct={product} />
        </motion.div>
    );
};

export default ProductDetailPage;