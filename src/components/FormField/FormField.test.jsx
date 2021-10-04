import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import FormField from './FormField';

const store = createStore(rootReducer);
const mockCallback = jest.fn();

const renderComponent = ({ type, label = 'Name', required }) => {
    return render(
        <Provider store={store}>
            <FormField
                type={type}
                label={label}
                required={required}
                values={{ name: '' }}
                handleChange={mockCallback}
            />
        </Provider>
    );
};

it('renders with minimal props', async () => {
    const { getByTestId } = renderComponent({});
    getByTestId('form-field');
});

it('renders with a different type', async () => {
    const { getByTestId } = renderComponent({ type: 'email' });
    expect(getByTestId('form-input').getAttribute('type')).toBe('email');
});

it('renders with a different label', async () => {
    const { getByLabelText } = renderComponent({ label: 'Email' });
    getByLabelText('Email');
});

it('renders as a mandatory field', async () => {
    const { getByTestId } = renderComponent({ required: true });
    expect(getByTestId('required-symbol')).toBeInTheDocument();
});

it('runs callback fn on change', async () => {
    const { getByTestId } = renderComponent({});
    const inputField = getByTestId('form-input');
    fireEvent.change(inputField, { target: { value: 'Thomas' } });
    expect(mockCallback).toHaveBeenCalled();
});
