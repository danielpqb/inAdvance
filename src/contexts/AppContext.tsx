import { FC, ReactNode, createContext, useContext } from "react";

type TContext = {};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const AppContext: FC<TProps> = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default AppContext;
export function useAppContext() {
  return useContext(Context);
}
