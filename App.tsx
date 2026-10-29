import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { BootstrapScreen } from './src/screens/BootstrapScreen';

/** Compone proveedores globales; navegación por rol se agrega en la etapa 6. */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <BootstrapScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
