import type { RowDataPacket } from 'mysql2/promise';
import { APPOINTMENT_STATUS } from '../../constants/business.js';
/** Flujo compartido por rutas y reglas del módulo. */
export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];
/** Reserva proyectada según el contrato REST. */
export interface Appointment extends RowDataPacket {
  id: string;
  clientId: string | null;
  isWalkIn: number;
  employeeId: string | null;
  vehicleId: string | null;
  vehicleTypeId: string;
  status: AppointmentStatus;
  startsAt: string;
  endsAt: string;
  currencyCode: string;
  plate: string | null;
  brand: string | null;
  model: string | null;
  color: string | null;
  vehicleType: string;
  vehicleDescription: string | null;
  cancellationReason: string | null;
  cancelledById: string | null;
  cancelledByName: string | null;
  serviceSummary: string;
  clientName: string;
  clientPhone: string | null;
  employeeName: string | null;
  employeeAvailable: number;
  version: number;
  /** Total histórico del contrato, expresado en centavos ARS. */
  totalCents: number;
  /** Suma registrada de cobros en centavos; no ejecuta transferencias. */
  paidCents: number;
}
/** Renglón contratado y precio vigente para el tipo elegido. */
export interface QuoteItem extends RowDataPacket {
  serviceId: string;
  code: string;
  name: string;
  /** Tiempo estimado completo del servicio, en minutos. */
  durationMinutes: number;
  /** Importe entero en centavos; evita errores de coma flotante. */
  priceCents: number;
}
/** Intervalo ocupado, con extremos UTC en milisegundos para cálculo puro. */
export interface Interval {
  start: number;
  end: number;
  employeeId: string | null;
  vehicleId: string | null;
}

/** Fila mínima usada para calcular ocupación sin cargar datos personales. */
export interface BookingIntervalRow extends RowDataPacket {
  startsAt: string;
  endsAt: string;
  employeeId: string | null;
  vehicleId: string | null;
}
