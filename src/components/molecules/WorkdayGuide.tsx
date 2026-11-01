import { useTheme } from '../../hooks/useTheme';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
import { Card } from './Card';
/** Ayuda operacional; las acciones reales siguen en el detalle del turno.
 * @returns Recordatorio del flujo sin prometer asignaciones ni habilitar cobros.
 */
export function WorkdayGuide() {
  const { colors } = useTheme();
  return (
    <Card style={{ backgroundColor: colors.soft }}>
      <AppIcon name="sparkles" color={colors.primary} size={26} />
      <Text style={{ fontSize: 19, fontWeight: '700' }}>
        Una buena jornada empieza por los detalles.
      </Text>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 23 }}>
        Revisá el vehículo y los servicios. Abrí cada turno para iniciar el lavado, sumar notas
        y marcarlo como finalizado.
      </Text>
      <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 19 }}>
        Acá ves únicamente los trabajos que tenés asignados.
      </Text>
    </Card>
  );
}
