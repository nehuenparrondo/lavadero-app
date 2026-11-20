import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from './Text';
/** Identidad con iniciales; no carga fotos ni recursos de terceros.
 * @param props - Nombre del perfil; url se conserva por compatibilidad del contrato.
 * @returns Monograma accesible y consistente para todos los roles.
 */
export function Avatar({ name }: { name: string; url?: string | null }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.soft,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.primary, fontSize: 22, fontWeight: '800' }}>
        {name
          .trim()
          .split(/\s+/u)
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase()}
      </Text>
    </View>
  );
}
