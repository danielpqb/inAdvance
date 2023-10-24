import NavigationDrawer from "@/components/Navigation/NavigationDrawer";
import AppContext from "@/contexts/AppContext";
import ThemeContext from "@/contexts/ThemeContext";
import { ReactNode, FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DatabaseContext from "@/contexts/DatabaseContext";

const queryClient = new QueryClient();

type TContextsProps = {
  children: ReactNode;
};
const Contexts: FC<TContextsProps> = ({ children }) => {
  return (
    <AppContext>
      <ThemeContext>
        <QueryClientProvider client={queryClient}>
          <DatabaseContext>{children}</DatabaseContext>
        </QueryClientProvider>
      </ThemeContext>
    </AppContext>
  );
};

export default function Root() {
  return (
    <>
      <Contexts>
        <NavigationDrawer />
      </Contexts>
    </>
  );
}
