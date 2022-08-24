import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
// import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
    // const hello = trpc.proxy.example.hello.useQuery({ text: 'from tRPC' });

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
                </div>
                {/* <div className="flex items-center justify-center w-full pt-6 text-2xl text-blue-500">
                    {hello.data ? (
                        <p>{hello.data.greeting}</p>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div> */}
            </Layout>
        </>
    );
};

export default Home;
