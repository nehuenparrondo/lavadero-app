import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { overviewStyles as s } from '../../theme/overview.styles';
import { QuickAction } from '../molecules/QuickAction';
/** Tareas de preparación antes de reservar; no duplica consultas del catálogo.
 * @returns Accesos a los vehículos propios y al catálogo vigente.
 */
export function ClientQuickActions() {
  const router = useRouter();
  return (
    <View style={s.row}>
      <QuickAction
        title="Tu garage"
        detail="Tus vehículos, siempre a mano."
        icon="car"
        onPress={() => router.push('/(client)/vehicles')}
      />
      <QuickAction
        title="Un cuidado a medida"
        detail="Explorá servicios y precios."
        icon="sparkles"
        onPress={() => router.push('/(client)/services')}
      />
    </View>
  );
}
