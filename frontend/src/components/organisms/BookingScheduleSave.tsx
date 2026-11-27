import type { useBooking } from '../../hooks/useBooking';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';

/** Agrega al resumen únicamente la hora elegida y todavía ofrecida por el servidor.
 * @param props Estado vigente y acción de guardado/navegación al resumen.
 * @returns Guardar después de elegir una hora, o el aviso de guardado pendiente de reserva.
 */
export function BookingScheduleSave({
  b,
  onSave,
}: {
  b: ReturnType<typeof useBooking>;
  onSave: () => void;
}) {
  if (!b.draftSlot) return null;
  if (b.slot === b.draftSlot && b.availability.data?.slots.includes(b.slot))
    return (
      <Notice message="Horario agregado a Tu reserva. Revisá el resumen y confirmá para reservar tu turno." />
    );
  return (
    <>
      <Button
        label="Guardar"
        icon="check"
        onPress={onSave}
        disabled={!b.canSaveSlot || b.busy}
      />
      <Text>Guardá este horario para agregarlo a Tu reserva.</Text>
    </>
  );
}
