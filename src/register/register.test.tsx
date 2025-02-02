import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './register';

describe('Register Component', () => {
  test('renders register form with email and password inputs and a button', () => {
    render(<Register />);
    
    // Check for the heading
    expect(screen.getByText('Register')).toBeInTheDocument();
    
    // Check for form labels and inputs
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    
    // Check for the submit button
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('updates form fields on change', () => {
    render(<Register />);
    
    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('mypassword');
  });

  test('submits form with the correct values', () => {
    // Spy on console.log to verify submission
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Register />);

    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Register form data:', {
      email: 'test@example.com',
      password: 'mypassword',
    });
    consoleSpy.mockRestore();
  });
});
