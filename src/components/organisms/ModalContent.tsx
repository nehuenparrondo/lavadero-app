import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { useScrollControls } from '../../hooks/useScrollControls';
import { ControlledScrollView } from '../molecules/ControlledScrollView';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario.
 * @param props Controlador propietario, título, contenido y cierre.
 * @returns Superficie de diálogo limitada al espacio disponible.
 */
export function ModalContent({
  controls,
  title,
  children,
  onClose,
}: PropsWithChildren<{
  controls: ReturnType<typeof useScrollControls>;
  title: string;
  onClose: () => void;
}>) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <ControlledScrollView
        controls={controls}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 24, gap: 18 }}
      >
        <Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: '800' }}>
          {title}
        </Text>
        {children}
        <Button label="Cerrar" onPress={onClose} variant="quiet" />
      </ControlledScrollView>
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
    maxHeight: '90%',
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 1,
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.22)',
  },
});
