import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
/** Indicador de espera con color semántico y descripción accesible.
 * @param props - Propiedades tipadas: color, label. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Spinner({ color, label = 'Cargando' }: { color?: string; label?: string }) {
  const { colors } = useTheme();
  return <ActivityIndicator accessibilityLabel={label} color={color ?? colors.primary} />;
}
