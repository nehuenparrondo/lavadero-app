import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from './Text';
/** Etiqueta compacta con tono semántico.
 * @param props - Propiedades tipadas: label, tone. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
