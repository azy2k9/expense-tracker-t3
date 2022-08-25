import React from 'react';

interface LayoutProps {
    className?: string;
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
    return (
        <main className="bg-indigo-500 text-white">
            <div className={'flex full-height w-full px-4 ' + className}>
                {children}
            </div>
        </main>
    );
};

export default Layout;
