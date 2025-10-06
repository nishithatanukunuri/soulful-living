import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { AnimationContext } from '../context/AnimationContext';
import { customizerData } from '../data/customizerData';

const CustomizePage = () => {
    const { productId } = useParams();
    const { addToCart } = useContext(CartContext);
    const { triggerPlantAnimation } = useContext(AnimationContext);

    const productData = useMemo(() => customizerData.find(p => p.baseProduct.id === productId), [productId]);
    const optionKeys = useMemo(() => productData ? Object.keys(productData.options) : [], [productData]);

    const [selections, setSelections] = useState(() => {
        if (!productData) return {};
        const initialState = {};
        optionKeys.forEach(key => {
            initialState[key] = productData.options[key][0];
        });
        return initialState;
    });

    useEffect(() => {
        if (productData) {
            const initialState = {};
            optionKeys.forEach(key => {
                initialState[key] = productData.options[key][0];
            });
            setSelections(initialState);
            window.scrollTo(0, 0);
        }
    }, [productId, productData, optionKeys]);

    const currentImage = useMemo(() => {
        if (!productData || Object.keys(selections).length === 0) return '';
        const selectionIds = optionKeys.map(key => selections[key]?.id).join('-');
        return `${process.env.PUBLIC_URL}/images/customizer/combo-${productId}-${selectionIds}.png`;
    }, [selections, productId, productData, optionKeys]);

    const totalPrice = useMemo(() => {
        if (!productData || Object.keys(selections).length === 0) return 0;
        const modifiersTotal = optionKeys.reduce((acc, key) => acc + (selections[key]?.priceModifier || 0), 0);
        return productData.baseProduct.basePrice + modifiersTotal;
    }, [selections, productData, optionKeys]);

    const handleAddToCart = () => {
        const selectionNames = optionKeys.map(key => selections[key].name).join(', ');
        const customProduct = {
            id: `${productData.baseProduct.id}-${optionKeys.map(key => selections[key].id).join('-')}`,
            name: `Custom ${productData.baseProduct.name} (${selectionNames})`,
            price: totalPrice,
            quantity: 1,
            images: [currentImage],
            eco: true,
        };
        addToCart(customProduct);
        triggerPlantAnimation();
    };

    if (!productData) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="font-serif text-4xl text-charcoal">Product Not Found</h1>
                <p className="text-charcoal/70 mt-4">The item you're trying to customize doesn't exist.</p>
                <Link to="/customize" className="mt-6 inline-block bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors">
                    Back to Design Studio
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Design Your {productData.baseProduct.name}</h1>
                <p className="text-lg text-charcoal/80">{productData.baseProduct.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="lg:sticky lg:top-32">
                    <div className="relative aspect-square bg-serene-white rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={currentImage}
                                alt={`Custom configuration of ${productData.baseProduct.name}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full object-contain p-8"
                            />
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-10">
                    {optionKeys.map((key, index) => (
                        <div key={key}>
                            <h3 className="font-serif text-2xl text-charcoal mb-4">{index + 1}. Choose {key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                            <div className="flex flex-wrap gap-4">
                                {productData.options[key].map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setSelections(s => ({ ...s, [key]: opt }))}
                                        className={`p-2 rounded-lg border-4 transition-colors ${
                                            selections[key]?.id === opt.id ? 'border-forest-green' : 'border-transparent'
                                        }`}
                                    >
                                        <div className="w-28 h-28 rounded-md bg-serene-white flex items-center justify-center">
                                            <img src={`${process.env.PUBLIC_URL}/${opt.thumbnail}`} alt={opt.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <p className="text-sm font-semibold mt-2">{opt.name}</p>
                                        <p className="text-xs text-charcoal/70">{opt.priceModifier > 0 ? `+$${opt.priceModifier.toFixed(2)}` : 'Included'}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-8 border-t border-earth-tone/30">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-serif text-2xl">Total Price:</span>
                            <span className="font-bold text-3xl text-earth-tone-dark">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="w-full flex items-center justify-center gap-2 bg-forest-green text-serene-white font-bold py-4 px-6 rounded-md hover:bg-charcoal transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <FiPlus />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CustomizePage;