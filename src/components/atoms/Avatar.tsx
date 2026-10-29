import { Image, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../hooks/useTheme';
/** Foto opcional o iniciales del perfil, sin datos de otros clientes. */
export function Avatar({ name, url }: { name: string; url?: string | null }) {
  const { colors } = useTheme();
  return url ? (
    <Image
      source={{ uri: url }}
      style={{ width: 56, height: 56, borderRadius: 28 }}
      accessibilityLabel={`Foto de ${name}`}
    />
  ) : (
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
        {name.trim().slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}
