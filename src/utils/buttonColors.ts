import type { Palette } from '../theme/palettes';
/** Resuelve contraste y superficie de variantes sin repetir colores en los botones.
 * @param variant - Valor tipado de variant utilizado por esta operación.
 * @param colors - Valor tipado de colors utilizado por esta operación.
 * @returns `{ background: string; foreground: string; }`, según el contrato de la operación.
 */
export function buttonColors(
  variant: 'primary' | 'secondary' | 'danger' | 'quiet',
  colors: Palette,
) {
  const background = {
    primary: colors.primary,
    danger: colors.danger,
    quiet: 'transparent',
    secondary: colors.soft,
  }[variant];
  const foreground =
    variant === 'primary'
      ? colors.onPrimary
      : variant === 'danger'
        ? colors.background
        : colors.primary;
  return { background, foreground };
}
