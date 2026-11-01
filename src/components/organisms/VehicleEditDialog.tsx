import type { useVehicles } from '../../hooks/useVehicles';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta vehicle edit dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: manager. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
