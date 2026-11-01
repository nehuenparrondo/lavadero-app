import type { useVehicles } from '../../hooks/useVehicles';
import { VehicleDeleteDialog } from './VehicleDeleteDialog';
import { VehicleEditDialog } from './VehicleEditDialog';
/** Formularios y confirmación de baja con datos del vehículo seleccionado.
 * @param props - Propiedades tipadas: manager. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function VehicleEditor({ manager }: { manager: ReturnType<typeof useVehicles> }) {
  return (
    <>
      <VehicleEditDialog manager={manager} />
      <VehicleDeleteDialog manager={manager} />
    </>
  );
}
