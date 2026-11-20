/** Colores semánticos: ninguna pantalla necesita conocer los valores de marca. */
export interface Palette {
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  border: string;
  success: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  soft: string;
  subtle: string;
  navy: string;
  onNavy: string;
  navMuted: string;
  accent: string;
}
/** Azul editorial, superficies neutras y navegación oscura en ambos modos. */
export const palettes: Record<'light' | 'dark', Palette> = {
  light: {
    background: '#F3F6FB',
    surface: '#FFFFFF',
    text: '#172B3F',
    muted: '#607185',
    primary: '#285BE7',
    onPrimary: '#FFFFFF',
    border: '#DCE4EF',
    success: '#157552',
    danger: '#B5364F',
    dangerSoft: '#FFF2F4',
    warning: '#8A5C10',
    soft: '#EDF2FF',
    subtle: '#F8FAFC',
    navy: '#10243C',
    onNavy: '#FFFFFF',
    navMuted: '#AEBFD0',
    accent: '#E1EDAB',
  },
  dark: {
    background: '#0B1120',
    surface: '#151E2E',
    text: '#EDF2F8',
    muted: '#A8B5C7',
    primary: '#8AA8FF',
    onPrimary: '#10182B',
    border: '#2B3A50',
    success: '#63D6B2',
    danger: '#FF9EAA',
    dangerSoft: '#331F2A',
    warning: '#F0C078',
    soft: '#202F49',
    subtle: '#1B2638',
    navy: '#0A1220',
    onNavy: '#FFFFFF',
    navMuted: '#9FAEC3',
    accent: '#9CBEFF',
  },
};
