import { useUsers } from '../../hooks/useUsers';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Presenta user delete dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
