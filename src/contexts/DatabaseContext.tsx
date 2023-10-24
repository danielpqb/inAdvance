import allService from "@/services/sqlite/All";
import sqliteServices from "@/services/sqlite/db";
import customersService from "@/services/sqlite/Customers";
import loansService from "@/services/sqlite/Loans";
import installmentsService from "@/services/sqlite/Installments";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import * as SQLite from "expo-sqlite";
import { useQueryClient } from "@tanstack/react-query";

type TContext = {
  openDB: (name: string, resetDB?: boolean) => void;
  services: {
    all: ReturnType<typeof allService>;
    customers: ReturnType<typeof customersService>;
    loans: ReturnType<typeof loansService>;
    installments: ReturnType<typeof installmentsService>;
  };
};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const DatabaseContext: FC<TProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [db, setDb] = useState({} as SQLite.SQLiteDatabase);

  const services = {
    all: allService(db),
    customers: customersService(db),
    loans: loansService(db),
    installments: installmentsService(db),
  };

  async function openDB(name: string, resetDB?: boolean) {
    const newDB = sqliteServices.openDB(name);
    setDb(newDB);
    await sqliteServices.initDB(newDB, resetDB);
    queryClient.removeQueries();
  }

  useEffect(() => {
    openDB("appDB");
  }, []);

  return (
    <Context.Provider value={{ openDB, services }}>{children}</Context.Provider>
  );
};

export default DatabaseContext;
export function useDatabaseContext() {
  return useContext(Context);
}
