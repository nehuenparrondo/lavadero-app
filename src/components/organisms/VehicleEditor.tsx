import type { useVehicles } from '../../hooks/useVehicles';
import { VehicleDeleteDialog } from './VehicleDeleteDialog';
import { VehicleEditDialog } from './VehicleEditDialog';
/** Formularios y confirmación de baja con datos del vehículo seleccionado.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de VehicleEditor con el contrato de propiedades declarado.
 */
export function VehicleEditor({ manager }: { manager: ReturnType<typeof useVehicles> }) {
  return (
    <>
      <VehicleEditDialog manager={manager} />
      <VehicleDeleteDialog manager={manager} />
    </>
  );
}
