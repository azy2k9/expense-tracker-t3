import React from 'react';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Expenses = () => {
    const expenses = trpc.proxy.expenses.fetchExpenses.useQuery();
    return (
        <Layout>
            {expenses.data?.map((e) => (
                <div key={e.id}>
                    <p>{e.name}</p>
                    <p>{e.price}</p>
                    <p>{e.type}</p>
                    <p>{e.date.toDateString()}</p>
                </div>
            ))}
        </Layout>
    );
};

export default Expenses;
