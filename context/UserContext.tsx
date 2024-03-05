import { User } from "@/entity/User/User";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TUserContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<TUserContext>(
  {} as unknown as TUserContext
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({} as User);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): TUserContext => useContext(UserContext);