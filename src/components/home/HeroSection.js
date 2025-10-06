import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
    return (
        <div className="relative h-[90vh] min-h-[650px] flex items-center justify-center text-white overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-background.jpg)` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: "easeOut" }}
            ></motion.div>
            <div className="absolute inset-0 bg-charcoal opacity-70"></div>
            <div className="relative z-10 text-center p-4">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-5xl md:text-7xl font-bold mb-4 text-serene-white"
                >
                    Find Harmony in Your Home
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-8 text-serene-white/90"
                >
                    Discover mindfully crafted, sustainable furniture that brings a sense of calm and soul to your sanctuary.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link
                        to="/products"
                        className="group inline-flex items-center bg-sage-green hover:bg-forest-green text-serene-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Explore Our Collection
                        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;