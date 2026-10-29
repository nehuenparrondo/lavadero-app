import { StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

/** Layout centrado, desplazable y con ancho legible en teléfono o tablet. */
export const bootstrapStyles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
    width: '100%',
    maxWidth: tokens.maxContentWidth,
    alignSelf: 'center',
  },
});
