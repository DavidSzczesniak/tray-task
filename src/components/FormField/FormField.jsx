import React from 'react';
import './FormField.css';
import { useSelector } from 'react-redux';

const FormField = ({ type = 'text', label, required, values, handleChange }) => {
    const id = label.toLowerCase();
    const error = useSelector((state) => state.errors)?.[id];

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
                className={error ? 'invalid-input' : ''}
            />
            {error && <p className="invalid-input-msg">{error}</p>}
        </div>
    );
};

export default FormField;
