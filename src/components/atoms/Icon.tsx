import type { TextStyle } from 'react-native';
import { Text } from './Text';
/** Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.
 * @param props - Propiedades tipadas: symbol, color, size. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Icon({
  symbol,
  color,
  size = 24,
}: {
  symbol: string;
  color?: TextStyle['color'];
  size?: number;
}) {
  return (
    <Text accessible={false} style={{ fontSize: size, ...(color ? { color } : {}) }}>
      {symbol}
    </Text>
  );
}
