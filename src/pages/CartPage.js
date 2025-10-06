import React, { useContext, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import ShippingEstimator from '../components/cart/ShippingEstimator';
import PromoCode from '../components/cart/PromoCode';

const CartPage = () => {
    const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);

    const [shipping, setShipping] = useState({ price: 0, name: 'Free' });
    const [promoDiscount, setPromoDiscount] = useState(0);
    const hasEcoItems = useMemo(() => cart.some(item => item.eco), [cart]);

    const { subtotal, tax, discountAmount, total } = useMemo(() => {
        const sub = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = sub * promoDiscount;
        const subAfterDiscount = sub - discount;
        const taxRate = 0.08;
        const taxAmount = subAfterDiscount * taxRate;
        const totalAmount = subAfterDiscount + taxAmount + shipping.price;
        return {
            subtotal: sub,
            tax: taxAmount,
            discountAmount: discount,
            total: totalAmount,
        };
    }, [cart, shipping, promoDiscount]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
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
                <h1 className="font-serif text-5xl text-charcoal mb-4">Your Shopping Cart</h1>
            </div>

            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-charcoal">Your cart is empty.</h2>
                    <p className="text-charcoal/70 mt-2 mb-6">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                        to="/products"
                        className="bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {cart.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        variants={itemVariants}
                                        exit="exit"
                                        className="flex items-center gap-4 p-4 bg-serene-white rounded-lg shadow-md"
                                    >
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className="flex-grow">
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="font-bold text-lg text-charcoal hover:text-accent transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-charcoal/70">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>
                                        <div className="flex items-center border-2 border-earth-tone/50 rounded-md">
                                            <button
                                                onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="px-3 py-1 text-lg hover:bg-earth-tone/20"
                                                aria-label="Decrease quantity"
                                                disabled={item.quantity <= 1}
                                            >
                                                <FiMinus />
                                            </button>
                                            <span className="px-4 font-bold text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 text-lg hover:bg-earth-tone/20"
                                                aria-label="Increase quantity"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>
                                        <p className="font-bold text-lg w-24 text-right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-charcoal/50 hover:text-red-600 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-serene-white rounded-lg shadow-md">
                            <ShippingEstimator onShippingSelect={setShipping} />
                            <div>
                                <PromoCode onApplyPromo={setPromoDiscount} />
                                {hasEcoItems && promoDiscount === 0 && (
                                    <div className="mt-4 p-3 bg-sage-green/20 text-sage-green-dark rounded-md text-sm">
                                        ✨ You have eco-friendly items in your cart! Try code{" "}
                                        <span className="font-bold">ECO10</span> for a discount.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 lg:sticky lg:top-32">
                        <div className="bg-serene-white rounded-lg shadow-lg p-6">
                            <h2 className="font-serif text-2xl text-charcoal mb-4 border-b pb-2">
                                Order Summary
                            </h2>
                            <div className="space-y-3 font-sans">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <AnimatePresence>
                                    {discountAmount > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex justify-between text-green-600 overflow-hidden"
                                        >
                                            <span>Promo Discount</span>
                                            <span>- ${discountAmount.toFixed(2)}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>
                    {shipping.price > 0 ? `$${shipping.price.toFixed(2)}` : shipping.name}
                  </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Estimated Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                state={{
                                    summary: {
                                        subtotal,
                                        tax,
                                        discountAmount,
                                        shippingCost: shipping.price,
                                        total,
                                    }
                                }}
                            >
                                <button className="w-full mt-6 bg-forest-green text-serene-white font-bold py-3 px-6 rounded-md hover:bg-charcoal transition-colors transform hover:scale-105">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CartPage;
