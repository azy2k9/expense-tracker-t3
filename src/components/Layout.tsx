import React from 'react';
import LoadingOverlay from './LoadingOverlay';

interface LayoutProps {
    className?: string;
    children: React.ReactNode;
    loading?: boolean;
}
const Layout: React.FC<LayoutProps> = ({
    children,
    className = '',
    loading,
}) => {
    return (
        <>
            {loading && <LoadingOverlay />}
            <main className="md:flex bg-indigo-500 text-white md:justify-center">
                <div
                    className={
                        'flex full-height w-full md:max-w-screen-md px-4 ' +
                        className
                    }
                >
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
