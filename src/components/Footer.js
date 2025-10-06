import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-accent text-secondary pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-serif text-2xl font-bold mb-4">Soulful Living</h3>
                        <p className="text-serene-white/70 text-sm">
                            Curating mindful, sustainable pieces for a home that nurtures the soul.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products?category=sofa" className="text-serene-white/70 hover:text-white transition-colors">Sofas</Link></li>
                            <li><Link to="/products?category=chair" className="text-serene-white/70 hover:text-white transition-colors">Chairs</Link></li>
                            <li><Link to="/products?category=table" className="text-serene-white/70 hover:text-white transition-colors">Tables</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">About</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/sustainability" className="text-serene-white/70 hover:text-white transition-colors">Sustainability</Link></li>
                            <li><Link to="/contact" className="text-serene-white/70 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-4">Join Us</h4>
                        <p className="text-serene-white/70 text-sm mb-4">Get updates on new arrivals and eco-friendly tips.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-charcoal/80 border border-accent text-serene-white text-sm rounded-l-md p-2 w-full focus:outline-none focus:border-earth-tone"
                            />
                            <button className="bg-accent hover:bg-earth-tone-dark text-charcoal font-bold p-2 rounded-r-md transition-colors">
                                &rarr;
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-serene-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-serene-white/50 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Soulful Living. All Rights Reserved.</p>
                    <div className="flex space-x-4">
                        <a href="/" className="text-serene-white/70 hover:text-white transition-colors"><FaFacebook size={20} /></a>
                        <a href="/" className="text-serene-white/70 hover:text-white transition-colors"><FaInstagram size={20} /></a>
                        <a href="/" className="text-serene-white/70 hover:text-white transition-colors"><FaPinterest size={20} /></a>
                        <a href="/" className="text-serene-white/70 hover:text-white transition-colors"><FaTwitter size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;