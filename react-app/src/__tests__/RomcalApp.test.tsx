import React from 'react';

import { render, screen } from '@testing-library/react';
import RomcalApp from '../RomcalApp';

import '@testing-library/jest-dom'

test('renders romcal headline', () => {
  render(<RomcalApp />);
  const textElement = screen.getByText(/A JavaScript library/i);
  expect(textElement).toBeInTheDocument();
});
