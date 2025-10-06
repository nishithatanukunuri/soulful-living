import React, { useState, useMemo,useEffect} from 'react';
import { motion } from 'framer-motion';
import allProducts from '../data/products.json';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import SearchAndSort from '../components/products/SearchAndSort';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryFromURL = searchParams.get('category');
    const maxPrice = useMemo(() => Math.ceil(Math.max(...allProducts.map(p => p.price))), []);
    const [filters, setFilters] = useState({
        category: categoryFromURL || 'all',
        searchTerm: '',
        rating: 0,
        budget: maxPrice,
    });

    useEffect(() => {
        const categoryFromURL = searchParams.get('category');
        if (categoryFromURL) {
            setFilters(prev => ({ ...prev, category: categoryFromURL }));
        }
    }, [searchParams]);

    const [sortBy, setSortBy] = useState('popularity-desc');
    const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);
    const categories = useMemo(() => ['all', ...new Set(allProducts.map(p => p.category))], []);
    const filteredAndSortedProducts = useMemo(() => {
        let processedProducts = [...allProducts];
        processedProducts = processedProducts.filter(product => {
            const budgetMatch = product.price <= filters.budget;
            const searchMatch = debouncedSearchTerm
                ? product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                : true;
            const categoryMatch = filters.category !== 'all'
                ? product.category === filters.category
                : true;
            const ratingMatch = filters.rating > 0
                ? product.rating >= filters.rating
                : true;

            return budgetMatch && searchMatch && categoryMatch && ratingMatch;
        });
        switch (sortBy) {
            case 'price-asc':
                processedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                processedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popularity-asc':
                processedProducts.sort((a, b) => a.popularity - b.popularity);
                break;
            case 'popularity-desc':
            default:
                processedProducts.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        return processedProducts;
    }, [debouncedSearchTerm, filters, sortBy]);

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleCategoryChange = (category) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const handleRatingChange = (rating) => {
        setFilters(prev => ({ ...prev, rating }));
    };

    const handleBudgetChange = (e) => {
        setFilters(prev => ({ ...prev, budget: Number(e.target.value) }));
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Our Collection</h1>
                <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
                    Browse our curated selection of sustainable, mindfully crafted furniture designed to bring harmony to your home.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <FilterSidebar
                    categories={categories}
                    activeCategory={filters.category}
                    onSelectCategory={handleCategoryChange}
                    activeRating={filters.rating}
                    onSelectRating={handleRatingChange}
                    maxPrice={maxPrice}
                    budget={filters.budget}
                    onBudgetChange={handleBudgetChange}
                />

                <main className="w-full">
                    <SearchAndSort
                        searchTerm={filters.searchTerm}
                        onSearchChange={handleSearchChange}
                        sortBy={sortBy}
                        onSortChange={handleSortChange}
                    />
                    {filteredAndSortedProducts.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredAndSortedProducts.map(product => (
                                <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-charcoal">No products found</h2>
                            <p className="text-charcoal/70 mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </main>
            </div>
        </motion.div>
    );
};

export default ProductsPage;