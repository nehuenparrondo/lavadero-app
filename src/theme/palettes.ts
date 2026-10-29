/** Tokens semánticos compartidos, para evitar colores en las pantallas. */
export interface Palette {
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  border: string;
  success: string;
}

/** Colores claro/oscuro con superficies y texto contrastantes. */
export const palettes: Record<'light' | 'dark', Palette> = {
  light: {
    background: '#F2F5F8',
    surface: '#FFFFFF',
    text: '#112039',
    muted: '#56647A',
    primary: '#174FDC',
    onPrimary: '#FFFFFF',
    border: '#DCE3EF',
    success: '#11734B',
  },
  dark: {
    background: '#0B1220',
    surface: '#152136',
    text: '#F1F5FF',
    muted: '#ADBCD3',
    primary: '#9DBBFF',
    onPrimary: '#0B214F',
    border: '#2A3A55',
    success: '#71DFB0',
  },
};
