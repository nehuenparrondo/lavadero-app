import type { useVehicles } from '../../hooks/useVehicles';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Formulario del vehículo con titular controlado por rol y servidor.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de VehicleEditDialog con el contrato de propiedades declarado.
 */
export function VehicleEditDialog({ manager }: { manager: ReturnType<typeof useVehicles> }) {
  return (
    <ModalPanel
      visible={manager.open}
      title={manager.editing ? 'Editar vehículo' : 'Agregar vehículo'}
      onClose={manager.close}
    >
      <Notice error={manager.error || manager.optionsError} />
      <EntityForm
        key={manager.editing?.id ?? 'new'}
        fields={manager.fields}
        initialValues={manager.initialValues}
        onSubmit={manager.save}
        busy={manager.busy}
      />
    </ModalPanel>
  );
}
