import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Privacy from './Privacy';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

const store = createStore(rootReducer);
const renderComponent = () => {
    const history = createMemoryHistory();
    const component = render(
        <Provider store={store}>
            <Router history={history}>
                <Privacy />
            </Router>
        </Provider>
    );

    return { ...component, history: history };
};

it('renders the component', async () => {
    const { getByTestId } = renderComponent();
    getByTestId('user-preferences');
    getByTestId('custom-btn');
});

it('routes to Done page on click of Next button', async () => {
    const { getByTestId, history } = renderComponent();
    fireEvent.click(getByTestId('custom-btn'));
    expect(history.location.pathname).toBe('/done');
});

it('first preference is stored in redux', async () => {
    const { getAllByTestId, getByTestId } = renderComponent();
    fireEvent.click(getAllByTestId('form-checkbox')[0]);
    fireEvent.click(getByTestId('custom-btn'));
    expect(store.getState().preferences.mainProduct).toBe(true);
});

it('second preference is stored in redux', async () => {
    const { getAllByTestId, getByTestId } = renderComponent();
    fireEvent.click(getAllByTestId('form-checkbox')[1]);
    fireEvent.click(getByTestId('custom-btn'));
    expect(store.getState().preferences.other).toBe(true);
});
