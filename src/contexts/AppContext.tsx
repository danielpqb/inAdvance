import { TLoan } from "@/types/Loan";
import { useSegments } from "expo-router";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const header = {
  title: "Clientes",
  showBackButton: false,
  showAddButton: true,
  showDeleteButton: false,
};
const footer = {
  showFooter: true,
};
const navigation = {
  mode: "default" as "default" | "delete",
};

type TSubHeader = {
  showSubHeader?: boolean;
  subHeaderName?: string;
  subHeaderDescription?: string;
};

type TContext = {
  headerStates: typeof header & TSubHeader;
  footerStates: typeof footer;
  navigationStates: typeof navigation;
  changeNavigationMode: (mode: typeof navigation.mode) => void;
  selectedLoan: TLoan;
  setSelectedLoan: React.Dispatch<React.SetStateAction<TLoan>>;
};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const AppContext: FC<TProps> = ({ children }) => {
  const [headerStates, setHeaderStates] = useState(
    header as TContext["headerStates"]
  );
  const [footerStates, setFooterStates] = useState(footer);
  const [navigationStates, setNavigationStates] = useState(navigation);
  const [selectedLoan, setSelectedLoan] = useState({} as TLoan);

  const segments = useSegments();
  useEffect(() => {
    configNavigators();
  }, [segments, navigationStates]);

  function changeNavigationMode(mode: typeof navigation.mode) {
    setNavigationStates((old) => {
      return { ...old, mode: mode };
    });
  }

  function configNavigators() {
    switch (`/${segments.join("/")}`) {
      case "/customers":
        setHeaderStates(() => ({
          title: "Clientes",
          showAddButton: true,
          showBackButton: false,
          showDeleteButton: false,
          showSubHeader: false,
        }));
        setFooterStates({ showFooter: true });
        break;
      case "/customers/create":
        setHeaderStates(() => ({
          title: "Adicionar Cliente",
          showAddButton: false,
          showBackButton: true,
          showDeleteButton: false,
          showSubHeader: false,
        }));
        setFooterStates({ showFooter: false });
        break;
      case "/loans":
        setHeaderStates(() => ({
          title: "Empréstimos",
          showAddButton: true,
          showBackButton: false,
          showDeleteButton: false,
          showSubHeader: false,
        }));
        setFooterStates({ showFooter: true });
        break;
      case "/loans/create":
        setHeaderStates(() => ({
          title: "Novo Empréstimo",
          showAddButton: false,
          showBackButton: true,
          showDeleteButton: false,
          showSubHeader: false,
        }));
        setFooterStates({ showFooter: false });
        break;
      case "/loans/[id]":
        setHeaderStates(() => ({
          title: "Parcelas",
          showAddButton: false,
          showBackButton: true,
          showDeleteButton: false,
          showSubHeader: true,
          subHeaderName: selectedLoan.name,
          subHeaderDescription: selectedLoan.description,
        }));
        setFooterStates({ showFooter: false });
        break;
    }

    if (navigationStates.mode === "delete") {
      setHeaderStates((old) => {
        return {
          ...old,
          showAddButton: false,
          showDeleteButton: true,
          showBackButton: true,
        };
      });
    }
  }

  return (
    <Context.Provider
      value={{
        headerStates,
        footerStates,
        navigationStates,
        changeNavigationMode,
        selectedLoan,
        setSelectedLoan,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
export function useAppContext() {
  return useContext(Context);
}
