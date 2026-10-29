import { View } from 'react-native';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { useTheme } from '../../hooks/useTheme';
import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
/** Indicadores y barras de ingresos diarios a partir de datos reales. */
export function ReportSummary({ report }: { report: Report }) {
  const { colors } = useTheme();
  const max = Math.max(1, ...report.days.map((d) => d.revenueCents));
  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        <View style={{ flex: 1, minWidth: 150 }}>
          <Card>
            <Text>Lavados finalizados</Text>
            <Text style={{ fontWeight: '900', fontSize: 32 }}>{report.totalWashes}</Text>
          </Card>
        </View>
        <View style={{ flex: 1, minWidth: 150 }}>
          <Card>
            <Text>Ingresos registrados</Text>
            <Text style={{ fontWeight: '900', fontSize: 28, color: colors.primary }}>
              {money(report.revenueCents)}
            </Text>
          </Card>
        </View>
      </View>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Ingresos por día</Text>
        {report.days.map((day) => (
          <View key={day.date} style={{ gap: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13 }}>{day.date}</Text>
              <Text style={{ fontSize: 13 }}>{money(day.revenueCents)}</Text>
            </View>
            <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.soft }}>
              <View
                style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                  width: `${(day.revenueCents / max) * 100}%`,
                }}
              />
            </View>
          </View>
        ))}
      </Card>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Servicios más pedidos</Text>
        {report.services.length ? (
          report.services.map((s) => (
            <Text key={s.name}>
              {s.name}: {s.count}
            </Text>
          ))
        ) : (
          <Text>No hay servicios en este período.</Text>
        )}
      </Card>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Rendimiento del equipo</Text>
        {report.employees.length ? (
          report.employees.map((e) => (
            <Text key={e.id}>
              {e.name}: {e.completed} trabajos
            </Text>
          ))
        ) : (
          <Text>No hay trabajos finalizados en este período.</Text>
        )}
      </Card>
    </>
  );
}
