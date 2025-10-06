import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GiSprout } from 'react-icons/gi';

const PlantingAnimationOverlay = ({ onAnimationComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
               className="-ml-10"
            >
                <GiSprout className="text-sage-green text-9xl" />
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="font-serif text-2xl text-serene-white mt-6"
            >
                You've helped nurture our planet!
            </motion.p>
        </motion.div>
    );
};

export default PlantingAnimationOverlay;