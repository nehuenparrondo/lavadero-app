import { useRouter } from 'expo-router';
import { Button } from '../atoms/Button';
import { PageHeading } from '../molecules/PageHeading';
/** Presentación del tablero y su acción prioritaria de ingreso presencial.
 * @returns Saludo de la sesión y acceso al registro rápido de autos sin turno.
 */
export function DashboardHeading() {
  const router = useRouter();
  return (
    <PageHeading
      eyebrow="Vista general"
      title="Tu lavadero, al día."
      detail="Revisá solicitudes, verificá lavados y organizá al equipo."
      action={
        <Button
          label="Auto sin turno"
          icon="plus"
          onPress={() => router.push('/(admin)/walk-in')}
        />
      }
    />
  );
}
