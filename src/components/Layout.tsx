import React from 'react';
import Header from './Header';

interface LayoutProps {
    className?: string;
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <main className="bg-indigo-500 text-white">
            <Header />
            <div className={className + ' flex full-height w-full px-4'}>
                {children}
            </div>
        </main>
    );
};

export default Layout;
