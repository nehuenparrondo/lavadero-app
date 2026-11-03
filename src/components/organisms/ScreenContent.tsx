import type { PropsWithChildren } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { tokens } from '../../theme/tokens';
import { ScrollSurface } from './ScrollSurface';
/** Contenido común con espacio reservado para los controles flotantes.
 * @param props Contenido y recarga manual opcional de la pantalla.
 * @returns Una sola región de scroll dentro del marco del usuario.
 */
export function ScreenContent({
  children,
  refreshing,
  onRefresh,
}: PropsWithChildren<{
  refreshing: boolean;
  onRefresh?: (() => void | Promise<void>) | undefined;
}>) {
  const { colors } = useTheme();
  const { wide } = useWorkspaceLayout();
  const refreshControl = onRefresh ? (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
  ) : undefined;
  return (
    <ScrollSurface
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.content, wide && styles.wide]}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollSurface>
  );
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: tokens.maxContentWidth,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 112,
    gap: 24,
    flexGrow: 1,
  },
  wide: { padding: 36, paddingBottom: 112, gap: 28 },
});
