import React from 'react';
import { render } from '@testing-library/react-native';
import KeyValueField from './KeyValueField';

describe('KeyValueField', () => {
  it('renders label and value correctly', () => {
    const { getByText } = render(
      <KeyValueField label="Name" value="John" color="red" />
    );

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
  });

  it('applies custom color to value', () => {
    const { getByText } = render(
      <KeyValueField label="Age" value="30" color="blue" />
    );

    expect(getByText('30')).toHaveStyle({ color: 'blue' });
  });
});
