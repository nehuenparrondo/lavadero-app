import { useUsers } from '../../hooks/useUsers';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Confirma la baja lógica de una cuenta conservando su historial.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de UserDeleteDialog con el contrato de propiedades declarado.
 */
export function UserDeleteDialog({ m }: { m: ReturnType<typeof useUsers> }) {
  return (
    <ModalPanel
      visible={Boolean(m.deleting)}
      title="Eliminar usuario"
      onClose={m.cancelDelete}
    >
      <Text>
        ¿Querés eliminar a {m.deleting?.firstName} {m.deleting?.lastName}? Sus turnos
        conservarán el historial.
      </Text>
      <Notice error={m.error} />
      <Button
        label="Eliminar usuario"
        variant="danger"
        loading={m.busy}
        onPress={() => {
          void m.remove();
        }}
      />
    </ModalPanel>
  );
}
