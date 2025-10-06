import { useState } from 'react';

export const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
            }
        }
        if (name === 'cardNumber') {
            const cleanValue = value.replace(/\D/g, '');
            const chunks = cleanValue.match(/\d{1,4}/g) || [];
            formattedValue = chunks.join(' ').slice(0, 19);
        }

        setValues({
            ...values,
            [name]: formattedValue,
        });
    };

    const handleSubmit = (e, callback) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            callback();
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};