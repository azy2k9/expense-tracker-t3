import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import OutsideClickHandler from 'react-outside-click-handler';
import SelectedExpenseList from '../sections/SelectedExpenseList';

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
      className="h-32 hover:bg-green-600 hover:dark:bg-slate-900 transition-all"
      onClick={() => {
        handleClick();
        closeDrawer();
      }}
    >
      {children}
    </button>
  );
};

interface IProps {
  isOpen: boolean;
  closeDrawer: () => void;
}

const Drawer = forwardRef<HTMLDivElement, IProps>(function Drawer(
  { closeDrawer },
  ref
) {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const isDarkMode = theme === 'dark';
  const isSignedIn = session?.user?.id;

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        closeDrawer();
      }}
    >
      <div
        ref={ref}
        className={`dark:bg-slate-800 text-white bg-green-500 border-green-600 dark:border-slate-900 absolute right-0 top-0 w-full md:w-1/3 h-full z-10 transition-all duration-150 ease-out`}
      >
        <div className="flex justify-center flex-col align-middle h-full md:h-[90vh] md:mt-[10vh]">
          <div className="flex self-center w-4/5">
            <SelectedExpenseList closeDrawer={closeDrawer} />
          </div>
          <DrawerButton
            handleClick={() => router.push('/')}
            closeDrawer={closeDrawer}
          >
            Home
          </DrawerButton>
          <DrawerButton
            handleClick={() => {
              if (isSignedIn) {
                signOut();
              }

              router.push('/signin');
            }}
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
      </div>
    </OutsideClickHandler>
  );
});

export default Drawer;
