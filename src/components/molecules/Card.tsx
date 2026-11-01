import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
/** Superficie reutilizable de lectura y formularios.
 * @param props - Propiedades tipadas: children. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Card({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 20, borderWidth: 1, gap: 14 },
});
