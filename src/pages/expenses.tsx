import React from 'react';
import ExpenseCard from '../components/ExpenseCard';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Expenses = () => {
    const expenses = trpc.proxy.expenses.fetchExpenses.useQuery();
    return (
        <Layout className="flex-col justify-start">
            <h1 className="text-purple-300 text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center p-4">
                Expenses
            </h1>
            <div>
                {expenses.data?.map((e) => (
                    <ExpenseCard key={e.id} expense={e} />
                ))}
            </div>
        </Layout>
    );
};

export default Expenses;
