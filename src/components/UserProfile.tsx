import React from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = session && session.user;

  return (
    <div className="flex flex-col pr-2">
      {!isUserLoggedIn && <div>Sign in</div>}
      {isUserLoggedIn && session.user?.image && (
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
      {isUserLoggedIn && (
        <button onClick={() => signOut()} className="btn btn-primary btn-xs">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default UserProfile;
