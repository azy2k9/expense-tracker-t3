import React, { Fragment } from 'react';
import { Transition as TransitionBase } from '@headlessui/react';

const Transition = ({
  isOpen,
  children,
  isDrawer = false,
}: {
  isOpen: boolean;
  isDrawer?: boolean;
  children: React.ReactNode;
}) => {
  const transition = isDrawer
    ? {
        enter: 'transform transition ease-in-out duration-200',
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leave: 'transform transition ease-in-out duration-200',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full',
      }
    : {
        enter: 'transition duration-100 ease-out',
        enterFrom: 'transform scale-95 opacity-0',
        enterTo: 'transform scale-100 opacity-100',
        leave: 'transition duration-75 ease-out',
        leaveFrom: 'transform scale-100 opacity-100',
        leaveTo: 'transform scale-95 opacity-0',
      };

  return (
    <TransitionBase show={isOpen} as={Fragment} {...transition}>
      {children}
    </TransitionBase>
  );
};

export default Transition;
