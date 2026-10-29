import { createContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palettes } from '../theme/palettes';
import type { Palette } from '../theme/palettes';
/** Preferencia manual o seguimiento del sistema. */
export type ThemeMode = 'system' | 'light' | 'dark';
interface ThemeValue {
  mode: ThemeMode;
  dark: boolean;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
}
/** Contexto de tema persistente, sin datos de autenticación. */
export const ThemeContext = createContext<ThemeValue | undefined>(undefined);
/** Provee paleta y restaura preferencia desde almacenamiento no sensible. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  useEffect(() => {
    void AsyncStorage.getItem('lavadero.theme')
      .then((value) => {
        if (value === 'light' || value === 'dark' || value === 'system') setModeState(value);
      })
      .catch(() => {});
  }, []);
  const resolved = mode === 'system' ? (system ?? 'light') : mode;
  const setMode = (next: ThemeMode) => {
    setModeState(next);
    void AsyncStorage.setItem('lavadero.theme', next).catch(() => {});
  };
  const value = useMemo(
    () => ({ mode, dark: resolved === 'dark', colors: palettes[resolved], setMode }),
    [mode, resolved],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
