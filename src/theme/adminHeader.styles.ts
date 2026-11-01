import { StyleSheet } from 'react-native';
import { tokens } from './tokens';
/** Geometría del encabezado; las superficies se toman del tema en el componente. */
export const adminHeaderStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  brand: { fontWeight: '900', letterSpacing: 2, fontSize: tokens.fontSize.body },
  toggle: { padding: 10 },
});
