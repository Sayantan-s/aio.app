import type { PropsWithChildren } from 'react';
import React, { useContext, useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

interface ContextProps {
  mode: Mode;
  modeSwitcher?: () => void;
}

const Context = React.createContext<ContextProps>({ mode: 'dark' });

export const ThemeContext = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('mode') as Mode) || 'dark');

  const modeSwitcher = () => {
    const value = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mode', value);
    setMode(value);
  };

  useEffect(() => {
    mode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [mode]);

  return <Context.Provider value={{ mode, modeSwitcher }}>{children}</Context.Provider>;
};

export const useMode = () => useContext(Context);
