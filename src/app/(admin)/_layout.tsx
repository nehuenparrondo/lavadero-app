import { Stack } from 'expo-router';
/** Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable.
 * @returns Stack sin cabeceras duplicadas; las guardas permanecen en RootNavigation.
 */
export default function AdminLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
