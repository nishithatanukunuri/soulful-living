import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiPlus, FiChevronLeft, FiChevronRight, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { AnimationContext } from '../context/AnimationContext';
import { CartContext } from '../context/CartContext';
import { ComparisonContext } from '../context/ComparisonContext';
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
    const { triggerPlantAnimation } = useContext(AnimationContext);
    const { wishlist, addToCart, addToWishlist, removeFromWishlist } = useContext(CartContext);
    const { toggleCompare, compareList } = useContext(ComparisonContext);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1);
    const [quantity, setQuantity] = useState(1);

    const isInWishlist = useMemo(() =>
            wishlist.some(item => item.id === product.id),
        [wishlist, product.id]
    );

    const isComparing = useMemo(() =>
            compareList.some(item => item.id === product.id),
        [compareList, product.id]
    );

    if (!product) {
        return null;
    }

    const handleCompareClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleCompare(product);
    };

    const handleIncreaseQuantity = (e) => {
        e.stopPropagation();
        setQuantity(q => q + 1);
    };

    const handleDecreaseQuantity = (e) => {
        e.stopPropagation();
        setQuantity(q => Math.max(1, q - 1));
    };

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleNextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSlideDirection(1);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const handlePrevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSlideDirection(-1);
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        if (product.eco) {
            triggerPlantAnimation();
        }
    };

    const imageVariants = {
        hidden: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
        exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }),
    };

    return (
        <motion.div
            className="group relative bg-serene-white rounded-lg shadow-xl overflow-hidden border border-transparent hover:border-earth-tone/70 transition-all duration-300"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/product/${product.id}`} className="block relative">
                <div className="relative w-full h-72 overflow-hidden">
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
                            <button onClick={handlePrevImage} className="absolute top-1/2 left-2 ..."><FiChevronLeft size={20} /></button>
                            <button onClick={handleNextImage} className="absolute top-1/2 right-2 ..."><FiChevronRight size={20} /></button>
                        </>
                    )}
                </div>

                {/* THE FIX: Corrected the syntax from 'div' to '<div' */}
                <div
                    onClick={handleCompareClick}
                    className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-serene-white/80 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer"
                >
                    <input
                        type="checkbox"
                        checked={isComparing}
                        readOnly
                        className="w-4 h-4 accent-forest-green pointer-events-none"
                    />
                    <span className="text-xs font-bold text-charcoal">Compare</span>
                </div>

                {product.eco && (
                    <div className="absolute top-4 right-4 bg-forest-green p-2 rounded-full shadow-sm z-10" title="Eco-Friendly">
                        <FaLeaf className="text-serene-white" />
                    </div>
                )}
            </Link>

            <Link
                to={`/product/${product.id}`}
                state={{ focusTab: 'description' }}
                className="block p-5"
            >
                <h3 className="text-lg font-semibold text-charcoal mb-1 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-charcoal/60">({product.rating})</span>
                </div>
                <p className="text-earth-tone-dark font-bold text-lg">${product.price.toFixed(2)}</p>
            </Link>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-serene-white/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center border-2 border-earth-tone/50 rounded-md">
                        <button onClick={handleDecreaseQuantity} className="px-2 py-1 ..."><FiMinus size={16} /></button>
                        <span className="px-3 font-bold text-charcoal">{quantity}</span>
                        <button onClick={handleIncreaseQuantity} className="px-2 py-1 ..."><FiPlus size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleAddToCart} className="p-2 rounded-md ..."><FiShoppingBag size={20} /></button>
                        <button onClick={handleWishlistToggle} className="p-2 rounded-md ...">
                            {isInWishlist ? <FaHeart size={20} className="text-red-500" /> : <FiHeart size={20} className="text-charcoal" />}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;