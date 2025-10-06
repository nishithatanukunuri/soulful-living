import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSprout } from 'react-icons/gi';
import {FaTree } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';

const growthStages = [
    { icon: GiSprout, color: 'text-earth-tone', size: 'text-4xl' },
    { icon: FaTree, color: 'text-forest-green', size: 'text-6xl' },
];

const NurtureTree = () => {
    const [growthStage, setGrowthStage] = useState(0);
    const [isWatering, setIsWatering] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleNurture = () => {
        if (isWatering || showMessage) return;

        setIsWatering(true);

        setTimeout(() => {
            setIsWatering(false);
            setGrowthStage(1);
            setShowMessage(true);
            setTimeout(() => {
                setGrowthStage(0);
                setShowMessage(false);
            }, 3000);

        }, 1500);
    };

    const CurrentIcon = growthStages[growthStage].icon;

    return (
        <div
            className="fixed bottom-8 right-16 z-50 flex flex-col items-center group"
            onClick={handleNurture}
        >
            <p className="absolute bottom-full mb-2 bg-charcoal text-serene-white text-xs px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Nurture Me
            </p>
            <div className="relative w-24 h-24 bg-serene-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-earth-tone-dark/50">
                <AnimatePresence>
                    {isWatering && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, x: 50, rotate: -30 }}
                            animate={{ opacity: 1, y: -20, x: 0, rotate: 15 }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            className="absolute -top-8 -right-8"
                        >
                            <IoWaterOutline className="text-blue-400 text-5xl" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={growthStage}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="absolute"
                    >
                        <CurrentIcon className={`${growthStages[growthStage].color} ${growthStages[growthStage].size}`} />
                    </motion.div>
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {showMessage && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-8 bg-forest-green text-serene-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap min-w-max"
                    >
                        Our forest grows stronger!
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NurtureTree;