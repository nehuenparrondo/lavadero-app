import { Stack } from 'expo-router';
import { AdminHeader } from '../../navigation/AdminHeader';
/** Navegación administrativa con menú de siete destinos y guardas en raíz. */
export default function AdminLayout() {
  return <Stack screenOptions={{ header: () => <AdminHeader /> }} />;
}
