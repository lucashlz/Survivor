import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginInput from './LoginInput';

describe('LoginInput', () => {

    it('renders the input field with placeholder', () => {
      const { getByPlaceholderText } = render(
        <LoginInput placeholder="Enter username" />
      );
      expect(getByPlaceholderText('Enter username')).toBeTruthy();
    });
  
    it('renders the input field with secure text entry', () => {
      const { getByPlaceholderText } = render(
        <LoginInput placeholder="Enter password" secureTextEntry={true} />
      );
      const input = getByPlaceholderText('Enter password');
      expect(input.props.secureTextEntry).toBe(true);
    });
  
    it('updates the value when typing', () => {
      const mockOnChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <LoginInput placeholder="Enter username" onChangeText={mockOnChangeText} />
      );
      const input = getByPlaceholderText('Enter username');
      fireEvent.changeText(input, 'JohnDoe');
      expect(mockOnChangeText).toHaveBeenCalledWith('JohnDoe');
    });
  
  });
  