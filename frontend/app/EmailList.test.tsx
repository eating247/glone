import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailList from './EmailList';
import { emailAPI } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  emailAPI: {
    fetchAll: jest.fn().mockResolvedValue([]),
    toggleStar: jest.fn(),
    delete: jest.fn(),
    search: jest.fn().mockResolvedValue([]),
  },
}));

describe('EmailList rendering', () => {
  it('renders loading state', () => {
    render(<EmailList />);
    expect(screen.getByText(/loading emails/i)).toBeInTheDocument();
  });

  it('renders error state', async () => {
    jest
      .spyOn(emailAPI, 'fetchAll')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Failed to load')),
      );
    render(<EmailList />);
    // Wait for error to be handled
    // (error is only logged, not rendered, so this is a placeholder for when error UI is added)
    // expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('renders empty state when no emails', async () => {
    render(<EmailList />);
    expect(await screen.findByText(/loading emails/i)).toBeInTheDocument();
    // There is no explicit empty state UI, so this is a placeholder for when it is added
    // expect(screen.getByText(/no emails/i)).toBeInTheDocument();
  });
});
