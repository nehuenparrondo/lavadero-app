import type { Palette } from '../theme/palettes';
/** Resuelve contraste y superficie de variantes sin repetir colores en los botones.
 * @param variant - Variante visual semántica que determina contraste y superficie.
 * @param colors - Paleta semántica resuelta para el tema actual.
 * @returns `{ background: string; foreground: string; }`.
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
