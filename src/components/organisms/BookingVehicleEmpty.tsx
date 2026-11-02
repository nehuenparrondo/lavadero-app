import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Próximo paso de una reserva sin vehículos registrados.
 * @param props Indica si se trata de un titular elegido por administración.
 * @returns Explicación y acceso al registro de vehículos del rol.
 */
export function BookingVehicleEmpty({ admin }: { admin: boolean }) {
  const router = useRouter();
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: '700' }}>
        {admin
          ? 'Este cliente todavía no tiene vehículos.'
          : 'Registrá tu auto para reservar tu primer lavado.'}
      </Text>
      <Text>Agregá la patente y los datos del vehículo. Después volvé a esta reserva.</Text>
      <Button
        label="Agregar vehículo"
        icon="car"
        onPress={() => router.push(admin ? '/(admin)/vehicles' : '/(client)/vehicles')}
      />
    </View>
  );
}
