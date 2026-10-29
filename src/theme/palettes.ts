/** Paleta semántica para temas claro y oscuro. */
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
}
/** Colores centrales: los componentes no definen colores de marca propios. */
export const palettes: Record<'light' | 'dark', Palette> = {
  light: {
    background: '#F3F5FA',
    surface: '#FFFFFF',
    text: '#14243C',
    muted: '#596A82',
    primary: '#2359DF',
    onPrimary: '#FFFFFF',
    border: '#DEE5F0',
    success: '#11734B',
    danger: '#B32843',
    warning: '#946200',
    soft: '#E9EFFF',
  },
  dark: {
    background: '#0B1220',
    surface: '#142138',
    text: '#F0F5FF',
    muted: '#ADBCD3',
    primary: '#A3BEFF',
    onPrimary: '#0D2250',
    border: '#2A3C58',
    success: '#79DDB2',
    danger: '#FFA6B5',
    warning: '#EFCB77',
    soft: '#203452',
  },
};
