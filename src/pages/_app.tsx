// src/pages/_app.tsx
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '../utils/trpc';
import Head from 'next/head';
import Header from '../sections/Header';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { AppContextProvider } from '../hooks/useAppState';

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const isHomepage = router.pathname === '/';

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="Expense Tracker"
          content="An expense tracking react-app created by Arslaan Qadus"
        />
        <meta charSet="utf-8" />
      </Head>
      <AppContextProvider>
        <ThemeProvider>
          <SessionProvider session={pageProps.session}>
            <Header includeTitle={isHomepage} />
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </AppContextProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
