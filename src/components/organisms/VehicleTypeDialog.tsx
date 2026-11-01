import { useVehicleTypes } from '../../hooks/useVehicleTypes';
import { vehicleTypeFields } from '../../utils/catalogFields';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta vehicle type dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function VehicleTypeDialog({ m }: { m: ReturnType<typeof useVehicleTypes> }) {
  return (
    <ModalPanel
      visible={m.open}
      title={m.editing ? 'Editar tipo' : 'Nuevo tipo'}
      onClose={m.close}
    >
      <Notice error={m.action.error} />
      <EntityForm
        key={m.editing?.id ?? 'new'}
        fields={vehicleTypeFields}
        initialValues={{
          name: m.editing?.name ?? '',
          isActive: String(m.editing?.isActive ?? true),
        }}
        onSubmit={m.save}
        busy={m.action.busy}
      />
    </ModalPanel>
  );
}
