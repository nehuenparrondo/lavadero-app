import { Children, isValidElement } from 'react';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
/** Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.
 * @param props Tarjetas del catálogo o colección, sin alterar sus acciones ni datos.
 * @returns Una columna en móvil o dos cuando el ancho y la escala de texto lo permiten.
 */
export function ResponsiveGrid({ children }: PropsWithChildren) {
  const { columns } = useWorkspaceLayout();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {Children.toArray(children).map((child, index) => (
        <View
          key={isValidElement(child) ? (child.key ?? index) : index}
          style={{ width: columns ? '48.5%' : '100%', flexGrow: columns ? 1 : 0, minWidth: 0 }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
