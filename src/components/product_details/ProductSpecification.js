import React from 'react';

const ProductSpecifications = ({ product }) => {
    return (
        <div className="space-y-8">
            {/* Main Description */}
            <div>
                <h4 className="font-serif text-xl text-charcoal mb-4">About</h4>
                <p>{product.description}</p>
            </div>
            <div>
                <h4 className="font-serif text-xl text-charcoal mb-4">Specifications</h4>
                <div className="bg-serene-white/50 rounded-lg border border-earth-tone/30">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                        <div
                            key={key}
                            className={`flex justify-between p-4 ${
                                index < Object.keys(product.specifications).length - 1 ? 'border-b border-earth-tone/30' : ''
                            }`}
                        >
                            <span className="font-bold text-charcoal">{key}</span>
                            <span className="text-charcoal/80 text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;