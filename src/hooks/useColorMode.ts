import { useEffect, useState } from 'react';

const useColorMode = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const theme = localStorage.getItem('nightwind-mode');

        if (!theme || theme === '') {
            // Default to dark mode
            localStorage.setItem('nightwind-mode', 'dark');
            setTheme('dark');
        }

        if (theme === 'light') {
            setTheme('light');
        }

        if (theme === 'dark') {
            setTheme('dark');
        }
    }, [theme, setTheme]);

    return [theme, setTheme];
};

export default useColorMode;
