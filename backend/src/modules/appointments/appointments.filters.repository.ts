import { DateTime } from 'luxon';
import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import type { appointmentQuerySchema } from './appointments.schema.js';
import { agendaScope } from './agendaScope.repository.js';
type Filters = z.infer<typeof appointmentQuerySchema>;
/** Construye únicamente predicados cerrados; los datos siempre viajan como parámetros.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @param timeZone - Zona IANA usada para convertir el calendario local a UTC.
 * @returns `{ where: string; values: unknown[]; }`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function appointmentFilter(actor: Actor, input: Filters, timeZone: string) {
  const conditions = ['1=1'];
  const values: unknown[] = [];
  const add = (clause: string, value: unknown) => {
    conditions.push(clause);
    values.push(value);
  };
  if (actor.role === 'client') add('a.client_id=?', actor.id);
  if (input.status) add('s.code=?', input.status);
  if (input.queue) conditions.push("s.code IN ('pending','confirmed')");
  if (input.clientId) add('a.client_id=?', input.clientId);
  if (actor.role === 'admin' && input.employeeId) add('a.employee_id=?', input.employeeId);
  if (actor.role !== 'client' && input.plate)
    add(
      'COALESCE(v.plate,w.plate) LIKE ?',
      `%${input.plate.replace(/[ -]/gu, '').toUpperCase()}%`,
    );
  const scope = agendaScope(actor, input, timeZone);
  conditions.push(...scope.conditions);
  values.push(...scope.values);
  if (input.date && !(actor.role === 'employee' && input.scope === 'today')) {
    conditions.push('a.starts_at>=? AND a.starts_at<?');
    values.push(...dateBounds(input.date, timeZone));
  }
  return { where: ' WHERE ' + conditions.join(' AND '), values };
}
/** Traduce un día local en límites UTC exclusivos para conservar índices sobre starts_at. */
function dateBounds(date: string, timeZone: string) {
  const day = DateTime.fromISO(date, { zone: timeZone });
  if (!day.isValid) throw new AppError(400, 'INVALID_DATE', 'Fecha inválida.');
  return [
    day.toUTC().toSQL({ includeOffset: false }),
    day.plus({ days: 1 }).toUTC().toSQL({ includeOffset: false }),
  ];
}
