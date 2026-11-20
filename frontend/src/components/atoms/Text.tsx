import type { TextProps } from 'react-native';
import { Text as NativeText } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { tokens } from '../../theme/tokens';

/** Texto con color semántico y tamaño consistente.
 * @param props Props estándar de Text nativo, incluido style.
 * @returns Texto accesible con paleta del tema.
 */
export function Text({ style, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <NativeText
      {...props}
      style={[{ color: colors.text, fontSize: tokens.fontSize.body }, style]}
    />
  );
}
