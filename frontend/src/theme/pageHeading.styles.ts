import { StyleSheet } from 'react-native';
/** Jerarquía tipográfica del encabezado principal, sin acoplarlo a colores o rutas. */
export const pageHeadingStyles = StyleSheet.create({
  row: { gap: 20 },
  copy: { flex: 1, gap: 8 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.8 },
  title: { fontWeight: '700', letterSpacing: -1 },
  detail: { fontSize: 14, lineHeight: 22 },
});
