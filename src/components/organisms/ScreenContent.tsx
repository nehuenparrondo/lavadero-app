import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { tokens } from '../../theme/tokens';
import { ScrollSurface } from './ScrollSurface';
/** Contenido común con espacio reservado para los controles flotantes.
 * @param props Contenido y recarga manual opcional de la pantalla.
 * @returns Una sola región de scroll dentro del marco del usuario.
 */
export function ScreenContent({
  children,
}: PropsWithChildren<{
  refreshing: boolean;
  onRefresh?: (() => void | Promise<void>) | undefined;
}>) {
  const { wide } = useWorkspaceLayout();
  return (
    <ScrollSurface
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.content, wide && styles.wide]}
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
