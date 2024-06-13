import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders login component when no token is present', () => {
    localStorage.removeItem('token');
    render(<App/>);
    const signInButton = screen.getByRole('button', {name: /sign in/i});
    expect(signInButton).toBeInTheDocument();
});

test('renders shipments component when token is present', () => {
    localStorage.setItem('token', 'test-token');
    render(<App/>);
    const shipmentsElement = screen.getByText(/add new shipment/i);
    expect(shipmentsElement).toBeInTheDocument();
});

test('renders logout link when token is present', () => {
    localStorage.setItem('token', 'test-token');
    render(<App/>);
    const logoutElement = screen.getByText(/logout/i);
    expect(logoutElement).toBeInTheDocument();
});