import React from 'react';
import { Expense } from '@prisma/client';
import { trpc } from '../utils/trpc';

const ExpenseCard = ({ expense }: { expense: Expense }) => {
    const queryClient = trpc.useContext();

    const deleteExpense = trpc.proxy.expenses.deleteExpense.useMutation({
        onSuccess() {
            queryClient.invalidateQueries(['expenses.fetchExpenses']);
            queryClient.invalidateQueries(['expenses.calculateStats']);
        },
    });

    const handleDeleteExpense = () => deleteExpense.mutate({ id: expense.id });

    return (
        <div className="flex items-center">
            <div
                className={`flex justify-between relative my-4 mr-2 p-8 text-xl rounded-md text-white w-full shadow-md shadow-slate-700 ${
                    expense.type === 'EXPENSE' ? 'bg-red-500' : 'bg-green-500'
                }`}
            >
                <span>{expense.name}</span>
                <span>£{expense.price}</span>
            </div>
            <div>
                <button
                    className="bg-purple-400 hover:bg-purple-500 text-sm font-bold py-2 px-4 rounded-full"
                    onClick={handleDeleteExpense}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ExpenseCard;
