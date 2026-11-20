import { Platform } from 'react-native';
import type { SvgProps } from 'react-native-svg';

/** Oculta los íconos decorativos sin enviar atributos nativos booleanos al DOM web.
 * @returns Atributos accesibles del SVG para la plataforma actual.
 */
export function decorativeSvgProps(): SvgProps {
  return Platform.OS === 'web'
    ? { 'aria-hidden': true, focusable: false }
    : { accessible: false };
}
