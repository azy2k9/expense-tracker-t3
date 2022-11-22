import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import IconClosed from '../icons/IconClosed';
import IconHamburgerMenu from '../icons/IconHamburgerMenu';
import IconMoon from '../icons/IconMoon';
import IconSun from '../icons/IconSun';

const lightModeToggleStyles =
    'text-white border-2 border-green-600 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-600';
const darkModeToggleStyles =
    'text-green-500 border-2 border-green-500 hover:bg-green-600/50 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-green-500 dark:focus:ring-green-600';

const Header = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center min-h-[15vh] md:max-h-[15vh] pr-2">
            <h1 className="text-4xl md:text-5xl font-extrabold flex-1 text-center">
                <Link href={'/'}>
                    <span className="hover:cursor-pointer">
                        Expense <span className="text-green-500">Tracker</span>
                    </span>
                </Link>
            </h1>
            <button onClick={() => setIsOpen((prevState) => !prevState)}>
                {isOpen ? <IconClosed /> : <IconHamburgerMenu />}
            </button>
            {isOpen && <HamburgerMenu closeMenu={() => setIsOpen(false)} />}
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

const HamburgerMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    return (
        <div className="flex flex-col absolute top-0 z-10 dark:bg-slate-700 bg-white w-full h-full">
            <HamburgerHeader closeMenu={closeMenu} />
            <HamburgerBody closeMenu={closeMenu} />
        </div>
    );
};

const HamburgerHeader = ({ closeMenu }: { closeMenu: () => void }) => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center min-h-[15vh] md:max-h-[15vh] p-3 flex-0">
            <button
                className={
                    'flex-1' + theme === 'light'
                        ? lightModeToggleStyles
                        : darkModeToggleStyles
                }
                onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}
            >
                {theme === 'light' ? <IconMoon /> : <IconSun />}
            </button>
            <h1 className="flex-[5] text-4xl md:text-5xl font-extrabold text-center">
                Menu
            </h1>
            <button
                className={
                    'flex-1' + theme === 'light'
                        ? lightModeToggleStyles
                        : darkModeToggleStyles
                }
                onClick={() => closeMenu()}
            >
                <IconClosed />
            </button>
        </div>
    );
};

const HamburgerBody = ({ closeMenu }: { closeMenu: () => void }) => {
    const { data: session } = useSession();
    const links = [];
    if (session?.user && session?.user?.email) {
        links.push(
            { name: 'Home', href: '/' },
            { name: 'View Expenses', href: '/expenses' },
            { name: 'Create Expense', href: '/expenses' },
            { name: 'About', href: '/about' }
        );
    } else {
        links.push(
            { name: 'Home', href: '/' },
            { name: 'Sign In', href: '/signin' },
            { name: 'About', href: '/about' }
        );
    }

    return (
        <div className="flex flex-col flex-1 p-3">
            {links.map((link) => (
                <Link href={link.href} key={link.href}>
                    <button
                        className="dark:hover:bg-slate-800 flex-1"
                        onClick={() => closeMenu()}
                    >
                        {link.name}
                    </button>
                </Link>
            ))}
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
