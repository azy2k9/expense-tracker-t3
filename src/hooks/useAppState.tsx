import React, { useContext } from 'react';
import useSetState from './useSetState';
import { List } from '@prisma/client';

interface Context {
  appState: AppContextInterface;
  setAppState: (
    patch:
      | Partial<AppContextInterface>
      | ((prevState: AppContextInterface) => Partial<AppContextInterface>)
  ) => void;
}

interface AppContextInterface {
  selectedList: string;
  lists: Array<List>;
}

const initialAppState: AppContextInterface = {
  selectedList: '',
  lists: [],
};

const AppContext = React.createContext<Context>({} as Context);

export const AppContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [appState, setAppState] =
    useSetState<AppContextInterface>(initialAppState);

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppState = () => {
  const { appState, setAppState } = useContext(AppContext);
  return { appState, setAppState };
};

export default useAppState;
