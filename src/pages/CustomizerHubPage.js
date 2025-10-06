import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { customizerData } from '../data/customizerData';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';

const CustomizerHubPage = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-20 relative">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Design Studio</h1>
                <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
                    Your vision, our craftsmanship. Select a foundational piece below to begin creating something truly personal and sustainable.
                </p>
                <AnimatePresence>
                    {!hasScrolled && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <FiArrowDown className="text-charcoal/50" size={24} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="space-y-16">
                {customizerData.map((item, index) => (
                    <motion.div
                        key={item.baseProduct.id}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className={`rounded-lg shadow-xl overflow-hidden group ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            <Link to={`/customize/${item.baseProduct.id}`}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/${item.baseProduct.heroImage}`}
                                    alt={item.baseProduct.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                            </Link>
                        </div>
                        <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            <h2 className="font-serif text-4xl text-charcoal mb-4">{item.baseProduct.name}</h2>
                            <p className="text-charcoal/80 leading-relaxed mb-6 text-base">{item.baseProduct.description}</p>
                            <p className="text-lg text-charcoal/70 mb-8">
                                Starting from <span className="font-bold text-earth-tone-dark">${item.baseProduct.basePrice.toFixed(2)}</span>
                            </p>
                            <Link
                                to={`/customize/${item.baseProduct.id}`}
                                className="inline-flex items-center gap-2 bg-forest-green text-serene-white font-bold py-3 px-8 rounded-md hover:bg-charcoal transition-colors transform hover:scale-105 group"
                            >
                                <span>Customize This Piece</span>
                                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default CustomizerHubPage;