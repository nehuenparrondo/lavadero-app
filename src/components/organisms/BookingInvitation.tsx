import { useRouter } from 'expo-router';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';

/** Presenta booking invitation con datos y acciones recibidos de su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function BookingInvitation() {
  const router = useRouter();
  return (
    <Card>
      <Text style={{ fontSize: 26, fontWeight: '800' }}>Tu próximo lavado empieza acá.</Text>
      <Text>Elegí tu vehículo, los servicios y el horario que te quede cómodo.</Text>
      <Button label="Reservar mi lavado" onPress={() => router.push('/booking')} />
    </Card>
  );
}
