import type { useVehicles } from '../../hooks/useVehicles';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Presenta vehicle delete dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: manager. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function VehicleDeleteDialog({ manager }: { manager: ReturnType<typeof useVehicles> }) {
  return (
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
  );
}
