import { useState } from 'react';
import type { useWalkIn } from '../../hooks/useWalkIn';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Card } from '../molecules/Card';
import { Text } from '../atoms/Text';

/** Solicita solo patente y categoría; los datos de contacto son opcionales.
 * @param props Estado del ingreso presencial.
 * @returns Campos del auto con detalles adicionales plegables.
 */
export function WalkInVehicle({ m }: { m: ReturnType<typeof useWalkIn> }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>1. Identificá el vehículo</Text>
      <FormField
        field={{ name: 'plate', label: 'Patente', maxLength: 16, placeholder: 'Ej. AB123CD' }}
        value={m.details.plate}
        onChange={(v) => m.chooseDetail('plate', v.toUpperCase())}
      />
      <WalkInType m={m} />
      <Button
        label={
          expanded ? 'Ocultar datos opcionales' : 'Agregar contacto u observaciones (opcional)'
        }
        variant="quiet"
        onPress={() => setExpanded(!expanded)}
      />
      {expanded && <WalkInDetails m={m} />}
    </Card>
  );
}

/** Los datos complementarios se guardan en el ingreso y las observaciones en sus notas. */
function WalkInDetails({ m }: { m: ReturnType<typeof useWalkIn> }) {
  const fields = [
    { name: 'customerName', label: 'Nombre del cliente', maxLength: 160 },
    { name: 'customerPhone', label: 'Teléfono', maxLength: 30 },
    { name: 'brand', label: 'Marca', maxLength: 80 },
    { name: 'model', label: 'Modelo', maxLength: 80 },
    { name: 'color', label: 'Color', maxLength: 50 },
    { name: 'notes', label: 'Observaciones', maxLength: 2000, kind: 'textarea' as const },
  ];
  return fields.map((field) => (
    <FormField
      key={field.name}
      field={{ ...field, required: false }}
      value={m.details[field.name as keyof typeof m.details]}
      onChange={(v) => m.chooseDetail(field.name as keyof typeof m.details, v)}
    />
  ));
}

/** Presenta categorías vigentes sin solicitar un vehículo de garaje. */
function WalkInType({ m }: { m: ReturnType<typeof useWalkIn> }) {
  return (
    <FormField
      field={{
        name: 'type',
        label: 'Tipo de vehículo',
        kind: 'choice',
        options: (m.types.data ?? [])
          .filter((t) => t.isActive)
          .map((t) => ({ value: t.id, label: t.name })),
      }}
      value={m.vehicleTypeId}
      onChange={m.chooseType}
    />
  );
}
