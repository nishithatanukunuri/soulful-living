import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck } from 'react-icons/fi';

const TopBar = () => {
    return (
        <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-forest-green text-serene-white text-sm text-center py-2 px-6 font-sans flex items-center justify-center"
        >
            <FiTruck className="mr-2" />
            <p>Free Shipping on All Eco-Friendly Orders</p>
        </motion.div>
    );
};

export default TopBar;