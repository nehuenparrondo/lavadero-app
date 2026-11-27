import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
/** Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.
 * @param props Columna principal y apoyo contextual, ya construidos por la pantalla.
 * @returns Contenedor que conserva el orden de lectura principal antes del secundario.
 */
export function OverviewColumns({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary: ReactNode;
}) {
  const { columns } = useWorkspaceLayout();
  return (
    <View
      style={{ flexDirection: columns ? 'row' : 'column', gap: 24, alignItems: 'stretch' }}
    >
      <View style={[{ minWidth: 0, gap: 18 }, columns && { flex: 2 }]}>{primary}</View>
      <View style={[{ minWidth: 0, gap: 18 }, columns && { flex: 1 }]}>{secondary}</View>
    </View>
  );
}
