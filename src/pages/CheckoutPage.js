import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '../hooks/useForm';
import { validateCheckoutForm } from '../utils/formValidation';
import { CartContext } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
    const { cart,addOrder,clearCart} = useContext(CartContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation();

    const handleOrderSubmit = () => {
        const newOrder = {
            id: new Date().getTime(),
            date: new Date().toLocaleDateString(),
            items: cart,
            total: summary.total,
        };
        addOrder(newOrder);
        clearCart();

        setIsSubmitted(true);
    };
    const summary = location.state?.summary || {
        subtotal: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        tax: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.08,
        discountAmount: 0,
        shippingCost: 0,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.08,
    };

    const initialValues = {
        email: '', name: '', address: '', city: '', zip: '',
        cardName: '', cardNumber: '', expiry: '', cvc: '',
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validateCheckoutForm);
    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="container mx-auto px-6 py-20 text-center"
            >
                <h1 className="font-serif text-4xl text-charcoal mb-4">Thank You for Your Order!</h1>
                <p className="text-charcoal/70 mb-8">A confirmation email has been sent. Your soulful new pieces are on their way.</p>
                <Link
                    to="/orders"
                    className="bg-forest-green text-serene-white font-bold py-3 px-6 rounded-md hover:bg-charcoal transition-colors"
                >
                    Your Orders
                </Link>
            </motion.div>
        );
    }
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Checkout</h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e, handleOrderSubmit)} noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-2 bg-serene-white p-8 rounded-lg shadow-lg space-y-8">
                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4 border-b pb-2">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Email Address" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
                                <InputField label="Full Name" name="name" type="text" value={values.name} onChange={handleChange} error={errors.name} />
                            </div>
                        </section>
                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4 border-b pb-2">Shipping Address</h2>
                            <div className="space-y-4">
                                <InputField label="Street Address" name="address" type="text" value={values.address} onChange={handleChange} error={errors.address} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="City" name="city" type="text" value={values.city} onChange={handleChange} error={errors.city} />
                                    <InputField label="ZIP / Postal Code" name="zip" type="text" value={values.zip} onChange={handleChange} error={errors.zip} />
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4 border-b pb-2">Payment Details</h2>
                            <div className="space-y-4">
                                <InputField label="Name on Card" name="cardName" type="text" value={values.cardName} onChange={handleChange} error={errors.cardName} />
                                <InputField label="Card Number" name="cardNumber" type="text" value={values.cardNumber} onChange={handleChange} error={errors.cardNumber} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Expiry Date (MM/YY)" name="expiry" type="text" value={values.expiry} onChange={handleChange} error={errors.expiry} />
                                    <InputField label="CVC" name="cvc" type="password" value={values.cvc} onChange={handleChange} error={errors.cvc} />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="bg-serene-white p-6 rounded-lg shadow-lg space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-charcoal/80">Subtotal</span>
                            <span>${summary.subtotal.toFixed(2)}</span>
                        </div>
                        {summary.discountAmount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span className="text-charcoal/80">Promo Discount</span>
                                <span>-${summary.discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-charcoal/80">Shipping</span>
                            <span>{summary.shippingCost > 0 ? `$${summary.shippingCost.toFixed(2)}` : 'FREE'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-charcoal/80">Tax</span>
                            <span>${summary.tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg border-t border-earth-tone/30 pt-3">
                            <span>Total</span>
                            <span>${summary.total.toFixed(2)}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-forest-green text-serene-white font-bold py-3 px-6 rounded-md hover:bg-charcoal transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

const InputField = ({ label, name, type, value, onChange, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-bold text-charcoal/80 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 bg-warm-ivory/50 border-2 rounded-md focus:outline-none focus:ring-1 transition-all ${
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-earth-tone/50 focus:border-accent focus:ring-accent'
            }`}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
);

export default CheckoutPage;
