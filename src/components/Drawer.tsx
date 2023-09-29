import React from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const DrawerButton = ({
  children,
  handleClick,
  closeDrawer,
}: {
  children: React.ReactNode;
  handleClick: () => void;
  closeDrawer: () => void;
}) => {
  return (
    <button
      className="h-32 hover:bg-green-600 hover:dark:bg-slate-900"
      onClick={() => {
        handleClick();
        closeDrawer();
      }}
    >
      {children}
    </button>
  );
};

const Drawer = ({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const isDarkMode = theme === 'dark';
  const isSignedIn = session?.user?.id;

  return (
    <div
      className={`dark:bg-slate-800 text-white bg-green-500 border-green-600 dark:border-slate-900 absolute right-0 top-0 w-full h-full z-10 transition-all duration-150 ease-out ${
        isOpen ? 'z-10 border-l-2 md:w-1/3' : `w-0`
      }`}
    >
      {isOpen && (
        <div className="flex justify-center flex-col align-middle h-full md:h-[90vh] md:mt-[10vh]">
          <DrawerButton
            handleClick={() => router.push('/')}
            closeDrawer={closeDrawer}
          >
            Home
          </DrawerButton>
          <DrawerButton
            handleClick={() => router.push(isSignedIn ? '/signout' : '/signin')}
            closeDrawer={closeDrawer}
          >
            Sign {isSignedIn ? 'Out' : 'In'}
          </DrawerButton>
          <DrawerButton
            handleClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            closeDrawer={closeDrawer}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </DrawerButton>
        </div>
      )}
    </div>
  );
};

export default Drawer;
