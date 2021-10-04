import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import NavBar from './NavBar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { act } from 'react-dom/test-utils';

const renderComponent = () => {
    const history = createMemoryHistory();
    const component = render(
        <Router history={history}>
            <NavBar />
        </Router>
    );

    return { ...component, history: history };
};

it('renders all nav items', async () => {
    const { getAllByTestId } = renderComponent();
    expect(getAllByTestId('nav-item').length).toBe(3);
});

it('highlights nav item based on location', async () => {
    const { getByText } = renderComponent();
    expect(getByText('User').parentElement).toHaveClass('current');
});

it('changes highlighted nav item based on location', async () => {
    const { getByText, history } = renderComponent();
    act(() => {
        history.push('/privacy');
    });
    expect(getByText('Privacy').parentElement).toHaveClass('current');
});
