import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import allProducts from '../../data/products.json';
import ProductCard from '../ProductCard';

const SmartRecommendations = ({ currentProduct }) => {
    const recommendedProducts = useMemo(() => {
        if (!currentProduct) return [];

        const recommendations = new Set();
        const { id, tags } = currentProduct;
        if (tags.includes('main seating')) {
            const coffeeTable = allProducts.find(p => p.id !== id && p.tags.includes('coffee table'));
            const accentChair = allProducts.find(p => p.id !== id && p.tags.includes('accent seating'));
            if (coffeeTable) recommendations.add(coffeeTable);
            if (accentChair) recommendations.add(accentChair);
        }
        if (tags.includes('main table')) {
            const diningChair = allProducts.find(p => p.id !== id && p.tags.includes('dining seating'));
            if (diningChair) recommendations.add(diningChair);
        }
        if (recommendations.size < 3) {
            const primaryTag = tags[0];
            const fallbackProducts = allProducts.filter(p =>
                p.id !== id &&
                p.tags.includes(primaryTag) &&
                ![...recommendations].some(rec => rec.id === p.id)
            );

            fallbackProducts.slice(0, 3 - recommendations.size).forEach(p => recommendations.add(p));
        }

        return Array.from(recommendations);
    }, [currentProduct]);

    if (recommendedProducts.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="mt-20 pt-12 border-t border-earth-tone/30">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-4xl text-center text-charcoal mb-12"
            >
                Complete the Look
            </motion.h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {recommendedProducts.map(product => (
                    <motion.div key={product.id} variants={itemVariants}>
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SmartRecommendations;