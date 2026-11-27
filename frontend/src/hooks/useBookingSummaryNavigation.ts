import { useState } from 'react';
import type { useBooking } from './useBooking';
import type { ScrollRequest } from './useScrollRequest';
import { useWorkspaceLayout } from './useWorkspaceLayout';

/** Tras guardar, muestra el resumen superior en escritorio y la tarjeta final en teléfono.
 * @param booking Acción validada que guarda la hora sin enviar una reserva.
 * @returns Solicitud de scroll y callback exclusivo del botón Guardar.
 */
export function useBookingSummaryNavigation(booking: ReturnType<typeof useBooking>) {
  const { columns } = useWorkspaceLayout();
  const [scrollRequest, setScrollRequest] = useState<ScrollRequest>();
  return {
    scrollRequest,
    saveSlot: () => {
      if (!booking.saveSlot()) return;
      setScrollRequest((current) => ({
        id: (current?.id ?? 0) + 1,
        edge: columns ? 'top' : 'bottom',
      }));
    },
  };
}
