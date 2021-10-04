import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Done.css';
import { useSelector } from 'react-redux';

const Done = () => {
    const formValues = useSelector((state) => state.formValues);
    const preferences = useSelector((state) => state.preferences);
    console.log('Final payload', { userData: formValues, preferences: preferences });

    return (
        <div className="done-page" data-testid="done-page">
            <FontAwesomeIcon icon={faCheckCircle} size="5x" />
            <p>
                Please verify your email address, you should have received an email from us already!
            </p>
        </div>
    );
};

export default Done;
