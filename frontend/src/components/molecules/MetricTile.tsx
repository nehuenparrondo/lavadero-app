import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { overviewStyles as s } from '../../theme/overview.styles';
import type { IconName } from '../../types/icon';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.
 * @param props Etiqueta, valor formateado, contexto e ícono. No calcula métricas ni tendencias.
 * @returns Tarjeta flexible que admite varias columnas sin desbordar en teléfonos.
 */
export function MetricTile({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconName;
}) {
  const { colors } = useTheme();
  return (
    <View style={[s.metric, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={s.metricTop}>
        <Text style={{ fontSize: 13, color: colors.muted, flex: 1 }}>{label}</Text>
        <View style={[s.iconTile, { backgroundColor: colors.soft }]}>
          <AppIcon name={icon} color={colors.primary} />
        </View>
      </View>
      <View style={{ gap: 7 }}>
        <Text style={s.metricValue}>{value}</Text>
        <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>{detail}</Text>
      </View>
    </View>
  );
}
