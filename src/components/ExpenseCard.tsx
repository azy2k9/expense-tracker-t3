import React from 'react';
import { Expense } from '@prisma/client';

const ExpenseCard = ({ expense }: { expense: Expense }) => {
    return (
        <div
            className={`flex relative my-4 justify-between p-8 text-xl rounded-md text-white w-full shadow-md shadow-slate-700 ${
                expense.type === 'EXPENSE' ? 'bg-red-500' : 'bg-green-500'
            }`}
        >
            <span>{expense.name}</span>
            <span>{expense.price}</span>
        </div>
    );
};

export default ExpenseCard;
