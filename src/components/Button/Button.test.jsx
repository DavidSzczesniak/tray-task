import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Button from './Button';

const store = createStore(rootReducer);
const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
const mockCallback = jest.fn();

const renderComponent = ({ type, label, onClick }) => {
    return render(<Button type={type} label={label} onClick={onClick} />, {
        wrapper: Wrapper,
    });
};

it('renders with minimal props', async () => {
    const { getByTestId } = renderComponent({ label: 'Click me' });
    getByTestId('custom-btn');
});

it('renders with a different type', async () => {
    const { getByTestId } = renderComponent({ type: 'submit' });
    expect(getByTestId('custom-btn').getAttribute('type')).toBe('submit');
});

it('runs callback fn on change', async () => {
    const { getByTestId } = renderComponent({ onClick: mockCallback });
    fireEvent.click(getByTestId('custom-btn'));
    expect(mockCallback).toHaveBeenCalled();
});
