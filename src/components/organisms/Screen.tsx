import type { PropsWithChildren } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
/** Layout móvil desplazable, ancho legible en tablet y pull-to-refresh opcional.
 * @param props - Propiedades tipadas: children, refreshing, onRefresh. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Screen({
  children,
  refreshing = false,
  onRefresh,
}: {
  children: PropsWithChildren['children'];
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 48,
    gap: 20,
    flexGrow: 1,
  },
});
