import { useWalkInSelection } from './useWalkInSelection';
import { useWalkInResources } from './useWalkInResources';
import { useWalkInActions } from './useWalkInActions';

/** Compone selección, cotización y guardado del ingreso presencial sin mezclar responsabilidades.
 * @returns Modelo del formulario administrativo con resultado confirmado.
 */
export function useWalkIn() {
  const selection = useWalkInSelection();
  const resources = useWalkInResources(selection);
  const actions = useWalkInActions(selection, resources.ready, resources.availability.refresh);
  return { ...selection, ...resources, ...actions };
}
