import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ProgressBar } from '../molecules/ProgressBar';
/** Presenta frecuencias reales de servicios en el período consultado.
 * @param props - Propiedades tipadas: report.
 * @returns Vista de PopularServices con el contrato de propiedades declarado.
 */
export function PopularServices({ report }: { report: Report }) {
  const max = Math.max(1, ...report.services.map((s) => s.count));
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Servicios más pedidos</Text>
      {report.services.length ? (
        report.services.map((s) => (
          <ProgressBar
            key={s.name}
            label={s.name}
            value={s.count}
            max={max}
            detail={`${s.count} ${s.count === 1 ? 'pedido' : 'pedidos'}`}
          />
        ))
      ) : (
        <Text>No hay servicios en este período.</Text>
      )}
    </Card>
  );
}
