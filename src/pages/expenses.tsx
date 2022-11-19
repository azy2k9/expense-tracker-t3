import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Expenses = () => {
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!data || (data && !data.user)) {
            router.push('/signin');
        }
    }, [data, data?.user, router]);

    const expenses = trpc.proxy.expenses.fetchExpenses.useQuery();
    const stats = trpc.proxy.expenses.calculateStats.useQuery();

    return (
        <Layout
            className="flex-col justify-start"
            loading={expenses.isLoading || stats.isLoading}
        >
            <div className="flex my-4 py-4 font-bold bg-white rounded-md shadow-2xl text-black justify-around dark:bg-slate-800">
                <div className="flex flex-col items-center text-red-500">
                    <h3>Total Expenses</h3>
                    <h3>£{stats.data?.totalExpenses}</h3>
                </div>
                <div className="flex flex-col items-center">
                    <h3>Balance</h3>
                    <h3>£{stats.data?.balance}</h3>
                </div>
                <div className="flex flex-col items-center text-green-500">
                    <h3>Total Income</h3>
                    <h3>£{stats.data?.totalIncome}</h3>
                </div>
            </div>
            <div className="flex justify-center">
                <Link href="/create-expense">
                    <button className="btn btn-primary btn-md">
                        Create an expense
                    </button>
                </Link>
            </div>
            <div>
                {expenses.data?.map((e) => (
                    <ExpenseCard key={e.id} expense={e} />
                ))}
            </div>
        </Layout>
    );
};

export default Expenses;
