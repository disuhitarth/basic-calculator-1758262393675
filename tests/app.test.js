```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../src/App';

// Mock Material-UI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      background: { default: '#fff' }
    }
  })
}));

describe('Calculator App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders calculator display', () => {
    const display = screen.getByTestId('calculator-display');
    expect(display).toBeInTheDocument();
    expect(display).toHaveTextContent('0');
  });

  test('performs basic addition', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '1'));
    fireEvent.click(buttons.find(b => b.textContent === '+'));
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('3');
  });

  test('performs basic subtraction', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '5'));
    fireEvent.click(buttons.find(b => b.textContent === '-'));
    fireEvent.click(buttons.find(b => b.textContent === '3'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('2');
  });

  test('performs basic multiplication', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '4'));
    fireEvent.click(buttons.find(b => b.textContent === '×'));
    fireEvent.click(buttons.find(b => b.textContent === '3'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('12');
  });

  test('performs basic division', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '6'));
    fireEvent.click(buttons.find(b => b.textContent === '÷'));
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('3');
  });

  test('handles decimal operations', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '1'));
    fireEvent.click(buttons.find(b => b.textContent === '.'));
    fireEvent.click(buttons.find(b => b.textContent === '5'));
    fireEvent.click(buttons.find(b => b.textContent === '+'));
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '.'));
    fireEvent.click(buttons.find(b => b.textContent === '5'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('4');
  });

  test('clears display with C button', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '1'));
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '3'));
    fireEvent.click(buttons.find(b => b.textContent === 'C'));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
  });

  test('handles keyboard input', () => {
    act(() => {
      userEvent.keyboard('123+456=');
    });
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('579');
  });

  test('shows error for division by zero', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '5'));
    fireEvent.click(buttons.find(b => b.textContent === '÷'));
    fireEvent.click(buttons.find(b => b.textContent === '0'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('Error');
  });

  test('maintains operation history', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '+'));
    fireEvent.click(buttons.find(b => b.textContent === '3'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    const historyList = screen.getByTestId('history-list');
    expect(historyList).toBeInTheDocument();
    expect(historyList).toHaveTextContent('2 + 3 = 5');
  });

  test('handles multiple operations', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons.find(b => b.textContent === '2'));
    fireEvent.click(buttons.find(b => b.textContent === '+'));
    fireEvent.click(buttons.find(b => b.textContent === '3'));
    fireEvent.click(buttons.find(b => b.textContent === '×'));
    fireEvent.click(buttons.find(b => b.textContent === '4'));
    fireEvent.click(buttons.find(b => b.textContent === '='));
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('20');
  });
});
```