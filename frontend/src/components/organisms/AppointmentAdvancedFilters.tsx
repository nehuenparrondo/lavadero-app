import { useState } from 'react';
import { View } from 'react-native';
import type { useAppointments } from '../../hooks/useAppointments';
import { Button } from '../atoms/Button';
import { AppointmentClientFilter } from './AppointmentClientFilter';
import { AppointmentEmployeeFilter } from './AppointmentEmployeeFilter';
import { AppointmentStatusFilter } from './AppointmentStatusFilter';

/** Mantiene los filtros de administración disponibles sin ocultar los resultados.
 * @param props Estado y operaciones de la agenda administrativa.
 * @returns Controles desplegables con cantidad de filtros activos.
 */
export function AppointmentAdvancedFilters({ m }: { m: ReturnType<typeof useAppointments> }) {
  const [open, setOpen] = useState(false);
  const count = [m.status, m.clientId, m.employeeId].filter(Boolean).length;
  return (
    <View style={{ gap: 12 }}>
      <Button
        label={`${open ? 'Ocultar filtros' : 'Más filtros'}${count ? ` (${count})` : ''}`}
        variant="quiet"
        onPress={() => setOpen((value) => !value)}
      />
      {open && (
        <View style={{ gap: 12 }}>
          <AppointmentStatusFilter m={m} />
          <AppointmentClientFilter m={m} />
          <AppointmentEmployeeFilter m={m} />
          {count > 0 && (
            <Button label="Limpiar filtros" variant="quiet" onPress={m.clearAdvanced} />
          )}
        </View>
      )}
    </View>
  );
}
