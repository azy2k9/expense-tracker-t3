import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: NextPage = () => {
    const user = useSession();

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout className="container flex flex-col items-center justify-center full-height mx-auto">
                <div className="text-center text-xl sm:text-2xl w-7/12 pb-4">
                    Track expenses and income to get an accurate and visual
                    representation of your expenditure.
                </div>
                <div className="text-center text-xl sm:text-2xl w-7/12 pb-24 sm:pb-12">
                    By tracking income and expenses, calculations are performed
                    to inform you of your remaining money after your regular
                    expenses.
                </div>
                <div className="flex">
                    {user.data?.user ? (
                        <>
                            <Link href="/expenses">
                                <button className="bg-purple-400 hover:bg-purple-500 text-lg sm:text-2xl text-white font-bold py-4 px-8 rounded-full mx-2">
                                    Expenses
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/signin">
                                <button className="bg-purple-400 hover:bg-purple-500 text-lg sm:text-2xl text-white font-bold py-4 px-8 rounded-full mx-2">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-purple-400 hover:bg-purple-500 text-lg sm:text-2xl text-white font-bold py-4 px-8 rounded-full">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Home;
