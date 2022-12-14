import React, { useState } from 'react';
import { Expense } from '@prisma/client';
import { trpc } from '../utils/trpc';
import Modal from './Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExpenseForm, ExpenseFormSchema } from '../utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';

const ExpenseCard = ({ expense }: { expense: Expense }) => {
    const queryClient = trpc.useContext();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const deleteExpense = trpc.proxy.expenses.deleteExpense.useMutation({
        onSuccess() {
            queryClient.invalidateQueries(['expenses.fetchExpenses']);
            queryClient.invalidateQueries(['expenses.calculateStats']);
        },
    });

    const editExpense = trpc.proxy.expenses.editExpense.useMutation({
        onSuccess() {
            queryClient.invalidateQueries(['expenses.fetchExpenses']);
            queryClient.invalidateQueries(['expenses.calculateStats']);
        },
    });

    const handleDeleteExpense = () => deleteExpense.mutate({ id: expense.id });
    const handleCloseModal = () => setIsModalVisible(false);
    const handleShowModal = () => setIsModalVisible(true);

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<ExpenseForm>({
        resolver: zodResolver(ExpenseFormSchema),
        mode: 'onBlur',
        defaultValues: {
            name: expense.name,
            price: expense.price,
            type: expense.type,
            date: expense.date.toISOString().split('T')[0],
        },
    });

    const onSubmit: SubmitHandler<ExpenseForm> = (data) => {
        editExpense.mutate({
            id: expense.id,
            name: data.name,
            price: data.price,
            type: data.type,
            date: data.date,
        });
        handleCloseModal();
    };

    return (
        <div className="flex items-center">
            <div
                className={`flex justify-between relative my-4 mr-2 p-8 text-xl rounded-md text-white w-full shadow-md shadow-slate-700 ${
                    expense.type === 'EXPENSE' ? 'bg-red-500' : 'bg-green-500'
                }`}
            >
                <span>{expense.name}</span>
                <span>??{expense.price}</span>
            </div>
            <div className="flex flex-col">
                <button
                    className="btn btn-md btn-danger mb-1"
                    onClick={handleDeleteExpense}
                >
                    Delete
                </button>
                <button
                    className="btn btn-md btn-info"
                    onClick={handleShowModal}
                >
                    Edit
                </button>
            </div>
            <Modal
                title="Edit Expenses"
                open={isModalVisible}
                onClose={handleCloseModal}
                primaryBtnText="Edit Expense"
                onPrimaryClick={handleSubmit(onSubmit)}
            >
                <form className="flex flex-col w-full">
                    <FormField
                        name="name"
                        placeholder="Name..."
                        isSubmitting={isSubmitting}
                        control={control}
                    />
                    <FormField
                        name="price"
                        placeholder="Price..."
                        isSubmitting={isSubmitting}
                        control={control}
                        leftAdornment="??"
                    />
                    <div className="flex justify-center py-8">
                        <FormField
                            name="type"
                            placeholder="Expense"
                            isSubmitting={isSubmitting}
                            control={control}
                            type="radio"
                            value="EXPENSE"
                        />
                        <FormField
                            name="type"
                            placeholder="Income"
                            isSubmitting={isSubmitting}
                            control={control}
                            type="radio"
                            value="INCOME"
                        />
                    </div>
                    <FormField
                        name="date"
                        placeholder="Date..."
                        isSubmitting={isSubmitting}
                        control={control}
                        type="date"
                    />
                </form>
            </Modal>
        </div>
    );
};

export default ExpenseCard;
