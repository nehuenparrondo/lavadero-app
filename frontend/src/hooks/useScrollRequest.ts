import { useEffect } from 'react';
import type { ComponentRef, RefObject } from 'react';
import type { ScrollView } from 'react-native';

/** Un identificador nuevo representa un gesto explícito, nunca una recarga automática. */
export interface ScrollRequest {
  id: number;
  edge: 'top' | 'bottom';
}

/** Lleva al resumen dentro del scroll existente, sin mover ventanas ni diálogos ajenos.
 * @param ref Región desplazable propietaria de la pantalla.
 * @param request Solicitud nueva de navegación dentro del contenido, si la hubo.
 * @returns void; no desplaza por cambios de datos, sondeo o renderizados posteriores.
 */
export function useScrollRequest(
  ref: RefObject<ComponentRef<typeof ScrollView> | null>,
  request?: ScrollRequest,
) {
  useEffect(() => {
    if (!request) return;
    if (request.edge === 'bottom') ref.current?.scrollToEnd({ animated: true });
    else ref.current?.scrollTo({ y: 0, animated: true });
  }, [ref, request?.id, request?.edge]);
}
