import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spinner } from '../atoms/Spinner';
import { Text } from '../atoms/Text';
/** Estado visible mientras se verifica sesión o se carga una lista.
 * @param props - Propiedades tipadas: label.
 * @returns Vista de LoadingState con el contrato de propiedades declarado.
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
