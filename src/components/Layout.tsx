import { useRouter } from 'next/router';
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
    const router = useRouter();
    const isOnHomepage = router.pathname === '/';
    let classes = 'flex w-full md:max-w-screen-md px-4 ' + className;

    if (isOnHomepage) {
        classes += ' full-height';
    } else {
        classes += ' main-height';
    }

    return (
        <>
            {loading && <LoadingOverlay />}
            <main className="md:flex md:justify-center">
                <div className={classes}>{children}</div>
            </main>
        </>
    );
};

export default Layout;
