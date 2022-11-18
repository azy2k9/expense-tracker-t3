import React from 'react';

const Button = ({
    children,
}: React.PropsWithChildren & React.HTMLProps<HTMLButtonElement>) => {
    return (
        <button className="bg-green-500 hover:bg-green-600 text-md sm:text-xl text-white py-3 px-8 rounded-full mx-2 dark:text-white dark:bg-green-600 dark:hover:bg-green-700">
            {children}
        </button>
    );
};

export default Button;
