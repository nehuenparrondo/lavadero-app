import type { Href } from 'expo-router';
import type { IconName } from './icon';
/** Destino visible de un rol; las guardas raíz y la API siguen controlando el acceso. */
export interface NavigationItem {
  label: string;
  href: Href;
  /** URL pública sin grupo de Expo Router, usada solo para marcar la sección activa. */
  path: string;
  icon: IconName;
}
