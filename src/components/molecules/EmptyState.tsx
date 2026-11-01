import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
/** Lista vacía con una explicación específica del recurso.
 * @param props - Propiedades tipadas: title, detail. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function EmptyState({ title, detail }: { title: string; detail?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center', padding: 32, gap: 10 }}>
      <Text style={{ fontSize: 26, color: colors.primary }}>◇</Text>
      <Text style={{ fontWeight: '700', textAlign: 'center' }}>{title}</Text>
      {detail && <Text style={{ color: colors.muted, textAlign: 'center' }}>{detail}</Text>}
    </View>
  );
}
