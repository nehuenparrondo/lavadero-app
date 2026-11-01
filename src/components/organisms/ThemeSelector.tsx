import type { ThemeMode } from '../../context/ThemeContext';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Edita la preferencia local de apariencia sin cambiar datos del negocio.
 * @param props - Propiedades tipadas: theme.
 * @returns Vista de ThemeSelector con el contrato de propiedades declarado.
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
