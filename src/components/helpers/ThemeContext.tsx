import React, {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type Mode = "light" | "dark";

interface ContextProps {
  mode: Mode;
  modeSwitcher?: () => void;
}

const Context = React.createContext<ContextProps>({ mode: "dark" });

export const ThemeContext = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<Mode>("dark");

  const modeSwitcher = () =>
    setMode((prevState) => (prevState === "dark" ? "light" : "dark"));

  useLayoutEffect(() => {
    mode === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [mode]);

  return (
    <Context.Provider value={{ mode, modeSwitcher }}>
      {children}
    </Context.Provider>
  );
};

export const useMode = () => useContext(Context);
