import { useState } from 'react';
import { View } from 'react-native';
import { calendarLabel, validDate } from '../../utils/calendar';
import { today } from '../../utils/format';
import { Button } from '../atoms/Button';
import { ModalPanel } from '../organisms/ModalPanel';
import { CalendarGrid } from './CalendarGrid';
import { CalendarNavigation } from './CalendarNavigation';
/** Selección de fecha mediante calendario, con valor ISO separado de su presentación.
 * @param props Etiqueta, valor ISO y cambio/blur del formulario.
 * @returns Control accesible que evita escribir fechas ambiguas o inexistentes.
 */
export function DateInput({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (() => void) | undefined;
}) {
  const { open, month, setMonth, show, choose, close } = useCalendarInput(
    value,
    onChange,
    onBlur,
  );
  return (
    <View>
      <Button
        label={`${label}: ${validDate(value) ? calendarLabel(value) : 'Elegir fecha'}`}
        variant="secondary"
        onPress={show}
      />
      <ModalPanel
        compact
        visible={open}
        title={`Elegir ${label.toLowerCase()}`}
        onClose={close}
      >
        <CalendarNavigation month={month} onChange={setMonth} />
        <CalendarGrid month={month} value={value} onChange={choose} />
      </ModalPanel>
    </View>
  );
}

/** Abrir el mes no asigna una fecha al formulario. */
function useCalendarInput(value: string, onChange: (v: string) => void, onBlur?: () => void) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(today().slice(0, 7));
  const show = () => {
    setMonth((validDate(value) ? value : today()).slice(0, 7));
    setOpen(true);
  };
  const choose = (day: string) => {
    onChange(day);
    onBlur?.();
    setOpen(false);
  };
  return { open, month, setMonth, show, choose, close: () => setOpen(false) };
}
