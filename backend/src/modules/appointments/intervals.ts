import type { BookingIntervalRow, Interval } from './appointments.types.js';
import { utcMillis } from './schedule.js';
/** Convierte filas SQL UTC al formato único del cálculo de capacidad.
 * @param bookings - Reservas existentes que participan en el cálculo de ocupación.
 * @returns `Interval[]`.
 */
export function bookingIntervals(bookings: BookingIntervalRow[]): Interval[] {
  return bookings.map((v) => ({
    start: utcMillis(v.startsAt),
    end: utcMillis(v.endsAt),
    employeeId: v.employeeId as string | null,
    vehicleId: v.vehicleId,
  }));
}
