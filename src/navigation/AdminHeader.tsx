import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '../components/atoms/Icon';
import { Text } from '../components/atoms/Text';
import { AdminMenu } from '../components/organisms/AdminMenu';
import { useTheme } from '../hooks/useTheme';
import { adminHeaderStyles as styles } from '../theme/adminHeader.styles';
/** Encabezado adaptable; el menú y sus rutas están separados de la presentación.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AdminHeader() {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  return (
    <>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.brand, { color: colors.primary }]}>LAVADERO</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menú de administración"
          onPress={() => setOpen(true)}
          style={styles.toggle}
        >
          <Icon symbol="☰" size={20} />
        </Pressable>
      </View>
      <AdminMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
