import React, { useMemo } from 'react';
import ProductCard from '../ProductCard';
import products from '../../data/products.json';
import { motion } from 'framer-motion';

const BestSellers = () => {
    const bestSellers = useMemo(() => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }, []);

    return (
        <div className="py-20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl text-center text-charcoal mb-16"
                >
                    Our Best Sellers
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellers;
