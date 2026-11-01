import { StyleSheet } from 'react-native';
/** Composición de la presentación de acceso; su contraste se resuelve con la paleta. */
export const signInStyles = StyleSheet.create({
  presentation: { flex: 1, gap: 32, padding: 32, borderRadius: 24, justifyContent: 'center' },
  title: { fontSize: 40, lineHeight: 46, fontWeight: '700', letterSpacing: -1 },
  detail: { fontSize: 16, lineHeight: 26 },
  illustration: { alignItems: 'center' },
});
