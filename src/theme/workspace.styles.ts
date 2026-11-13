import { StyleSheet } from 'react-native';
import { tokens } from './tokens';
/** Distribución de la aplicación: navegación persistente y una sola región desplazable. */
export const workspaceStyles = StyleSheet.create({
  frame: { flex: 1, flexDirection: 'row' },
  main: { flex: 1, minWidth: 0 },
  sidebar: { width: tokens.sidebarWidth, padding: 24, gap: 32 },
  nav: { gap: 6 },
  navItem: {
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 13,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLabel: { fontSize: 13, fontWeight: '600', flexShrink: 1 },
  user: { flexDirection: 'row', gap: 10, alignItems: 'center', minWidth: 0 },
  header: {
    minHeight: 76,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
  },
  mobileHeader: { paddingHorizontal: 20, minHeight: 70 },
  footer: { marginTop: 'auto', gap: 18, paddingTop: 24, borderTopWidth: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: {
    height: 36,
    width: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: { fontSize: 17, fontWeight: '800', letterSpacing: 1.5 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.8 },
});
