import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const [orders, setOrders] = useLocalStorage('orders', []);

    const clearCart = () => {
        setCart([]);
    };

    const addOrder = (order) => {
        setOrders(prevOrders => [order, ...prevOrders]);
    };

    const addToCart = (productToAdd) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + productToAdd.quantity }
                        : item
                );
            } else {
                return [...prevCart, productToAdd];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart((prevCart) =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const addToWishlist = (product) => {
        if (!wishlist.find(item => item.id === product.id)) {
            setWishlist((prevWishlist) => [...prevWishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, wishlist,orders, addToCart, removeFromCart, updateCartQuantity, addToWishlist, removeFromWishlist,clearCart,addOrder}}>
            {children}
        </CartContext.Provider>
    );
};