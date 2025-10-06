import React from 'react';
import RatingFilter from "./RatingFilter";
import BudgetFilter from "./BudgetFilter";

const FilterSidebar = ({categories = [], activeCategory, onSelectCategory, activeRating, onSelectRating, maxPrice , budget , onBudgetChange  }) => {
    return (
        <aside className="w-full md:w-1/4 lg:w-1/5 p-6 bg-serene-white rounded-lg shadow-lg">
            <h3 className="font-serif text-2xl text-charcoal mb-6 border-b-2 border-earth-tone/50 pb-2">
                Categories
            </h3>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            onClick={() => onSelectCategory(category)}
                            className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 text-lg font-sans capitalize ${
                                activeCategory === category
                                    ? 'bg-earth-tone text-serene-white shadow-inner'
                                    : 'text-charcoal/70 hover:bg-earth-tone/20 hover:text-charcoal'
                            }`}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="space-y-8">
                <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-4 border-b-2 border-earth-tone/50 pb-2">
                        Budget
                    </h3>
                    <BudgetFilter
                        maxPrice={maxPrice}
                        budget={budget}
                        onBudgetChange={onBudgetChange}
                    />
                </div>
                <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-4 border-b-2 border-earth-tone/50 pb-2">
                        Rating
                    </h3>
                    <RatingFilter activeRating={activeRating} onSelectRating={onSelectRating} />
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;