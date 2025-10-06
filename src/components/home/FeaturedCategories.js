import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Sofas', image: '/images/category-sofas.jpg', path: '/products?category=sofa', size: 'large' },
    { name: 'Chairs', image: '/images/category-chair.jpg', path: '/products?category=chair', size: 'small' },
    { name: 'Tables', image: '/images/category-tables.jpg', path: '/products?category=table', size: 'small' },
    { name: 'Beds', image: '/images/category-beds.jpg', path: '/products?category=bed', size: 'large' },
    { name: 'Storage', image: '/images/category-storage.jpg', path: '/products?category=storage', size: 'full' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const FeaturedCategories = () => {
    return (
        <div className="py-20 bg-warm-ivory">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-charcoal mb-4">Shop by Category</h2>
                    <div className="w-24 h-1 bg-sage-green mx-auto"></div>
                </div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-8 h-[700px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {categories.map((category, index) => {
                        let gridClasses = '';
                        if (index === 0) gridClasses = 'lg:col-span-2 lg:row-span-1';
                        if (index === 1) gridClasses = 'lg:col-span-1 lg:row-span-1';
                        if (index === 2) gridClasses = 'lg:col-span-1 lg:row-span-1';
                        if (index === 3) gridClasses = 'lg:col-span-2 lg:row-span-2';
                        if (index === 4) gridClasses = 'lg:col-span-2 lg:row-span-1';
                        if (index === 0) gridClasses += ' md:col-span-2';

                        return (
                            <motion.div key={category.name} variants={itemVariants} className={gridClasses}>
                                <Link to={category.path} className="group block relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent"></div>
                                    <div className="relative h-full flex items-end p-8">
                                        <h3 className="font-serif text-3xl text-white font-bold transform transition-transform duration-500 group-hover:-translate-y-2">{category.name}</h3>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturedCategories;