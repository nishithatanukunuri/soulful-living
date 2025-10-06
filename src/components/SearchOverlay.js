import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import allProducts from '../data/products.json';
import { useDebounce } from '../hooks/useDebounce';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setResults(filtered.slice(0, 5));
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
            setResults([]);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-[99] flex justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-full max-w-2xl mt-20 bg-serene-white rounded-lg shadow-2xl overflow-hidden h-fit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative border-b border-earth-tone/30">
                            <FiSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-charcoal/50" size={24} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for soulful furniture..."
                                autoFocus
                                className="w-full pl-16 pr-16 py-6 text-xl bg-transparent focus:outline-none"
                            />
                            <button onClick={onClose} className="absolute top-1/2 right-6 -translate-y-1/2 text-charcoal/60 hover:text-charcoal">
                                <FiX size={24} />
                            </button>
                        </div>
                        <div className="p-4">
                            {results.length > 0 ? (
                                <ul className="space-y-2">
                                    {results.map(product => (
                                        <li key={product.id}>
                                            <Link to={`/product/${product.id}`} onClick={onClose} className="flex items-center gap-4 p-3 rounded-md hover:bg-earth-tone/20 transition-colors">
                                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                                <div>
                                                    <p className="font-bold text-charcoal">{product.name}</p>
                                                    <p className="text-sm text-earth-tone-dark">${product.price.toFixed(2)}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                searchTerm && <p className="text-center text-charcoal/70 p-8">No results found for "{searchTerm}"</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;