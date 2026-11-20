import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { useScrollControls } from '../../hooks/useScrollControls';
import { ControlledScrollView } from '../molecules/ControlledScrollView';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { CompactIconButton } from '../atoms/CompactIconButton';
/** Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario.
 * @param props Controlador propietario, título, contenido y cierre.
 * @returns Superficie de diálogo limitada al espacio disponible.
 */
export function ModalContent({
  controls,
  title,
  children,
  onClose,
  compact = false,
}: PropsWithChildren<{
  controls: ReturnType<typeof useScrollControls>;
  title: string;
  onClose: () => void;
  compact?: boolean;
}>) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <ControlledScrollView
        controls={controls}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: compact ? 12 : 24, gap: compact ? 12 : 18 }}
      >
        <ModalHeading title={title} compact={compact} onClose={onClose} />
        {children}
        {!compact && <Button label="Cerrar" onPress={onClose} variant="quiet" />}
      </ControlledScrollView>
    </View>
  );
}
/** El calendario conserva un cierre visible sin desplazar hasta el final del mes. */
function ModalHeading({
  title,
  compact,
  onClose,
}: {
  title: string;
  compact: boolean;
  onClose: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text
        accessibilityRole="header"
        style={{ flex: 1, minWidth: 0, fontSize: 24, fontWeight: '800' }}
      >
        {title}
      </Text>
      {compact && <CompactIconButton icon="close" label="Cerrar" onPress={onClose} />}
    </View>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 88,
  },
  panel: {
    maxHeight: '100%',
    flexShrink: 1,
    minHeight: 0,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 1,
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.22)',
  },
});
