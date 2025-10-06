import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import ComparisonPage from './pages/ComparisonPage';
import CustomizerHubPage from './pages/CustomizerHubPage';
import CustomizerPage from './pages/CustomizePage';
import { AnimationProvider } from './context/AnimationContext';
import { CartProvider } from './context/CartContext';
import { ComparisonProvider } from './context/ComparisonContext';

function App() {
    return (
        <Router>
            <AnimationProvider>
                <CartProvider>
                    <ComparisonProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/product/:id" element={<ProductDetailPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/compare" element={<ComparisonPage />} />
                                <Route path="/customize" element={<CustomizerHubPage />} />
                                <Route path="/customize/:productId" element={<CustomizerPage />} />

                            </Routes>
                        </Layout>
                    </ComparisonProvider>
                </CartProvider>
            </AnimationProvider>
        </Router>
    );
}

export default App;