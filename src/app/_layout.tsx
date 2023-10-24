import AppContext from "@/contexts/AppContext";
import ThemeContext from "@/contexts/ThemeContext";
import { ReactNode, FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DatabaseContext from "@/contexts/DatabaseContext";
import { Slot } from "expo-router";
import Header from "@/components/Navigation/Header";
import NavigationContext from "@/contexts/NavigationContext";
import Footer from "@/components/Navigation/Footer";

const queryClient = new QueryClient();

type TContextsProps = {
  children: ReactNode;
};
const Contexts: FC<TContextsProps> = ({ children }) => {
  return (
    <AppContext>
      <ThemeContext>
        <QueryClientProvider client={queryClient}>
          <DatabaseContext>
            <NavigationContext>{children}</NavigationContext>
          </DatabaseContext>
        </QueryClientProvider>
      </ThemeContext>
    </AppContext>
  );
};

export default function Root() {
  return (
    <>
      <Contexts>
        <Header />
        <Slot />
        <Footer />
      </Contexts>
    </>
  );
}
