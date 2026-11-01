import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spinner } from '../atoms/Spinner';
import { Text } from '../atoms/Text';
/** Estado visible mientras se verifica sesión o se carga una lista.
 * @param props - Propiedades tipadas: label. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function LoadingState({ label = 'Cargando…' }: { label?: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 14,
        backgroundColor: colors.background,
      }}
    >
      <Spinner color={colors.primary} />
      <Text>{label}</Text>
    </View>
  );
}
