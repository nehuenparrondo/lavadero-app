import { Switch, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Conserva la preferencia automática; los cambios claro/oscuro usan el botón flotante.
 * @param props Tema local persistido; no cambia datos de cuenta ni del negocio.
 * @returns Ajuste para seguir el sistema con etiqueta accesible.
 */
export function ThemeSelector({ theme }: { theme: ReturnType<typeof useTheme> }) {
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Apariencia</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <Text style={{ flex: 1 }}>Seguir la apariencia del dispositivo</Text>
        <Switch
          accessibilityLabel="Seguir la apariencia del dispositivo"
          value={theme.mode === 'system'}
          onValueChange={(enabled) =>
            theme.setMode(enabled ? 'system' : theme.dark ? 'dark' : 'light')
          }
        />
      </View>
      <Text>También podés cambiar el tema con el botón de abajo a la derecha.</Text>
    </Card>
  );
}
