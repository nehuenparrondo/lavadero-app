import type { PropsWithChildren } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Panel accesible para formularios y confirmaciones sin ventanas nativas bloqueantes.
 * @param props - Propiedades tipadas: visible, title, onClose, children. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ModalPanel({
  visible,
  title,
  onClose,
  children,
}: PropsWithChildren<{ visible: boolean; title: string; onClose: () => void }>) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.panel, { backgroundColor: colors.surface }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 24, gap: 18 }}
          >
            <Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: '800' }}>
              {title}
            </Text>
            {children}
            <Button label="Cerrar" onPress={onClose} variant="quiet" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', padding: 16 },
  panel: {
    maxHeight: '90%',
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    borderRadius: 24,
  },
});
