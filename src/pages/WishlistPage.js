import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import StarRating from '../components/StarRating';

const WishlistPage = () => {
    const { wishlist, addToCart, removeFromWishlist } = useContext(CartContext);

    const handleMoveToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        removeFromWishlist(product.id);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Your Wishlist</h1>
                <p className="text-lg text-charcoal/80">Your curated collection of soulful favorites.</p>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-charcoal">Your wishlist is empty.</h2>
                    <p className="text-charcoal/70 mt-2 mb-6">Save your favorite items to view them here later.</p>
                    <Link to="/products" className="bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors">
                        Discover Products
                    </Link>
                </div>
            ) : (
                <motion.div
                    className="max-w-4xl mx-auto space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {wishlist.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                variants={itemVariants}
                                exit="exit"
                                className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 bg-serene-white rounded-lg shadow-md"
                            >
                                <Link to={`/product/${item.id}`} className="col-span-1">
                                    <img src={`${process.env.PUBLIC_URL}/${item.images[0]}`} alt={item.name} className="w-full h-32 object-cover rounded-md" />
                                </Link>
                                <div className="col-span-1 md:col-span-2">
                                    <Link to={`/product/${item.id}`} className="font-bold text-xl text-charcoal hover:text-accent transition-colors">{item.name}</Link>
                                    <div className="flex items-center gap-2 my-1">
                                        <StarRating rating={item.rating} />
                                        <span className="text-xs text-charcoal/60">({item.rating})</span>
                                    </div>
                                    <p className="font-bold text-lg text-earth-tone-dark">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-forest-green text-serene-white rounded-md hover:bg-charcoal transition-colors"
                                    >
                                        <FiShoppingBag size={18} />
                                        <span>Move to Cart</span>
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-charcoal/60 hover:text-red-600 transition-colors"
                                    >
                                        <FiTrash2 size={18} />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
};

export default WishlistPage;