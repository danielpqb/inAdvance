import NavigationDrawer from "@/components/Navigation/NavigationDrawer";
import AppContext from "@/contexts/AppContext";
import ThemeContext from "@/contexts/ThemeContext";
import { ReactNode, FC } from "react";

type TContextsProps = {
  children: ReactNode;
};
const Contexts: FC<TContextsProps> = ({ children }) => {
  return (
    <AppContext>
      <ThemeContext>{children}</ThemeContext>
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
