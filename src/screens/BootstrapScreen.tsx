import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WelcomePanel } from '../components/organisms/WelcomePanel';
import { useTheme } from '../hooks/useTheme';
import { useApiHealth } from '../hooks/useApiHealth';
import { bootstrapStyles as styles } from './bootstrap.styles';

/** Pantalla de etapa 1: solo composición y conexión de hooks. */
export function BootstrapScreen() {
  const { colors } = useTheme();
  const { state, retry } = useApiHealth();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <WelcomePanel state={state} onRetry={retry} />
      </ScrollView>
    </SafeAreaView>
  );
}
