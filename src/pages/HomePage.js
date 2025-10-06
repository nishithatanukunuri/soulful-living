import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import EcoPromise from '../components/home/EcoPromise';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import NurtureTree from '../components/home/NurtureTree';

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HeroSection />
            <FeaturedCategories />
            <EcoPromise />
            <BestSellers />
            <Testimonials />
            <NurtureTree />
        </motion.div>
    );
};

export default HomePage;