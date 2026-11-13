import { StyleSheet } from 'react-native';
/** Geometría de portadas, métricas y accesos; los colores se resuelven en el tema. */
export const overviewStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  metric: { flex: 1, minWidth: 150, padding: 22, borderRadius: 20, borderWidth: 1, gap: 20 },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  metricValue: { fontSize: 32, fontWeight: '700', letterSpacing: -1 },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quick: {
    flex: 1,
    minWidth: 200,
    minHeight: 156,
    padding: 22,
    borderWidth: 1,
    borderRadius: 20,
    gap: 18,
    boxShadow: '0 4px 20px rgba(12, 30, 53, 0.035)',
  },
  quickTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hero: {
    borderRadius: 24,
    padding: 28,
    gap: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: { flex: 1, gap: 18, minWidth: 0 },
  heroTitle: { fontSize: 34, lineHeight: 40, fontWeight: '700', letterSpacing: -1 },
  heroDetail: { fontSize: 14, lineHeight: 23, maxWidth: 380 },
});
