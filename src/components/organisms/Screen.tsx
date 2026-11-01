import type { PropsWithChildren } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { tokens } from '../../theme/tokens';
import { WorkspaceFrame } from './WorkspaceFrame';
/** Superficie de pantalla con una única región desplazable y actualización opcional.
 * @param props Contenido, estado de carga y operación de recarga; no ejecuta consultas propias.
 * @returns Marco adaptable con áreas seguras, ancho legible y soporte de teclado/formularios.
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
  const { wide } = useWorkspaceLayout();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <WorkspaceFrame>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, wide && styles.wide]}
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
      </WorkspaceFrame>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: tokens.maxContentWidth,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
    gap: 24,
    flexGrow: 1,
  },
  wide: { padding: 36, gap: 28 },
});
