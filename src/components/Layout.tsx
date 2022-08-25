import React from 'react';
import Header from './Header';

interface LayoutProps {
    className?: string;
    children: React.ReactNode;
    title?: string;
}
const Layout: React.FC<LayoutProps> = ({ children, className, title }) => {
    return (
        <main className="bg-indigo-500 text-white">
            <Header />
            <h1
                className="text-purple-300 text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center flex-1 p-4
                    h-[10vh]"
            >
                {title}
            </h1>
            <div
                className={
                    className + ' flex justify-center full-height w-full px-4'
                }
            >
                {children}
            </div>
        </main>
    );
};

export default Layout;
