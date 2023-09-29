import React, { useState } from 'react';
import Drawer from './Drawer';

const MenuOpen = () => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-7 md:w-8 stroke-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
    />
  </svg>
);

const MenuClosed = () => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-7 md:w-8 dark:stroke-white stroke-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="z-20" onClick={() => setIsOpen(!isOpen)}>
        {isOpen && <MenuOpen />}
        {!isOpen && <MenuClosed />}
      </button>
      <Drawer isOpen={isOpen} />
    </>
  );
};

export default Menu;
