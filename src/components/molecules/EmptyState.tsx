import { View } from 'react-native';
import { Text } from '../atoms/Text';
import { useTheme } from '../../hooks/useTheme';
/** Lista vacía con una explicación específica del recurso. */
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
