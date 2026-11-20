import type { ComponentProps } from 'react';
import { ScrollView, View } from 'react-native';
import { useScrollControls } from '../../hooks/useScrollControls';
import { ControlledScrollView } from '../molecules/ControlledScrollView';
import { FloatingControls } from '../molecules/FloatingControls';
/** Superficie acotada que mantiene los controles fuera del contenido desplazable.
 * @param props Propiedades del contenido desplazable, incluidos recarga y estilos.
 * @returns Una única región de scroll y botones flotantes comunes a todos los roles.
 */
export function ScrollSurface(props: ComponentProps<typeof ScrollView>) {
  const controls = useScrollControls();
  return (
    <View style={{ flex: 1, minHeight: 0 }}>
      <ControlledScrollView {...props} controls={controls} />
      <FloatingControls showTop={controls.showTop} toTop={controls.toTop} />
    </View>
  );
}
