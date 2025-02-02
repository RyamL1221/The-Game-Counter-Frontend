import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// --- Mock useNavigate ---
// Note: The mock must be set up before the component that uses it is imported.
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

import Home from './home';

describe('Home Component', () => {
  beforeEach(() => {
    // Clear any previous calls to the navigate mock.
    mockedNavigate.mockReset();

    // Render the Home component wrapped in a MemoryRouter.
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  test('renders navbar with logo and buttons', () => {
    // Check for the logo text in the navbar.
    expect(screen.getByText('The Game Counter')).toBeInTheDocument();

    // Verify that the navbar buttons are rendered.
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard/i })).toBeInTheDocument();
  });

  test('renders main content with header text and description', () => {
    // Verify the header text.
    expect(screen.getByText('Welcome to The Game Counter!')).toBeInTheDocument();

    // Check for a part of the description text.
    expect(
      screen.getByText(/This is your one-stop place to keep track of how many times you've lost the game/i)
    ).toBeInTheDocument();

    // Check for the additional description (sigma reference).
    expect(
      screen.getByText(/If you lose the game, that means you're a sigma/i)
    ).toBeInTheDocument();
  });

  test('renders gif image with correct alt text and source', () => {
    // Find the image by its alt text.
    const img = screen.getByAltText('Game Counter Gif');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://i.pinimg.com/originals/55/e6/99/55e69978d4e283dcffa6779b48c9357e.gif'
    );
  });

  test('clicking Dashboard button calls navigate with "/dashboard"', () => {
    // Find the Dashboard button in the navbar.
    const dashboardButton = screen.getByRole('button', { name: /Dashboard/i });

    // Simulate a click event on the Dashboard button.
    fireEvent.click(dashboardButton);

    // Assert that the navigate function was called with the expected route.
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('renders footer with links', () => {
    // Verify that footer links (anchor elements) are rendered.
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
  });
});
