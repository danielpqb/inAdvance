import { TCustomer } from "@/types/Customer";
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
import { useDatabaseContext } from "./DatabaseContext";

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
const actions = {
  deleteFn: () => {},
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
  actions: typeof actions;

  selectedLoan: TLoan | undefined;
  setSelectedLoan: React.Dispatch<React.SetStateAction<TLoan | undefined>>;
  selectedCustomer: TCustomer | undefined;
  setSelectedCustomer: React.Dispatch<
    React.SetStateAction<TCustomer | undefined>
  >;
};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const NavigationContext: FC<TProps> = ({ children }) => {
  const { services, deleteDB, selectedDB } = useDatabaseContext();

  const [headerStates, setHeaderStates] = useState(
    header as TContext["headerStates"]
  );
  const [footerStates, setFooterStates] = useState(footer);
  const [actionFns, setActionFns] = useState(actions);
  const [navigationStates, setNavigationStates] = useState(navigation);
  const [selectedLoan, setSelectedLoan] = useState(
    undefined as TLoan | undefined
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    undefined as TCustomer | undefined
  );

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
        setActionFns({
          deleteFn: () => {
            if (selectedCustomer?.id) {
              services.customers.remove(selectedCustomer.id);
            }
          },
        });
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
          showSubHeader: !!selectedCustomer?.id,
          subHeaderName: selectedCustomer?.name,
        }));
        setFooterStates({ showFooter: true });
        setActionFns({
          deleteFn: () => {
            if (selectedLoan?.id) {
              services.loans.remove(selectedLoan.id);
            }
          },
        });
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
          subHeaderName: selectedLoan?.customerName,
          subHeaderDescription: selectedLoan?.description,
        }));
        setFooterStates({ showFooter: false });
        break;
      case "/dbs":
        setHeaderStates(() => ({
          title: "Bancos de Dados",
          showAddButton: true,
          showBackButton: false,
          showDeleteButton: false,
        }));
        setFooterStates({ showFooter: true });
        setActionFns({
          deleteFn: async () => {
            await deleteDB(selectedDB);
          },
        });
        break;
      case "/dbs/create":
        setHeaderStates(() => ({
          title: "Novo Banco de Dados",
          showAddButton: false,
          showBackButton: true,
          showDeleteButton: false,
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
        selectedCustomer,
        setSelectedCustomer,
        actions: actionFns,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NavigationContext;
export function useNavigationContext() {
  return useContext(Context);
}
