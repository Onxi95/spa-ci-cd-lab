import { createContext, useContext, useState, type ReactNode } from "react";

import { noop } from "@/lib/noop";


type UserNameContext = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserNameContext = createContext<UserNameContext>({
  userName: "",
  setUserName: noop,
});

type UserNameProviderProps = {
  children: ReactNode;
};

export const UserNameProvider = ({ children }: UserNameProviderProps) => {
  const [userName, setUserName] = useState("");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export const useUserNameContext = () => {
  return useContext(UserNameContext);
};
