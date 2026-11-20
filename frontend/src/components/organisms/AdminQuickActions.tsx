import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { overviewStyles as s } from '../../theme/overview.styles';
import { QuickAction } from '../molecules/QuickAction';
/** Accesos operativos que complementan la navegación administrativa.
 * @returns Ingreso sin turno, gestión del equipo y catálogo editable.
 */
export function AdminQuickActions() {
  const router = useRouter();
  return (
    <View style={s.row}>
      <QuickAction
        title="Auto sin turno"
        detail="Registrá la llegada con su patente y servicios."
        icon="plus"
        onPress={() => router.push('/(admin)/walk-in')}
      />
      <QuickAction
        title="Clientes y equipo"
        detail="Gestioná cuentas y permisos."
        icon="users"
        onPress={() => router.push('/(admin)/users')}
      />
      <QuickAction
        title="Servicios y precios"
        detail="Mantené tu catálogo al día."
        icon="sparkles"
        onPress={() => router.push('/(admin)/services')}
      />
    </View>
  );
}
