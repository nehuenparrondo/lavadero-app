import type { useWalkIn } from '../../hooks/useWalkIn';
import type { Service } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { FormField } from '../molecules/FormField';
import { Notice } from '../molecules/Notice';

/** Reutiliza reglas de lavado único y adicionales por categoría, con precios visibles.
 * @param props Catálogo y selección del ingreso.
 * @returns Servicios base y extras separados.
 */
export function WalkInServices({ m }: { m: ReturnType<typeof useWalkIn> }) {
  if (!m.vehicleTypeId) return null;
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>2. Elegí los servicios</Text>
      <FormField
        field={{
          name: 'wash',
          label: 'Tipo de lavado',
          kind: 'choice',
          options: options(m.washes, m.vehicleTypeId),
        }}
        value={m.baseId}
        onChange={(v) => m.setBaseId(v === m.baseId ? '' : v)}
      />
      <WalkInExtras m={m} />
      {m.needsWash && (
        <Notice error="Para agregar encerado, elegí lavado exterior o completo." />
      )}
      {!m.washes.length && !m.extras.length && (
        <Text>Esta categoría todavía no tiene servicios con tarifa.</Text>
      )}
    </Card>
  );
}

/** Convierte la tarifa vigente en una opción con precio y duración explícitos. */
function options(services: Service[], typeId: string) {
  return services.map((s) => ({
    value: s.id,
    label: s.name,
    description: `${money(s.prices.find((p) => p.vehicleTypeId === typeId)?.priceCents)} · ${s.durationMinutes} min`,
  }));
}

/** Mantiene los adicionales separados del único lavado base. */
function WalkInExtras({ m }: { m: ReturnType<typeof useWalkIn> }) {
  if (!m.extras.length) return null;
  return (
    <FormField
      field={{
        name: 'extras',
        label: 'Adicionales',
        kind: 'multiple',
        required: false,
        options: options(m.extras, m.vehicleTypeId),
      }}
      value={m.extraIds}
      onChange={m.setExtraIds}
    />
  );
}
