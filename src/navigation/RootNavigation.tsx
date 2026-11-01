import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { rootRoutes } from '../constants/rootRoutes';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { stackOptions } from '../utils/navigationOptions';
import { hasRouteAccess } from '../utils/routeAccess';
/** Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta.
 * @returns Vista de RootNavigation con el contrato de propiedades declarado.
 */
export function RootNavigation() {
  const { user, restoring } = useAuth();
  const { dark, colors } = useTheme();
  const redirect = restoring ? '/loading' : user ? '/' : '/sign-in';
  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack screenOptions={stackOptions(colors)}>
        {rootRoutes.map((route) => (
          <Stack.Protected
            key={route.name}
            guard={hasRouteAccess(route.access, user, restoring)}
            redirectTo={redirect}
          >
            <Stack.Screen name={route.name} options={route.options} />
          </Stack.Protected>
        ))}
      </Stack>
    </>
  );
}
