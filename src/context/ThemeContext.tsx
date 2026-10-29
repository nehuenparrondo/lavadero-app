import { createContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { palettes } from '../theme/palettes';
import type { Palette } from '../theme/palettes';

/** Preferencia manual o seguimiento del sistema. */
export type ThemeMode = 'system' | 'light' | 'dark';
interface ThemeValue {
  mode: ThemeMode;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
}
/** Contexto privado consumido a través de useTheme. */
export const ThemeContext = createContext<ThemeValue | undefined>(undefined);

/** Provee tema en memoria. Su persistencia se implementa en la etapa 9. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const resolved = mode === 'system' ? (system ?? 'light') : mode;
  const value = useMemo(
    () => ({ mode, colors: palettes[resolved], setMode }),
    [mode, resolved],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
