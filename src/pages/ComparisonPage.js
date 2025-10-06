import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComparisonContext } from '../context/ComparisonContext';
import StarRating from '../components/StarRating';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ComparisonPage = () => {
    const { compareList } = useContext(ComparisonContext);
    const analysis = useMemo(() => {
        if (compareList.length < 2) return { cheapestId: null, bestValueId: null };

        let cheapest = compareList[0];
        let bestValue = compareList[0];

        for (const product of compareList) {
            if (product.price < cheapest.price) {
                cheapest = product;
            }
            if ((product.rating / product.price) > (bestValue.rating / bestValue.price)) {
                bestValue = product;
            }
        }
        return { cheapestId: cheapest.id, bestValueId: bestValue.id };
    }, [compareList]);

    const specKeys = useMemo(() => {
        const allKeys = new Set();
        allKeys.add('Dimensions');
        allKeys.add('Frame Material');
        allKeys.add('Upholstery');
        compareList.forEach(product => {
            Object.keys(product.specifications).forEach(key => allKeys.add(key));
        });
        return Array.from(allKeys);
    }, [compareList]);
    const gridColsClass = {
        1: 'md:grid-cols-2',
        2: 'md:grid-cols-3',
        3: 'md:grid-cols-4',
    };

    if (compareList.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="font-serif text-4xl text-charcoal">Nothing to Compare</h1>
                <p className="text-charcoal/70 mt-4 mb-6">Please select at least two products from the shop to compare them.</p>
                <Link to="/products" className="bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors">
                    Back to Shop
                </Link>
            </div>
        );
    }
    const SpecRow = ({ label, children }) => (
        <div className="grid grid-cols-subgrid col-span-full bg-serene-white/30 even:bg-serene-white/60">
            <div className="p-4 font-bold text-charcoal flex items-center">{label}</div>
            {children}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Product Comparison</h1>
            </div>
            <div className={`grid grid-cols-1 ${gridColsClass[compareList.length]} gap-4`}>
                <div className="hidden md:block"></div>
                {compareList.map(product => (
                    <div key={product.id} className="bg-serene-white rounded-t-lg shadow-lg border-2 border-transparent relative">
                        {product.id === analysis.cheapestId && (
                            <div className="absolute -top-3 -left-3 bg-gold-star text-charcoal font-bold text-xs px-3 py-1 rounded-full transform -rotate-12 z-10">Cheapest</div>
                        )}
                        {product.id === analysis.bestValueId && (
                            <div className="absolute -top-3 -right-3 bg-sage-green text-serene-white font-bold text-xs px-3 py-1 rounded-full transform rotate-12 z-10">Best Value</div>
                        )}
                        <Link to={`/product/${product.id}`}>
                            <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover rounded-t-md" />
                        </Link>
                        <h3 className="font-serif text-2xl text-center p-4 h-24 flex items-center justify-center">{product.name}</h3>
                    </div>
                ))}
            </div>
            <div className={`grid grid-cols-1 ${gridColsClass[compareList.length]} gap-4 md:border-l md:border-r border-earth-tone/30 rounded-b-lg overflow-hidden shadow-lg`}>
                <SpecRow label="Price">
                    {compareList.map(product => (
                        <div key={product.id} className="p-4 text-center md:border-l border-earth-tone/30">
                            <span className="md:hidden font-bold mr-2">Price: </span>
                            <span className="text-xl font-bold text-earth-tone-dark">${product.price.toFixed(2)}</span>
                        </div>
                    ))}
                </SpecRow>

                <SpecRow label="Rating">
                    {compareList.map(product => (
                        <div key={product.id} className="p-4 text-center md:border-l border-earth-tone/30">
                            <span className="md:hidden font-bold mr-2">Rating: </span>
                            <div className="inline-flex items-center gap-2">
                                <StarRating rating={product.rating} /> ({product.rating})
                            </div>
                        </div>
                    ))}
                </SpecRow>

                {specKeys.map(key => (
                    <SpecRow label={key} key={key}>
                        {compareList.map(product => (
                            <div key={product.id} className="p-4 text-center md:border-l border-earth-tone/30 min-h-[5rem] flex items-center justify-center">
                                <span className="md:hidden font-bold mr-2">{key}: </span>
                                <span>{product.specifications[key] || 'N/A'}</span>
                            </div>
                        ))}
                    </SpecRow>
                ))}

                <SpecRow label="Eco-Friendly">
                    {compareList.map(product => (
                        <div key={product.id} className="p-4 text-center md:border-l border-earth-tone/30">
                            <span className="md:hidden font-bold mr-2">Eco-Friendly: </span>
                            {product.eco ? <FiCheckCircle className="inline text-green-600" size={24} /> : <FiXCircle className="inline text-red-500" size={24} />}
                        </div>
                    ))}
                </SpecRow>
            </div>
        </motion.div>
    );
};

export default ComparisonPage;