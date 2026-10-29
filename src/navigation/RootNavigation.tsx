import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
/** Guardas de navegación derivadas del rol verificado, nunca de un selector de usuario. */
export function RootNavigation() {
  const { user, restoring } = useAuth();
  const { dark, colors } = useTheme();
  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="loading" options={{ headerShown: false }} />
        <Stack.Protected guard={!restoring && !user} redirectTo={restoring ? '/loading' : '/'}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ title: 'Crear cuenta' }} />
        </Stack.Protected>
        <Stack.Protected
          guard={!restoring && Boolean(user)}
          redirectTo={restoring ? '/loading' : '/sign-in'}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="appointment/[id]" options={{ title: 'Detalle del turno' }} />
        </Stack.Protected>
        <Stack.Screen name="oauth" options={{ headerShown: false }} />
        <Stack.Protected guard={!restoring && user?.role === 'client'} redirectTo="/">
          <Stack.Screen name="(client)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!restoring && user?.role === 'employee'} redirectTo="/">
          <Stack.Screen name="(employee)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!restoring && user?.role === 'admin'} redirectTo="/">
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected
          guard={!restoring && (user?.role === 'client' || user?.role === 'admin')}
          redirectTo="/"
        >
          <Stack.Screen
            name="booking"
            options={{ title: 'Reservar turno', presentation: 'modal' }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}
