import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TPageContext = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  currentSideMenu: string;
  setCurrentSideMenu: Dispatch<SetStateAction<string>>;
  DialogBox: (({}: any) => JSX.Element) | undefined;
  setDialogBox: Dispatch<
    SetStateAction<(({}: any) => JSX.Element) | undefined>
  >;
};

export const PageContext = createContext<TPageContext>(
  {} as unknown as TPageContext
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentSideMenu, setCurrentSideMenu] = useState<string>("");
  const [DialogBox, setDialogBox] = useState<
    (({}: any) => JSX.Element) | undefined
  >(undefined);

  return (
    <PageContext.Provider
      value={{
        searchText,
        setSearchText,
        errorMessage,
        setErrorMessage,
        currentSideMenu,
        setCurrentSideMenu,
        DialogBox,
        setDialogBox,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = (): TPageContext => useContext(PageContext);
