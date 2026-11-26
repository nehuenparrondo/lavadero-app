import type { useSignOutConfirmation } from '../../hooks/useSignOutConfirmation';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';

/** La cuenta permanece abierta hasta confirmar; cancelar o cerrar el diálogo no revoca la sesión.
 * @param props Estado y comandos de salida; compartidos por todos los roles y plataformas.
 * @returns Confirmación accesible con acción de salida, cancelación y errores de almacenamiento.
 */
export function SignOutDialog({ exit }: { exit: ReturnType<typeof useSignOutConfirmation> }) {
  return (
    <ModalPanel
      visible={exit.open}
      title="¿Querés cerrar sesión?"
      onClose={exit.close}
      compact
    >
      <Text>Para volver a usar Lavadero vas a tener que iniciar sesión nuevamente.</Text>
      <Notice error={exit.error} />
      <Button
        label="Sí, cerrar sesión"
        icon="logout"
        variant="danger"
        loading={exit.busy}
        onPress={() => {
          void exit.confirm();
        }}
      />
      <Button
        label="Seguir en mi cuenta"
        variant="quiet"
        disabled={exit.busy}
        onPress={exit.close}
      />
    </ModalPanel>
  );
}
