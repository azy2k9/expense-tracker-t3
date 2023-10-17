import React from 'react';
import { ExpenseForm, ExpenseFormSchema } from '../utils/validationSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../utils/trpc';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import useAppState from '../hooks/useAppState';

interface IProps {
  handleClose: () => void;
  isCreatingExpense: boolean;
}

const CreateExpenseModal = ({ handleClose, isCreatingExpense }: IProps) => {
  const queryClient = trpc.useContext();
  const { appState } = useAppState();

  const createExpense = trpc.proxy.expenses.createExpense.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(['expenses.fetchExpenses']);
      queryClient.invalidateQueries(['expenses.calculateStats']);
    },
  });

  const { handleSubmit, control, reset } = useForm<ExpenseForm>({
    resolver: zodResolver(ExpenseFormSchema),
    mode: 'onBlur',
    defaultValues: {
      listId: appState.selectedList,
      type: 'EXPENSE',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<ExpenseForm> = (data) => {
    createExpense.mutate({
      name: data.name,
      price: data.price,
      type: data.type,
      date: data.date,
      listId: appState.selectedList,
    });
    handleClose();
    reset();
  };

  return (
    <Modal
      title="Create Expense"
      open={isCreatingExpense}
      onClose={() => {
        handleClose();
        reset();
      }}
      primaryBtnText="Create Expense"
      onPrimaryClick={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormField name="name" placeholder="Name..." control={control} />
        <FormField
          name="price"
          placeholder="Price..."
          control={control}
          leftAdornment="£"
        />
        <div className="flex justify-center py-8">
          <FormField
            name="type"
            placeholder="Expense"
            control={control}
            type="radio"
            value="EXPENSE"
          />
          <FormField
            name="type"
            placeholder="Income"
            control={control}
            type="radio"
            value="INCOME"
          />
        </div>
        <FormField
          name="date"
          placeholder="Date..."
          control={control}
          type="date"
        />
      </form>
    </Modal>
  );
};

export default CreateExpenseModal;
