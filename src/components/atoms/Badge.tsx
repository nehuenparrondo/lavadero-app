import { View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../hooks/useTheme';
/** Etiqueta compacta con tono semántico. */
export function Badge({
  label,
  tone = 'primary',
}: {
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: colors.soft,
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: '700', color: colors[tone] }}>{label}</Text>
    </View>
  );
}
