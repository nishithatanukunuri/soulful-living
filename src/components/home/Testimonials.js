import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    { quote: "The quality is exceptional and it completely transformed my living room. The delivery was seamless and the customer service was top-notch!", name: "Sarah L.", location: "New York, NY", stars: 5 },
    { quote: "I was hesitant to buy a sofa online, but I'm so glad I did. It's more beautiful in person and incredibly comfortable. Highly recommended!", name: "Michael B.", location: "Austin, TX", stars: 5 },
    { quote: "From browsing the website to the final assembly, every step was a pleasure. This is my new go-to for all things furniture.", name: "Jessica P.", location: "San Francisco, CA", stars: 5 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const Testimonials = () => {
    return (
        <div className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-charcoal mb-4">Voices of Our Community</h2>
                    <div className="w-24 h-1 bg-sage-green mx-auto"></div>
                </div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-serene-white border border-earth-tone/20 p-8 rounded-lg shadow-xl relative"
                            variants={itemVariants}
                        >
                            <FaQuoteLeft className="absolute top-6 left-6 text-earth-tone text-5xl opacity-10" />
                            <div className="relative z-10">
                                <div className="flex text-earth-tone-dark mb-4">
                                    {[...Array(testimonial.stars)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="font-sans italic mb-6 text-charcoal/80">"{testimonial.quote}"</p>
                                <p className="font-bold text-right text-charcoal">- {testimonial.name}</p>
                                <p className="text-sm text-accent text-right">{testimonial.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;