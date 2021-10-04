import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import User from './User';

const store = createStore(rootReducer);
const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

const renderComponent = () => {
    return render(<User />, {
        wrapper: Wrapper,
    });
};

describe('render', () => {
    it('renders with expected input fields and button', async () => {
        const { getByTestId, getAllByTestId, getByRole } = renderComponent();
        getByTestId('user-form');
        expect(getAllByTestId('form-field').length).toBe(4);
        getByRole('button');
    });
});

describe('validation', () => {
    /**
     * Tests validation of a single input field based on parameters passed
     * @param {string} label - field label
     * @param {string} invalidError - error expected when submitting with an invalid value
     * @param {string} validInput - input that matches the field's validation rules
     */
    function validateField(label, invalidError, validInput) {
        const { queryByText, getByRole, getByLabelText, getByText } = renderComponent();
        const input = getByLabelText(label);

        // empty required field should display error
        fireEvent.click(getByRole('button'));
        getByText(`${label} is required`);
        expect(input).toHaveClass('invalid-input');

        if (invalidError) {
            // field with invalid value should display new error
            fireEvent.change(input, { target: { value: 'test' } });
            fireEvent.click(getByRole('button'));
            getByText(invalidError);
        } else {
            invalidError = `${label} is required`;
        }

        // field with valid value should no longer display error
        fireEvent.change(getByLabelText(label), { target: { value: validInput } });
        fireEvent.click(getByRole('button'));
        expect(queryByText(invalidError)).not.toBeInTheDocument();
        expect(input).not.toHaveClass('invalid-input');
    }

    it('validates Name field', async () => {
        validateField('Name', null, 'Thomas Smith');
    });

    it('validates Email field', async () => {
        validateField('Email', 'Email address is invalid', 'david@test.com');
    });

    it('validates Password field', async () => {
        validateField(
            'Password',
            'Password needs to be more than 9 characters long, include at least one number, one uppercase and one lowercase letter',
            'Password123'
        );
    });
});
