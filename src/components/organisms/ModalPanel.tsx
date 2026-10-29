import { Modal, View, ScrollView } from 'react-native';
import type { PropsWithChildren } from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { useTheme } from '../../hooks/useTheme';
/** Panel accesible para formularios y confirmaciones sin ventanas nativas bloqueantes. */
export function ModalPanel({
  visible,
  title,
  onClose,
  children,
}: PropsWithChildren<{ visible: boolean; title: string; onClose: () => void }>) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <View
          style={{
            maxHeight: '90%',
            width: '100%',
            maxWidth: 620,
            alignSelf: 'center',
            backgroundColor: colors.surface,
            borderRadius: 24,
          }}
        >
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
