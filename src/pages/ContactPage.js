import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '../hooks/useForm';
import { validateContactForm } from '../utils/formValidation';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const initialValues = { name: '', email: '', message: '' };
    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validateContactForm);
    const handleFormSubmit = () => {

        console.log('Form Submitted:', values);
        setIsSubmitted(true);
    };
    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="container mx-auto px-6 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]"
            >
                <h1 className="font-serif text-4xl text-charcoal mb-4">Thank You!</h1>
                <p className="text-charcoal/70 mb-8 max-w-md">Your message has been sent. We'll get back to you as soon as possible.</p>
                <Link to="/" className="bg-forest-green text-serene-white font-bold py-3 px-6 rounded-md hover:bg-charcoal transition-colors">
                    Back to Home
                </Link>
            </motion.div>
        );
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-16">
                <h1 className="font-serif text-5xl text-charcoal mb-4">Connect With Us</h1>
                <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
                    We'd love to hear from you. Whether you have a question about our products, our mission, or anything else, our team is ready to answer all your questions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="bg-serene-white p-8 rounded-lg shadow-lg">
                    <h2 className="font-serif text-3xl text-charcoal mb-6">Our Studio</h2>
                    <div className="space-y-6">
                        <InfoItem icon={<FiMapPin />} title="Address" text="123 Artisan Lane, Asheville, NC 28801" />
                        <InfoItem icon={<FiMail />} title="Email" text="hello@soulfulliving.com" />
                        <InfoItem icon={<FiPhone />} title="Phone" text="(555) 123-4567" />
                    </div>
                    <div className="mt-8 pt-6 border-t border-earth-tone/30">
                        <h3 className="font-semibold text-charcoal mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-charcoal/60 hover:text-accent transition-colors"
                                aria-label="Instagram"
                            >
                                <FiInstagram size={24} />
                            </a>
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-charcoal/60 hover:text-accent transition-colors"
                                aria-label="Facebook"
                            >
                                <FiFacebook size={24} />
                            </a>
                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-charcoal/60 hover:text-accent transition-colors"
                                aria-label="Twitter"
                            >
                                <FiTwitter size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="bg-serene-white p-8 rounded-lg shadow-lg">
                    <h2 className="font-serif text-3xl text-charcoal mb-6">Send a Message</h2>
                    <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)} noValidate className="space-y-6">
                        <InputField label="Your Name" name="name" type="text" value={values.name} onChange={handleChange} error={errors.name} />
                        <InputField label="Your Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-charcoal/80 mb-1">Message</label>
                            <textarea
                                id="message" name="message" rows="5"
                                value={values.message} onChange={handleChange}
                                className={`w-full px-4 py-2 bg-warm-ivory/50 border-2 rounded-md focus:outline-none focus:ring-1 transition-all ${
                                    errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-earth-tone/50 focus:border-accent focus:ring-accent'
                                }`}
                            ></textarea>
                            {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-forest-green text-serene-white font-bold py-3 px-6 rounded-md hover:bg-charcoal transition-colors transform hover:scale-105">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-20">
                <div className="rounded-lg shadow-xl overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103886.1316503487!2d-82.62222039999999!3d35.59210725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8859f4d3c718706d%3A0x2551a43e86a53a2!2sAsheville%2C%20NC!5e0!3m2!1sen!2sus!4v1671234567890!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="filter grayscale-[80%] contrast-[1.2] opacity-90"
                        title="Our Location"
                    ></iframe>
                </div>
            </div>
        </motion.div>
    );
};

const InfoItem = ({ icon, title, text }) => (
    <div className="flex items-start gap-4">
        <div className="text-accent text-2xl mt-1">{icon}</div>
        <div>
            <h3 className="font-bold text-charcoal">{title}</h3>
            <p className="text-charcoal/80">{text}</p>
        </div>
    </div>
);

const InputField = ({ label, name, type, value, onChange, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-bold text-charcoal/80 mb-1">{label}</label>
        <input
            id={name} name={name} type={type} value={value} onChange={onChange}
            className={`w-full px-4 py-2 bg-warm-ivory/50 border-2 rounded-md focus:outline-none focus:ring-1 transition-all ${
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-earth-tone/50 focus:border-accent focus:ring-accent'
            }`}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
);

export default ContactPage;