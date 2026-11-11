import { useRouter } from 'expo-router';
import { Button } from '../atoms/Button';
import { PageHeading } from '../molecules/PageHeading';
/** Presentación del tablero y su acción prioritaria de reserva asistida.
 * @returns Saludo de la sesión y acceso al formulario existente, sin pedir datos extra.
 */
export function DashboardHeading() {
  const router = useRouter();
  return (
    <PageHeading
      eyebrow="Vista general"
      title="Tu lavadero, al día."
      detail="Revisá solicitudes, verificá lavados y organizá al equipo."
      action={
        <Button label="Nueva reserva" icon="plus" onPress={() => router.push('/booking')} />
      }
    />
  );
}
