import { DateTime } from 'luxon';
import type { Actor } from '../../types/domain.js';
import type { z } from 'zod';
import type { appointmentQuerySchema } from './appointments.schema.js';

/** Define próximas visitas por día local y separa la jornada actual del historial.
 * @param actor Identidad autenticada; los predicados no conceden acceso adicional.
 * @param input Filtros validados de la pantalla.
 * @param timeZone Zona del negocio, independiente del teléfono y del servidor SQL.
 * @returns Condiciones cerradas y parámetros UTC para agregarlos a la consulta.
 */
export function agendaScope(
  actor: Actor,
  input: z.infer<typeof appointmentQuerySchema>,
  timeZone: string,
) {
  const today = DateTime.now().setZone(timeZone).startOf('day');
  const start = today.toUTC().toSQL({ includeOffset: false })!;
  const end = today.plus({ days: 1 }).toUTC().toSQL({ includeOffset: false })!;
  if (actor.role === 'employee' && input.scope === 'today')
    return {
      conditions: [
        "s.code IN ('pending','confirmed','in_progress')",
        'a.starts_at>=? AND a.starts_at<?',
      ],
      values: [start, end],
    };
  if (actor.role === 'client' && input.history) return clientScope(input, start);
  return historyScope(input, actor);
}

/** El pasado también conserva turnos sin terminar de días anteriores. */
function clientScope(input: z.infer<typeof appointmentQuerySchema>, start: string) {
  if (input.history === 'false')
    return {
      conditions: [
        "s.code IN ('confirmed','in_progress','awaiting_review')",
        'a.starts_at>=?',
        ...(input.home === 'true' ? ['a.home_hidden_at IS NULL'] : []),
      ],
      values: [start],
    };
  return {
    conditions: ["(s.code IN ('completed','cancelled') OR a.starts_at<?)"],
    values: [start],
  };
}

/** Mantiene compatibilidad con filtros administrativos y el historial completo del equipo. */
function historyScope(input: z.infer<typeof appointmentQuerySchema>, actor: Actor) {
  if (input.history && !(actor.role === 'employee' && input.scope === 'all'))
    return {
      conditions: [
        input.history === 'true'
          ? "s.code IN ('completed','cancelled')"
          : "s.code IN ('pending','confirmed','in_progress','awaiting_review')",
      ],
      values: [],
    };
  return { conditions: [], values: [] };
}
