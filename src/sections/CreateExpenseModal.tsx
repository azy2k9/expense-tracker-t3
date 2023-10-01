import React from 'react';
import { ExpenseForm, ExpenseFormSchema } from '../utils/validationSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../utils/trpc';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

interface IProps {
  handleClose: () => void;
  isCreatingExpense: boolean;
}

const CreateExpenseModal = ({ handleClose, isCreatingExpense }: IProps) => {
  const queryClient = trpc.useContext();

  const createExpense = trpc.proxy.expenses.createExpense.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(['expenses.fetchExpenses']);
      queryClient.invalidateQueries(['expenses.calculateStats']);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<ExpenseForm>({
    resolver: zodResolver(ExpenseFormSchema),
    mode: 'onBlur',
    defaultValues: {
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
      listId: '', //TODO: Add list thats currently selected
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
          leftAdornment="£"
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
  );
};

export default CreateExpenseModal;
