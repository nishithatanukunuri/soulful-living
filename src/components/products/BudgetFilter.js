import React from 'react';

const BudgetFilter = ({ maxPrice, budget, onBudgetChange }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="budget" className="font-sans text-lg text-charcoal">
                    Max Price:
                </label>
                <span className="font-bold text-charcoal bg-earth-tone/30 px-3 py-1 rounded-md">
          ${budget}
        </span>
            </div>
            <input
                type="range"
                id="budget"
                min="0"
                max={maxPrice}
                value={budget}
                onChange={onBudgetChange}
                className="w-full h-2 bg-earth-tone/30 rounded-lg appearance-none cursor-pointer accent-earth-tone-dark"
            />
            <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                <span>$0</span>
                <span>${maxPrice}</span>
            </div>
        </div>
    );
};

export default BudgetFilter;