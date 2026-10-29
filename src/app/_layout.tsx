import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { RootNavigation } from '../navigation/RootNavigation';
/** Raíz Expo Router: proveedores separados de rutas y pantallas. */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
/** Export reservado para que Router gestione errores de navegación. */
export { ErrorBoundary } from 'expo-router';
