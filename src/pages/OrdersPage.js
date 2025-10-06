import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const OrdersPage = () => {
    const { orders } = useContext(CartContext);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Your Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-charcoal">You have no past orders.</h2>
                    <p className="text-charcoal/70 mt-2 mb-6">Start shopping to build your soulful sanctuary.</p>
                    <Link to="/products" className="bg-earth-tone text-serene-white font-bold py-3 px-6 rounded-md hover:bg-earth-tone-dark transition-colors">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-8">
                    {orders.map(order => (
                        <div key={order.id} className="bg-serene-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order.id}</p>
                                    <p className="text-sm text-charcoal/60">Placed on {order.date}</p>
                                </div>
                                <p className="font-serif text-xl font-bold">${order.total.toFixed(2)}</p>
                            </div>
                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 text-sm">
                                        <img src={`${process.env.PUBLIC_URL}/${item.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-charcoal/70">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default OrdersPage;