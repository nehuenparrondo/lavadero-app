import type { TextStyle } from 'react-native';
import { Text } from './Text';
/** Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.
 * @param props - Propiedades tipadas: symbol, color, size.
 * @returns Vista de Icon con el contrato de propiedades declarado.
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
