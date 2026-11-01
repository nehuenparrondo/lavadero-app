import type { useCatalog } from '../../hooks/useCatalog';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Presenta service delete dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: c. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ServiceDeleteDialog({ c }: { c: ReturnType<typeof useCatalog> }) {
  return (
    <ModalPanel
      visible={Boolean(c.deleting)}
      title="Eliminar servicio"
      onClose={() => c.setDeleting(null)}
    >
      <Text>
        ¿Querés eliminar {c.deleting?.name}? Los turnos anteriores conservarán sus precios y
        descripción.
      </Text>
      <Notice error={c.action.error} />
      <Button
        label="Eliminar servicio"
        variant="danger"
        loading={c.action.busy}
        onPress={() => {
          void c.remove();
        }}
      />
    </ModalPanel>
  );
}
