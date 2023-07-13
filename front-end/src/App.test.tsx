import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Profit tool text', () => {
  render(<App />);
  const linkElement = screen.getByText(/WOOM Backoffice/i);
  expect(linkElement).toBeInTheDocument();
});
