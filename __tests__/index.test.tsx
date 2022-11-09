import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '../src/pages/index';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

const mockNullSession = null;

describe('Home page', () => {
    (useSession as jest.Mock).mockReturnValueOnce([mockNullSession, false]);

    it('renders the homepage', () => {
        render(<Homepage />);
        const homepageText = screen.getByText(
            /Track expenses and income to get an accurate and visual representation of your expenditure/i
        );
        expect(homepageText).toBeInTheDocument();
    });

    it('has a sign in button', () => {
        render(<Homepage />);
        const signInButton = screen.getByRole('button');
        console.log(signInButton);
        expect(signInButton).toHaveTextContent(/sign in/i);
    });
});
