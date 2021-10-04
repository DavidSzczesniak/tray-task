import React from 'react';
import './Button.css';

const Button = ({ type = 'button', label, onClick }) => {
    return (
        <button
            type={type}
            className="custom-btn"
            onClick={() => onClick && onClick()}
            data-testid="custom-btn">
            {label}
        </button>
    );
};

export default Button;
