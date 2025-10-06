import React, { useState } from 'react';
import { FiTruck } from 'react-icons/fi';

const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 0, delivery: '5-7 days' },
    { id: 'express', name: 'Express Shipping', price: 24.99, delivery: '2-3 days' },
    { id: 'whiteglove', name: 'White Glove Delivery', price: 99.99, delivery: 'Scheduled' },
];

const ShippingEstimator = ({ onShippingSelect }) => {
    const [zipCode, setZipCode] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);

    const handleCalculate = () => {
        if (/^\d{5}$/.test(zipCode)) {
            setIsCalculated(true);
            onShippingSelect(shippingOptions[0]);
        }
    };
    return (
        <div className="mt-6">
            <h3 className="font-serif text-xl text-charcoal mb-4">Estimate Shipping</h3>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter Zip Code"
                    maxLength="5"
                    className="flex-grow px-4 py-2 bg-warm-ivory/50 border-2 border-earth-tone/50 rounded-md focus:outline-none focus:border-accent"
                />
                <button onClick={handleCalculate} className="bg-earth-tone text-serene-white font-bold py-2 px-4 rounded-md hover:bg-earth-tone-dark">
                    Estimate
                </button>
            </div>

            {isCalculated && (
                <div className="space-y-3">
                    {shippingOptions.map(option => (
                        <label key={option.id} className="flex items-center gap-4 p-3 bg-sage-green/10 rounded-md border-2 border-transparent has-[:checked]:border-sage-green has-[:checked]:bg-sage-green/20 cursor-pointer">
                            <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                onChange={() => onShippingSelect(option)}
                                className="accent-forest-green"
                            />
                            <FiTruck className="text-xl" />
                            <div className="flex-grow">
                                <p className="font-bold">{option.name}</p>
                                <p className="text-sm text-charcoal/70">{option.delivery}</p>
                            </div>
                            <p className="font-bold">${option.price.toFixed(2)}</p>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShippingEstimator;