import type { ComponentProps } from 'react';
import { ScrollView } from 'react-native';
import type { useScrollControls } from '../../hooks/useScrollControls';
/** Asocia medidas y referencia con un controlador sin introducir otra región desplazable.
 * @param props Propiedades normales de ScrollView y controlador propietario de esta vista.
 * @returns ScrollView con eventos medidos y desplazamiento imperativo seguro.
 */
export function ControlledScrollView({
  controls,
  ...props
}: ComponentProps<typeof ScrollView> & {
  controls: ReturnType<typeof useScrollControls>;
}) {
  return (
    <ScrollView
      {...props}
      ref={controls.ref}
      onScroll={controls.onScroll}
      onLayout={controls.onLayout}
      onContentSizeChange={controls.onContentSizeChange}
      scrollEventThrottle={64}
    />
  );
}
