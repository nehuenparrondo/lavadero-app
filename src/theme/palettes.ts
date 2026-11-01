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
    background: '#F4F6F8',
    surface: '#FFFFFF',
    text: '#172B3F',
    muted: '#607185',
    primary: '#285BE7',
    onPrimary: '#FFFFFF',
    border: '#E2E8EE',
    success: '#157552',
    danger: '#B5364F',
    warning: '#8A5C10',
    soft: '#EDF2FF',
    subtle: '#F8FAFC',
    navy: '#12283F',
    onNavy: '#FFFFFF',
    navMuted: '#AEBFD0',
    accent: '#E1EDAB',
  },
  dark: {
    background: '#0C1623',
    surface: '#162536',
    text: '#F1F5FA',
    muted: '#ADBCD0',
    primary: '#A8C1FF',
    onPrimary: '#142B55',
    border: '#2A3C50',
    success: '#7ADDB2',
    danger: '#FFADBC',
    warning: '#F3CE83',
    soft: '#223853',
    subtle: '#1B2D41',
    navy: '#0F2236',
    onNavy: '#FFFFFF',
    navMuted: '#AEBFD0',
    accent: '#E1EDAB',
  },
};
