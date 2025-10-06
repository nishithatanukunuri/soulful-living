export const validateCheckoutForm = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.name) {
        errors.name = 'Full name is required';
    }
    if (!values.address) {
        errors.address = 'Street address is required';
    }
    if (!values.city) {
        errors.city = 'City is required';
    }
    if (!values.zip) {
        errors.zip = 'ZIP / Postal code is required';
    } else if (!/^\d{5}$/.test(values.zip)) {
        errors.zip = 'ZIP code is invalid';
    }
    if (!values.cardName) {
        errors.cardName = 'Name on card is required';
    }
    if (!values.cardNumber) {
        errors.cardNumber = 'Card number is required';
    } else {
        const cleanCardNumber = values.cardNumber.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cleanCardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
    }
    if (!values.expiry) {
        errors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) {
        errors.expiry = 'Format must be MM/YY';
    } else {
        const [month, year] = values.expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.expiry = 'Card has expired';
        }
    }

    if (!values.cvc) {
        errors.cvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(values.cvc)) {
        errors.cvc = 'CVC must be 3 or 4 digits';
    }

    return errors;
};

export const validateContactForm = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Your name is required';
    }

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.message) {
        errors.message = 'A message is required';
    } else if (values.message.length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }

    return errors;
};