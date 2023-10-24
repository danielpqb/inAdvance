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
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TContext = {
  openDB: (name: string, resetDB?: boolean) => Promise<void>;
  deleteDB: (name: string) => Promise<void>;
  services: {
    all: ReturnType<typeof allService>;
    customers: ReturnType<typeof customersService>;
    loans: ReturnType<typeof loansService>;
    installments: ReturnType<typeof installmentsService>;
  };
  dbs: string[];
  selectedDB: string;
};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const DatabaseContext: FC<TProps> = ({ children }) => {
  const rootPath = `${FileSystem.documentDirectory}/SQLite/`;

  const queryClient = useQueryClient();
  const [selectedDB, setSelectedDB] = useState("");
  const [db, setDb] = useState({} as SQLite.SQLiteDatabase);
  const [dbsArray, setDbsArray] = useState([] as string[]);

  const services = {
    all: allService(db),
    customers: customersService(db),
    loans: loansService(db),
    installments: installmentsService(db),
  };

  async function openDB(name: string, resetDB?: boolean) {
    await AsyncStorage.setItem("activeDB", name);
    const newDB = sqliteServices.openDB(name);
    setDb(newDB);
    setSelectedDB(name);
    await sqliteServices.initDB(newDB, resetDB);
    queryClient.removeQueries();
    await findDBs();
  }

  async function deleteDB(name: string) {
    await FileSystem.deleteAsync(rootPath + name);
    await FileSystem.deleteAsync(rootPath + name + "-journal");
    const dbs = await findDBs();
    if (dbs.length > 0) {
      openDB(dbs[0]);
    } else {
      openDB("db");
    }
  }

  async function findDBs() {
    const dbs = await FileSystem.readDirectoryAsync(rootPath);
    setDbsArray(dbs);
    return dbs;
  }

  useEffect(() => {
    findDBs();

    AsyncStorage.getItem("activeDB").then((text) => {
      if (text) {
        openDB(text);
      } else {
        openDB("db");
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        openDB,
        deleteDB,
        services,
        dbs: dbsArray,
        selectedDB,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default DatabaseContext;
export function useDatabaseContext() {
  return useContext(Context);
}
