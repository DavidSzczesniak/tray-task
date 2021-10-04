import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import User from './User';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

const store = createStore(rootReducer);
const renderComponent = () => {
    const history = createMemoryHistory();
    const component = render(
        <Provider store={store}>
            <Router history={history}>
                <User />
            </Router>
        </Provider>
    );

    return { ...component, history: history };
};

describe('render', () => {
    it('renders with expected input fields and button', async () => {
        const { getByTestId, getAllByTestId } = renderComponent();
        getByTestId('user-form');
        expect(getAllByTestId('form-field').length).toBe(4);
        getByTestId('custom-btn');
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
        const { queryByText, getByLabelText, getByText, getByTestId } = renderComponent();
        const input = getByLabelText(label);

        function clickSubmit() {
            fireEvent.click(getByTestId('custom-btn'));
        }

        // empty required field should display error
        clickSubmit();
        getByText(`${label} is required`);
        expect(input).toHaveClass('invalid-input');

        if (invalidError) {
            // field with invalid value should display new error
            fireEvent.change(input, { target: { value: 'test' } });
            clickSubmit();
            getByText(invalidError);
        } else {
            invalidError = `${label} is required`;
        }

        // field with valid value should no longer display error
        fireEvent.change(getByLabelText(label), { target: { value: validInput } });
        clickSubmit();
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

it('stores form values in redux on successful submission', async () => {
    const { getByTestId, getByLabelText } = renderComponent();
    const mockName = 'David Szczesniak';
    const mockRole = 'Software Engineer';
    const mockEmail = 'david@test.com';
    const mockPassword = 'Password123';

    function changeFieldValue(field, value) {
        fireEvent.change(getByLabelText(field), { target: { value: value } });
    }

    // submit form
    changeFieldValue('Name', mockName);
    changeFieldValue('Role', mockRole);
    changeFieldValue('Email', mockEmail);
    changeFieldValue('Password', mockPassword);
    fireEvent.click(getByTestId('custom-btn'));

    // check values in redux
    const state = store.getState().formValues;
    expect(state.name).toBe(mockName);
    expect(state.role).toBe(mockRole);
    expect(state.email).toBe(mockEmail);
    expect(state.password).toBe(mockPassword);
});
