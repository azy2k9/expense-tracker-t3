import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';

const Header = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center">
            <h1 className="text-4xl md:text-[4rem] leading-normal font-extrabold text-gray-700 flex-1 text-center">
                Expense <span className="text-purple-300">Tracker</span>
            </h1>
            <div>
                {session && session.user?.image && (
                    <Image
                        alt={session.user.name || 'profile picture'}
                        className="rounded-full"
                        src={session.user?.image}
                        height={50}
                        width={50}
                    />
                )}
                {session && session.user && (
                    <button
                        onClick={() => signOut()}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Sign Out
                    </button>
                )}
            </div>
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
