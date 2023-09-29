import React from 'react';
import DarkMode from './DarkMode';

const Drawer = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`dark:bg-slate-800 bg-green-500 absolute right-0 top-0 w-full h-full z-10 transition-all duration-150 ease-out ${
        isOpen ? 'z-10' : `w-0`
      }`}
    >
      {isOpen && (
        <div className="flex justify-center">
          <DarkMode />
        </div>
      )}
    </div>
  );
};

export default Drawer;
