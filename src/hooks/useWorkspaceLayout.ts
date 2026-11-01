import { useWindowDimensions } from 'react-native';
import { tokens } from '../theme/tokens';
/** Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono.
 * @returns Breakpoints compartidos; nunca fija ni bloquea la orientación del dispositivo.
 */
export function useWorkspaceLayout() {
  const { width, fontScale } = useWindowDimensions();
  return {
    wide: width / Math.max(1, fontScale) >= tokens.breakpoint.sidebar,
    columns: width / Math.max(1, fontScale) >= tokens.breakpoint.columns,
  };
}
