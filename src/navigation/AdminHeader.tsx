import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { ModalPanel } from '../components/organisms/ModalPanel';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { useTheme } from '../hooks/useTheme';
const items = [
  ['dashboard', 'Tablero'],
  ['appointments', 'Turnos'],
  ['users', 'Usuarios'],
  ['services', 'Servicios y precios'],
  ['reports', 'Reportes'],
  ['settings', 'Configuración'],
  ['profile', 'Perfil'],
] as const;
/** Menú administrativo accesible en teléfono y tablet. */
export function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 14,
          backgroundColor: colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontWeight: '900', color: colors.primary, letterSpacing: 2 }}>
          LAVADERO
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menú de administración"
          onPress={() => setOpen(true)}
          style={{ padding: 10 }}
        >
          <Text style={{ fontSize: 20 }}>☰</Text>
        </Pressable>
      </View>
      <ModalPanel visible={open} title="Administración" onClose={() => setOpen(false)}>
        {items.map(([path, label]) => (
          <Button
            key={path}
            label={label}
            variant="secondary"
            onPress={() => {
              setOpen(false);
              router.push(`/(admin)/${path}` as Href);
            }}
          />
        ))}
      </ModalPanel>
    </>
  );
}
