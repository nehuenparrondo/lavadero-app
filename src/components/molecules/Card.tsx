import { View, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useTheme } from '../../hooks/useTheme';
/** Superficie reutilizable de lectura y formularios. */
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
