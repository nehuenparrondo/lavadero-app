import { Link } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
/** Alternativa explícita cuando el enlace de recuperación venció.
 * @returns Enlace a una solicitud nueva sin reenviar el token anterior.
 */
export function RecoveryRequestLink() {
  const { colors } = useTheme();
  return (
    <Link
      href="/forgot-password"
      style={{ color: colors.primary, padding: 12, textAlign: 'center' }}
    >
      Solicitar otro enlace
    </Link>
  );
}
