import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../atoms/Button';

/** Lleva directamente a las dos bandejas que requieren atención administrativa.
 * @param props Cantidad global de solicitudes pendientes consultada por el tablero.
 * @returns Accesos iguales y adaptables, sin un filtro de fecha oculto.
 */
export function AdminQueueLinks({ pending }: { pending: number | undefined }) {
  const router = useRouter();
  const open = (view: string) =>
    router.push({ pathname: '/(admin)/appointments', params: { view } });
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <View style={{ flex: 1, minWidth: 220 }}>
        <Button
          label={`Nuevas solicitudes${pending === undefined ? '' : ` (${pending})`}`}
          variant="secondary"
          onPress={() => open('new')}
        />
      </View>
      <View style={{ flex: 1, minWidth: 220 }}>
        <Button label="Verificar lavados" variant="secondary" onPress={() => open('review')} />
      </View>
    </View>
  );
}
