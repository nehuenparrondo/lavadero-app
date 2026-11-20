import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
/** Regreso al ingreso desde registro o recuperación.
 * @returns Enlace accesible consistente con el tema activo.
 */
export function AuthReturnLink() {
  const { colors } = useTheme();
  return (
    <Link href="/sign-in" style={{ color: colors.primary, textAlign: 'center', padding: 16 }}>
      Volver a ingresar
    </Link>
  );
}
