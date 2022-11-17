import { fireEvent, render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Homepage from '../src/pages/index';
import { useSession } from 'next-auth/react';
// import mockRouter from 'next-router-mock';
import singletonRouter, { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next-auth/react');

const mockNullSession = null;
// const mockSession: Session = {
//     expires: '1',
//     user: {
//         id: 'test',
//         email: 'test@test.com',
//         name: 'testing-library',
//         image: null,
//     },
// };

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
        expect(signInButton).toHaveTextContent(/sign in/i);
    });

    it.only('redirects to the sign in page', () => {
        const { result } = renderHook(() => {
            return useRouter();
        });

        console.log('before', result.current.asPath);
        render(<Homepage />);
        userEvent.click(screen.getByText(/sign in/i));
        console.log('after', result.current.asPath);

        // await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
        // expect(singletonRouter).toMatchObject({ })
    });
});
