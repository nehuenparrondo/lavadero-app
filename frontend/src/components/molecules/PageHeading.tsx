import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { pageHeadingStyles as s } from '../../theme/pageHeading.styles';
import { Text } from '../atoms/Text';
/** Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.
 * @param props Contexto corto, título, explicación y acción conectada por la pantalla.
 * @returns Acción debajo en móvil y a la derecha cuando hay espacio suficiente.
 */
export function PageHeading({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  const { colors } = useTheme();
  const { columns } = useWorkspaceLayout();
  return (
    <View
      style={[
        s.row,
        {
          flexDirection: columns ? 'row' : 'column',
          alignItems: columns ? 'center' : 'stretch',
        },
      ]}
    >
      <View style={s.copy}>
        <Text style={[s.eyebrow, { color: colors.primary }]}>
          {eyebrow.toLocaleUpperCase('es-AR')}
        </Text>
        <Text accessibilityRole="header" style={[s.title, { fontSize: columns ? 34 : 29 }]}>
          {title}
        </Text>
        <Text style={[s.detail, { color: colors.muted }]}>{detail}</Text>
      </View>
      {action}
    </View>
  );
}
