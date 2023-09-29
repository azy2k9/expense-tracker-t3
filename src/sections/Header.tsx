import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DarkMode from '../components/DarkMode';

const Title = ({ includeTitle }: { includeTitle?: boolean }) => {
  return (
    <h1 className="text-4xl md:text-[4rem] font-extrabold flex-1 text-center mt-8 md:mt-12 min-h-[10vh] md:max-h-[10vh]">
      {!includeTitle && (
        <Link href={'/'}>
          <span className="hover:cursor-pointer">
            Expense <span className="text-green-500">Tracker</span>
          </span>
        </Link>
      )}
    </h1>
  );
};

const Header = ({ includeTitle = true }: { includeTitle?: boolean }) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center">
      <Title includeTitle={includeTitle} />
      <DarkMode />
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
          <button onClick={() => signOut()} className="btn btn-primary btn-xs">
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
