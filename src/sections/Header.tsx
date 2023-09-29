import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

import Link from 'next/link';
import DarkMode from '../components/DarkMode';
import UserProfile from '../components/UserProfile';

const Title = ({ includeTitle }: { includeTitle?: boolean }) => {
  return (
    <h1 className="text-4xl md:text-[3.25rem] font-extrabold flex-1 text-center">
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
  return (
    <div className="flex items-center mt-8 md:mt-12 md:max-h-[10vh]">
      <Title includeTitle={includeTitle} />
      <DarkMode />
      <UserProfile />
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
