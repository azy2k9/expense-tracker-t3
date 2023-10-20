import { trpc } from '../utils/trpc';
import useAppState from './useAppState';

export const useStats = () => {
  const { appState } = useAppState();

  return trpc.proxy.expenses.calculateStats.useQuery(
    { listId: appState.selectedListId },
    {
      enabled: !!appState.selectedListId,
    }
  );
};
