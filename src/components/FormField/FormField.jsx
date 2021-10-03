import React from 'react';
import './FormField.css';
import { useSelector } from 'react-redux';

const FormField = ({ type = 'text', label, required, values, handleChange }) => {
    const id = label.toLowerCase();
    const errors = useSelector((state) => state.errors);

    return (
        <div className="form-field">
            <label htmlFor={id}>
                {label}
                {required && <span className="required-symbol">*</span>}
            </label>
            <input type={type} name={id} value={values[id]} onChange={handleChange} />
            {errors?.[id] && <p className="invalid-input-msg">{errors[id]}</p>}
        </div>
    );
};

export default FormField;
