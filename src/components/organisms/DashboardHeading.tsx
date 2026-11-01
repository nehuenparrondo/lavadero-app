import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../atoms/Button';
import { PageHeading } from '../molecules/PageHeading';
/** Presentación del tablero y su acción prioritaria de reserva asistida.
 * @returns Saludo de la sesión y acceso al formulario existente, sin pedir datos extra.
 */
export function DashboardHeading() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <PageHeading
      eyebrow="Vista general"
      title="El día, bajo control."
      detail={(user?.firstName ?? '') + ', este es el pulso de tu lavadero.'}
      action={
        <Button label="Nueva reserva" icon="plus" onPress={() => router.push('/booking')} />
      }
    />
  );
}
