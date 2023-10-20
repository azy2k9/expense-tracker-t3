import React from 'react';
import useAppState from '../hooks/useAppState';
import { trpc } from '../utils/trpc';
import { useExpenses } from '../hooks/useExpenses';

const SelectedExpenseList = () => {
  const { appState, setAppState } = useAppState();

  const handleChangeExpenseList = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newList = event.target.value;
    setAppState({ selectedListId: newList });
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an list:
      </label>
      <select
        id="expenseList"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChangeExpenseList}
        defaultValue={appState.selectedListId}
      >
        {appState.lists.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectedExpenseList;
