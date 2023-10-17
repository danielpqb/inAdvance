import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import * as SystemUI from "expo-system-ui";
import { gSC } from "@/styles/global";

type TContext = {
  theme: boolean;
  toggleTheme: () => void;
};
const Context = createContext<TContext>({} as TContext);

type TProps = {
  children: ReactNode;
};
const ThemeContext: FC<TProps> = ({ children }) => {
  const [theme, setTheme] = useState(false);

  function toggleTheme() {
    setTheme(!theme);
  }

  const backgroundColor = (() => {
    const darkBg = gSC("zinc800") ?? "#27272a";
    const lightBg = gSC("zinc100") ?? "#f4f4f5";
    return theme ? lightBg : darkBg;
  })();
  SystemUI.setBackgroundColorAsync(backgroundColor);

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      {children}
    </Context.Provider>
  );
};

export default ThemeContext;
export function useThemeContext() {
  return useContext(Context);
}
