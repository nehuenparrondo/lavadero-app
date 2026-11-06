/** Roles que puede emitir y validar el contrato del sistema. */
export const ROLES = ['client', 'employee', 'admin'] as const;
/** Estados persistidos del turno; los servicios controlan las transiciones autorizadas. */
export const APPOINTMENT_STATUS = [
  'pending',
  'confirmed',
  'in_progress',
  'awaiting_review',
  'completed',
  'cancelled',
] as const;
