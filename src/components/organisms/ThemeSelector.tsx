import type { ThemeMode } from '../../context/ThemeContext';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Presenta theme selector con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: theme. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ThemeSelector({ theme }: { theme: ReturnType<typeof useTheme> }) {
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Apariencia</Text>
      <ChoiceGroup
        value={theme.mode}
        onChange={(value) => theme.setMode(value as ThemeMode)}
        options={[
          { value: 'system', label: 'Sistema' },
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Oscuro' },
        ]}
      />
    </Card>
  );
}
