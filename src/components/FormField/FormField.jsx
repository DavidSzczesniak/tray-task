import React from 'react';
import './FormField.css';
import { useSelector } from 'react-redux';

const FormField = ({ type = 'text', label, required, values, handleChange }) => {
    const id = label.toLowerCase();
    const errors = useSelector((state) => state.errors);

    return (
        <div className="form-field" data-testid="form-field">
            <label htmlFor={id}>{label}</label>
            {required && (
                <span className="required-symbol" data-testid="required-symbol">
                    *
                </span>
            )}
            <input
                type={type}
                id={id}
                value={values[id]}
                onChange={handleChange}
                data-testid="form-input"
            />
            {errors?.[id] && <p className="invalid-input-msg">{errors[id]}</p>}
        </div>
    );
};

export default FormField;
