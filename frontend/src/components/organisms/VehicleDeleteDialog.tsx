import type { useVehicles } from '../../hooks/useVehicles';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Confirma la baja lógica; el servidor rechaza trabajos pendientes.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de VehicleDeleteDialog con el contrato de propiedades declarado.
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
