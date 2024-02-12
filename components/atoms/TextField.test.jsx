import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextField from './TextField';

describe('TextField', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<TextField label="Username" />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
  });

  it('should display the correct placeholder', () => {
    const { getByPlaceholderText } = render(<TextField label="Password" />);
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should call onChange when text changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField label="Username" onChange={mockOnChange} />
    );
    const input = getByPlaceholderText('Username');

    fireEvent.changeText(input, 'new text');

    expect(mockOnChange).toHaveBeenCalledWith('new text');
  });
});
