import React from 'react';
import { motion } from 'framer-motion';
import { FaRecycle, FaTree } from 'react-icons/fa';
import { GiBamboo } from 'react-icons/gi';

const features = [
    { icon: <FaTree />, title: 'Reclaimed Wood', description: 'Giving new life to old materials, each piece tells a unique story.' },
    { icon: <GiBamboo />, title: 'Sustainable Bamboo', description: 'Utilizing one of the fastest-growing plants on earth for durable, beautiful furniture.' },
    { icon: <FaRecycle />, title: 'Recycled Fabrics', description: 'Our soft textiles are crafted from recycled materials, reducing landfill waste.' },
];

const EcoPromise = () => {
    return (
        <div className="py-20 bg-sage-green/20">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-serif text-4xl text-charcoal mb-4">Crafted with Conscience</h2>
                    <div className="w-24 h-1 bg-forest-green mx-auto mb-6"></div>
                    <p className="max-w-3xl mx-auto text-charcoal/80 mb-16">
                        We believe beautiful furniture shouldn't come at the expense of our planet. Our commitment to sustainability is at the heart of everything we create.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-6xl text-forest-green mb-4 inline-block">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">{feature.title}</h3>
                            <p className="text-charcoal/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EcoPromise;