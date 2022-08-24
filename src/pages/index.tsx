import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
    const hello = trpc.proxy.example.hello.useQuery({ text: 'from tRPC' });
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
                <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                    Expense <span className="text-purple-300">Tracker</span>
                </h1>
                <div>
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => signIn()}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => router.push('/signup')}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
                <div className="flex items-center justify-center w-full pt-6 text-2xl text-blue-500">
                    {hello.data ? (
                        <p>{hello.data.greeting}</p>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
