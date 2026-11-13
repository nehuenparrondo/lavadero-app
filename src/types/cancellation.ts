/** Aviso de cancelación del equipo, pendiente de lectura por el titular. */
export interface CancellationNotice {
  id: string;
  startsAt: string;
  cancelledAt: string;
  reason: string | null;
  plate: string | null;
  vehicleType: string;
}
