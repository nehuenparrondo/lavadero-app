import { ModalPanel } from './ModalPanel';
import { EntityForm } from './EntityForm';
import { Notice } from '../molecules/Notice';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import type { useVehicles } from '../../hooks/useVehicles';
/** Formularios y confirmación de baja con datos del vehículo seleccionado. */
export function VehicleEditor({ manager }: { manager: ReturnType<typeof useVehicles> }) {
  return (
    <>
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
      <ModalPanel
        visible={Boolean(manager.deleting)}
        title="Eliminar vehículo"
        onClose={manager.cancelDelete}
      >
        <Text>
          ¿Querés eliminar {manager.deleting?.plate}? Los turnos pasados conservarán su
          historial.
        </Text>
        <Notice error={manager.error} />
        <Button
          label="Eliminar vehículo"
          variant="danger"
          loading={manager.busy}
          onPress={() => {
            void manager.remove();
          }}
        />
      </ModalPanel>
    </>
  );
}
