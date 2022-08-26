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
            <main className="bg-indigo-500 text-white">
                <div className={'flex full-height w-full px-4 ' + className}>
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
