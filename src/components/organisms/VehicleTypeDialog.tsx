import { useVehicleTypes } from '../../hooks/useVehicleTypes';
import { vehicleTypeFields } from '../../utils/catalogFields';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Formulario administrativo de categorías utilizadas por las tarifas.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de VehicleTypeDialog con el contrato de propiedades declarado.
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
