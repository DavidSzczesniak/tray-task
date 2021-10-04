import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Done from './Done';

const store = createStore(rootReducer);

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <Done />
        </Provider>
    );
};

it('renders the component', async () => {
    const { getByTestId } = renderComponent();
    getByTestId('done-page');
});
