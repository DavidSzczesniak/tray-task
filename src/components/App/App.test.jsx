import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import App from './App';

const store = createStore(rootReducer);
const renderComponent = () => {
    const history = createMemoryHistory();
    const component = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    return { ...component, history: history };
};

it('renders User page', async () => {
    const { getByTestId } = renderComponent();
    // check page is User
    getByTestId('user-form');
});

describe('navigation', () => {
    it('prevents navigation if field values are empty', async () => {
        const { getByTestId } = renderComponent();
        fireEvent.click(getByTestId('custom-btn'));
        // check page is still User
        getByTestId('user-form');
    });

    it('navigates to Privacy page on successful submission', async () => {
        const { getByTestId, getByLabelText } = renderComponent();
        function changeFieldValue(field, value) {
            fireEvent.change(getByLabelText(field), { target: { value: value } });
        }

        changeFieldValue('Name', 'Thomas Frank');
        changeFieldValue('Email', 'thomas@test.com');
        changeFieldValue('Password', 'Password123');
        // submit and check page is Privacy
        fireEvent.click(getByTestId('custom-btn'));
        getByTestId('user-preferences');
    });

    it('navigates to Done page', async () => {
        const { getByTestId } = renderComponent();
        fireEvent.click(getByTestId('custom-btn'));
        getByTestId('done-page');
    });
});
