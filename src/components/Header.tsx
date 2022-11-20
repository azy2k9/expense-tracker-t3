import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const lightModeToggleStyles =
    'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800';
const darkModeToggleStyles =
    'text-green-700 border border-green-700 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-green-700 dark:focus:ring-green-800';

const Header = ({ noTitle = false }: { noTitle?: boolean }) => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center">
            <h1 className="text-4xl md:text-[4rem] font-extrabold flex-1 text-center mt-8 md:mt-12 min-h-[10vh] md:max-h-[10vh]">
                {!noTitle && (
                    <Link href={'/'}>
                        <span className="hover:cursor-pointer">
                            Expense{' '}
                            <span className="text-green-500">Tracker</span>
                        </span>
                    </Link>
                )}
            </h1>
            <button
                className={
                    theme === 'light'
                        ? lightModeToggleStyles
                        : darkModeToggleStyles
                }
                onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}
            >
                {theme === 'light' ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                    </svg>
                )}
            </button>
            {session && session.user && (
                <div className="flex flex-col pr-2">
                    {session && session.user?.image && (
                        <div className="flex justify-center pb-1">
                            <Image
                                alt={session.user.name || 'profile picture'}
                                className="rounded-full"
                                src={session.user?.image}
                                height={50}
                                width={50}
                            />
                        </div>
                    )}
                    <button
                        onClick={() => signOut()}
                        className="btn btn-primary btn-xs"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);

    return {
        props: {
            session,
        },
    };
}

export default Header;
