import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiSearch, FiMenu, FiX,FiPackage} from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import TopBar from './TopBar';
import Logo from './Logo';
import { CartContext } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';

const leavesData = [
    { x: '10%', y: '-5px', rotate: -25, delay: 0.2 },
    { x: '25%', y: '5px', rotate: 15, delay: 0.4 },
    { x: '45%', y: '-10px', rotate: -10, delay: 0.6 },
    { x: '65%', y: '8px', rotate: 25, delay: 0.8 },
    { x: '88%', y: '0px', rotate: -5, delay: 1.0 },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart, wishlist } = useContext(CartContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products' },
        { name: 'Customize', path: '/customize' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'Contact', path: '/contact' },

    ];

    const mobileNavLinks = [
        ...navLinks.slice(0, 2),
        { name: 'Your Orders', path: '/orders' },
        ...navLinks.slice(2)
    ];

    const activeLinkStyle = {
        color: '#2E2D2B',
        fontWeight: '700',
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled || isMenuOpen ? 'bg-warm-ivory/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
                }`}
            >
                <AnimatePresence>
                    {!isScrolled && <TopBar />}
                </AnimatePresence>
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
                    <div className="absolute top-full left-0 w-full h-12 pointer-events-none -translate-y-4">
                        <motion.svg
                            viewBox="0 0 1440 40"
                            className="w-full h-full overflow-visible"
                            initial="hidden"
                            animate={isScrolled ? "hidden" : "visible"}
                        >
                            <motion.path
                                d="M-5,20 C200,0 350,40 550,20 S850,-10 1050,20 S1300,40 1445,20"
                                fill="none"
                                stroke="#3A4A3A"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                variants={{
                                    hidden: { pathLength: 0, opacity: 0 },
                                    visible: { pathLength: 1, opacity: 1 }
                                }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                            />
                            <motion.path
                                d="M-5,25 C150,45 300,5 500,25 S750,45 950,25 S1250,5 1445,25"
                                fill="none"
                                stroke="#A3B18A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                variants={{
                                    hidden: { pathLength: 0, opacity: 0 },
                                    visible: { pathLength: 1, opacity: 1 }
                                }}
                                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
                            />
                        </motion.svg>
                        {leavesData.map((leaf) => (
                            <motion.div
                                key={leaf.x}
                                className="absolute"
                                style={{ left: leaf.x, top: leaf.y, rotate: leaf.rotate }}
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: { scale: 1, opacity: 1 }
                                }}
                                transition={{ duration: 0.5, delay: isScrolled ? 0 : leaf.delay }}
                            >
                                <FaLeaf className="text-forest-green text-lg" />
                            </motion.div>
                        ))}
                    </div>
                    <Link to="/"><Logo /></Link>
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                                className="font-sans text-lg text-charcoal/70 hover:text-charcoal transition-colors relative group px-4 py-2"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <div className="absolute inset-0 bg-earth-tone/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="flex items-center space-x-5">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:block text-charcoal hover:text-accent transition-colors"
                            aria-label="Open search"
                        >
                            <FiSearch size={22} />
                        </button>
                        <Link to="/orders" className="relative text-charcoal hover:text-accent transition-colors" aria-label="Your Orders">
                            <FiPackage size={22} />
                        </Link>
                        <Link to="/wishlist" className="relative text-charcoal hover:text-accent transition-colors">
                            <FiHeart size={22} />
                            <AnimatePresence>
                                {wishlist.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                        className="absolute -top-2 -right-2 bg-sage-green text-serene-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-warm-ivory"
                                    >
                                        {wishlist.length}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                        <Link to="/cart" className="relative text-charcoal hover:text-accent transition-colors">
                            <FiShoppingBag size={22} />
                            <AnimatePresence>
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                        className="absolute -top-2 -right-2 bg-sage-green text-serene-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-warm-ivory"
                                    >
                                        {cart.length}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden text-charcoal hover:text-accent transition-colors"
                            aria-label="Open menu"
                        >
                            <FiMenu size={24} />
                        </button>
                    </div>

                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-earth-tone/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isScrolled ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'center' }}
                    />
                </nav>
            </header>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[99]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-warm-ivoryshadow-2xl p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="font-serif text-xl font-bold text-charcoal">Menu</h2>
                                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                                    <FiX size={24} className="text-charcoal" />
                                </button>
                            </div>
                            <div className="flex flex-col space-y-6">
                                {mobileNavLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-sans text-2xl text-charcoal/80 hover:text-charcoal transition-colors"
                                        style={({ isActive }) => (isActive ? { color: '#2E2D2B' } : undefined)}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;