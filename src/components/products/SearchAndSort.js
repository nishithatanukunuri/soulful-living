import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchAndSort = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-serene-white rounded-lg shadow-lg">
            {/* Search Input */}
            <div className="relative flex-grow">
                <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-charcoal/50" />
                <input
                    type="text"
                    placeholder="Search for furniture..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-full pl-12 pr-4 py-3 bg-warm-ivory/50 border-2 border-earth-tone/50 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="sort" className="font-semibold text-charcoal/80 whitespace-nowrap">Sort by:</label>
                <select
                    id="sort"
                    value={sortBy}
                    onChange={onSortChange}
                    className="..."
                >
                    <option value="popularity-desc">Popularity: High to Low</option>
                    <option value="popularity-asc">Popularity: Low to High</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default SearchAndSort;