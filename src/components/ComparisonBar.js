import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ComparisonContext } from '../context/ComparisonContext';
import { FiX } from 'react-icons/fi';

const ComparisonBar = () => {
    const { compareList, toggleCompare, clearCompareList } = useContext(ComparisonContext);
    const location = useLocation();
    const isVisible = compareList.length > 0 && location.pathname !== '/compare';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-serene-white shadow-2xl border-t-2 border-earth-tone/50"
                >
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="font-serif text-xl text-charcoal hidden md:block">Compare Products</h3>
                            {compareList.map((product) => (
                                <div key={product.id} className="relative w-16 h-16 bg-warm-ivory rounded-md border-2 border-earth-tone/30 flex items-center justify-center">
                                    <img src={`${process.env.PUBLIC_URL}/${item.images[0]}`} alt={product.name} className="w-full h-full object-cover rounded-sm" />
                                    <button
                                        onClick={() => toggleCompare(product)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-700 transition-colors"
                                        aria-label={`Remove ${product.name} from comparison`}
                                    >
                                        <FiX size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={clearCompareList} className="text-sm text-charcoal/60 hover:text-red-500">
                                Clear All
                            </button>
                            <Link
                                to="/compare"
                                className={`px-6 py-3 font-bold rounded-md transition-colors ${
                                    compareList.length < 2
                                        ? 'bg-earth-tone/50 text-serene-white cursor-not-allowed'
                                        : 'bg-forest-green text-serene-white hover:bg-charcoal'
                                }`}
                                onClick={(e) => compareList.length < 2 && e.preventDefault()}
                            >
                                Compare ({compareList.length})
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComparisonBar;