import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import Layout from '../components/Layout';
import CreateExpenseModal from '../sections/CreateExpenseModal';
import CreateExpenseListModal from '../sections/CreateExpenseListModal';
import SelectedExpenseList from '../sections/SelectedExpenseList';
import { useExpenses } from '../hooks/useExpenses';
import { useExpenseLists } from '../hooks/useExpenseLists';
import { useStats } from '../hooks/useStats';

const Expenses = () => {
  const { data } = useSession();
  const router = useRouter();
  const { hasExpenseLists } = useExpenseLists();

  const [isCreatingExpense, setIsCreatingExpense] = useState(false);
  const handleCloseCreateExpenseModal = () => setIsCreatingExpense(false);
  const handleShowCreateExpenseModal = () => setIsCreatingExpense(true);

  const [isCreatingList, setIsCreatingList] = useState(false);
  const handleCloseCreateListModal = () => setIsCreatingList(hasExpenseLists);
  const handleShowCreateListModal = () => setIsCreatingList(true);

  const expenses = useExpenses();
  const stats = useStats();

  useEffect(() => {
    if (!data || (data && !data.user)) {
      router.push('/signin');
    }
  }, [data, data?.user, router]);

  return (
    <Layout className="flex-col justify-start" loading={expenses.isLoading}>
      <div className="flex justify-center mt-8">
        <button
          className="btn btn-primary btn-md"
          onClick={handleShowCreateExpenseModal}
        >
          Create Expense
        </button>
        <button className="btn btn-primary" onClick={handleShowCreateListModal}>
          Create List
        </button>
      </div>
      <div className="flex my-8 py-4 font-bold bg-white rounded-md shadow-2xl text-black justify-around dark:bg-slate-800">
        <div className="flex flex-col items-center text-red-500">
          <h3>Total Expenses</h3>
          <h3>£{stats.data?.totalExpenses}</h3>
        </div>
        <div className="flex flex-col items-center dark:text-white">
          <h3>Balance</h3>
          <h3>£{stats.data?.balance}</h3>
        </div>
        <div className="flex flex-col items-center text-green-500">
          <h3>Total Income</h3>
          <h3>£{stats.data?.totalIncome}</h3>
        </div>
      </div>
      <div>
        {expenses.data?.map((e) => (
          <ExpenseCard key={e.id} expense={e} />
        ))}
      </div>
      <CreateExpenseModal
        handleClose={handleCloseCreateExpenseModal}
        isCreatingExpense={isCreatingExpense}
      />
      <CreateExpenseListModal
        handleClose={handleCloseCreateListModal}
        isCreatingListExpense={isCreatingList}
      />
    </Layout>
  );
};

export default Expenses;
