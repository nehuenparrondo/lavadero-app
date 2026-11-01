import { Stack } from 'expo-router';
import { AdminHeader } from '../../navigation/AdminHeader';
/** Navegación administrativa con menú de siete destinos y guardas en raíz.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function AdminLayout() {
  return <Stack screenOptions={{ header: () => <AdminHeader /> }} />;
}
