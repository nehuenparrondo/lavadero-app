import type { Palette } from '../theme/palettes';
/** Apariencia común del stack; las pantallas no redefinen colores de navegación.
 * @param colors - Paleta semántica resuelta para el tema actual.
 * @returns `{ headerStyle: { backgroundColor: string; }; headerTintColor: string; contentStyle: { backgroundColor: string; }; }`.
 */
export function stackOptions(colors: Palette) {
  return {
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    contentStyle: { backgroundColor: colors.background },
  };
}
/** Barra inferior con áreas táctiles y etiquetas consistentes para Cliente y Empleado.
 * @param colors - Paleta semántica resuelta para el tema actual.
 * @returns Objeto con headerStyle, headerTintColor, tabBarActiveTintColor, tabBarInactiveTintColor, tabBarStyle, tabBarLabelStyle.
 */
export function tabOptions(colors: Palette) {
  return {
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      minHeight: 66,
      paddingBottom: 8,
    },
    tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const },
  };
}
