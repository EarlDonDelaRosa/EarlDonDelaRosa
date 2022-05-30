import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import LoginPage from './tradingApp/Login';
import UserPage from './tradingApp/UserPage';

describe('This is login page', () => {
  beforeEach(() => {
    render(<LoginPage />);
  })

  test('h3 Login to access your account', () => {
    const linkElement = screen.getByText(/Login to access your account/);
    expect(linkElement).toBeInTheDocument();
  });

  test('To check if data has changed', () => {
    const linkElement = screen.getByText(/Login to access your account/);
    expect(linkElement).toMatchSnapshot();
  });

  test('placeholder for Username test', () => {
    const linkElement = screen.getByPlaceholderText(/Username/);
    expect(linkElement).toBeInTheDocument();
  })

  test('button check', () => {
    const linkElement = screen.getAllByRole('button');
    fireEvent.click(linkElement);
    expect(linkElement).toHaveLength(1);
  })
})

describe('This is user page', () => {
  beforeEach(() => {
    render(<UserPage />);
  })

  test('h4 Welcome', () => {
    const linkElement = screen.getByText(/Welcome/);
    expect(linkElement).toBeInTheDocument();
  });

  test('To check if data has changed', () => {
    const linkElement = screen.getByText(/Welcome/);
    expect(linkElement).toMatchSnapshot();
  });

  test('placeholder for Search transactions test', () => {
    const linkElement = screen.getByPlaceholderText(/Search transactions/);
    expect(linkElement).toBeInTheDocument();
  })

  test('button check', () => {
    const linkElement = screen.getAllByRole('button');
    fireEvent.click(linkElement);
    expect(linkElement).toHaveLength(6);
  })

  test('input label', () => {
    const linkElement = screen.getByText(/search/);
    expect(linkElement).toBeInTheDocument();
  })
})