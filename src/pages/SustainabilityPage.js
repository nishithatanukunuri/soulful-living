import React from 'react';
import { motion } from 'framer-motion';
import { FaTree, FaRecycle, FaHandHoldingHeart } from 'react-icons/fa';
import { GiWoodBeam, GiBamboo } from 'react-icons/gi';

const SustainabilityPage = () => {
    const pillarVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-serene-white">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/sustainability-hero.jpg)` }}
                ></div>
                <div className="absolute inset-0 bg-charcoal opacity-60"></div>
                <div className="relative z-10 p-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-5xl md:text-7xl font-bold"
                    >
                        Crafted for Tomorrow
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        We believe a beautiful home shouldn't come at the expense of the one we all share.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <section className="text-center max-w-4xl mx-auto mb-20">
                    <h2 className="font-serif text-4xl text-charcoal mb-12">Our Sustainable Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={pillarVariants}>
                            <FaRecycle className="text-6xl text-forest-green mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Circular Design</h3>
                            <p className="text-charcoal/80">We prioritize reclaimed and recycled materials, giving them a second life and reducing waste.</p>
                        </motion.div>
                        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={pillarVariants}>
                            <FaTree className="text-6xl text-forest-green mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Conscious Sourcing</h3>
                            <p className="text-charcoal/80">Every new material, from wood to fabric, is sustainably sourced and certified for its low environmental impact.</p>
                        </motion.div>
                        <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={pillarVariants}>
                            <FaHandHoldingHeart className="text-6xl text-forest-green mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Ethical Craftsmanship</h3>
                            <p className="text-charcoal/80">We partner with artisans who share our values, ensuring fair wages and safe working conditions.</p>
                        </motion.div>
                    </div>
                </section>
                <section className="mb-20">
                    <h2 className="font-serif text-4xl text-charcoal text-center mb-12">Materials That Matter</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <GiWoodBeam className="text-4xl text-accent" />
                            <h3 className="font-serif text-3xl text-charcoal">Reclaimed Wood</h3>
                            <p className="text-charcoal/80 leading-relaxed">
                                Each piece of reclaimed wood carries a history. By salvaging timber from old structures, we prevent beautiful, old-growth wood from ending up in landfills. This process not only preserves forests but also gives your furniture a unique character and story that can't be replicated.
                            </p>
                        </div>
                        <div className="h-80 rounded-lg shadow-xl overflow-hidden">
                            <img src={`${process.env.PUBLIC_URL}/images/reclaimed-wood.jpg`} alt="Close up of reclaimed wood texture" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
                        <div className="h-80 rounded-lg shadow-xl overflow-hidden md:order-last">
                            <img src={`${process.env.PUBLIC_URL}/images/bamboo-forest.jpg`} alt="Bamboo forest" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4 md:order-first">
                            <GiBamboo className="text-4xl text-accent" />
                            <h3 className="font-serif text-3xl text-charcoal">Moso Bamboo</h3>
                            <p className="text-charcoal/80 leading-relaxed">
                                Bamboo is a true marvel of nature. As one of the fastest-growing plants on Earth, it's a rapidly renewable resource that requires no pesticides. Its strength and durability make it an ideal alternative to traditional hardwoods, helping us build for the future without depleting it.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="bg-sage-green/20 rounded-lg p-12 text-center mb-20">
                    <h2 className="font-serif text-4xl text-charcoal mb-8">Our Collective Impact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <p className="font-serif text-5xl font-bold text-forest-green">1,200+</p>
                            <p className="mt-2 font-semibold">Trees Saved</p>
                        </div>
                        <div>
                            <p className="font-serif text-5xl font-bold text-forest-green">98%</p>
                            <p className="mt-2 font-semibold">Non-Toxic & Natural Finishes</p>
                        </div>
                        <div>
                            <p className="font-serif text-5xl font-bold text-forest-green">50+</p>
                            <p className="mt-2 font-semibold">Artisan Livelihoods Supported</p>
                        </div>
                    </div>
                </section>
                <section className="text-center max-w-3xl mx-auto">
                    <h2 className="font-serif text-4xl text-charcoal mb-4">Our Pledge for a Soulful Future</h2>
                    <p className="text-lg text-charcoal/80 leading-relaxed">
                        Our journey is one of continuous improvement. We pledge to keep exploring innovative materials, refining our processes, and championing a more mindful way of living. When you bring a piece of our furniture into your home, you're not just buying an object; you're joining a movement towards a more beautiful and sustainable world.
                    </p>
                </section>
            </div>
        </motion.div>
    );
};

export default SustainabilityPage;