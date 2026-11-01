import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Explica una colección vacía sin confundirla con carga o error de red.
 * @param props Título del recurso y orientación opcional para el siguiente paso.
 * @returns Panel con ícono decorativo y texto legible con escala de fuente.
 */
export function EmptyState({ title, detail }: { title: string; detail?: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 32,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        backgroundColor: colors.surface,
      }}
    >
      <View style={{ padding: 14, borderRadius: 18, backgroundColor: colors.soft }}>
        <AppIcon name="calendar" size={25} color={colors.primary} />
      </View>
      <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 17 }}>{title}</Text>
      {detail && (
        <Text
          style={{ color: colors.muted, textAlign: 'center', fontSize: 14, lineHeight: 22 }}
        >
          {detail}
        </Text>
      )}
    </View>
  );
}
