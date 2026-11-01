import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
/** Indicador de espera con color semántico y descripción accesible.
 * @param props - Propiedades tipadas: color, label.
 * @returns Vista de Spinner con el contrato de propiedades declarado.
 */
export function Spinner({ color, label = 'Cargando' }: { color?: string; label?: string }) {
  const { colors } = useTheme();
  return <ActivityIndicator accessibilityLabel={label} color={color ?? colors.primary} />;
}
