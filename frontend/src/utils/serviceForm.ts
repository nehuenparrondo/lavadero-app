import type { Service } from '../types/entities';
import { makeCatalogCode } from './makeCatalogCode';
/** Serializa campos de servicio; el código permanece estable durante una edición.
 * @param values - Valores del formulario o parámetros que se serializan para la operación.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @returns `{ code: string; name: string | undefined; description: string | undefined; durationMinutes: number; isActive: boolean; }`.
 */
export function servicePayload(values: Record<string, string>, current: Service | null) {
  return {
    code: current?.code ?? makeCatalogCode(values.name ?? ''),
    name: values.name,
    description: values.description,
    durationMinutes: Number(values.durationMinutes),
    isActive: values.isActive === 'true',
  };
}
/** Valores de edición sin convertir null en texto visible.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @returns `{ name: string; description: string; durationMinutes: string; isActive: string; } | { isActive: string; name?: never; description?: never; durationMinutes?: never; }`.
 */
export function serviceInitialValues(current: Service | null) {
  return current
    ? {
        name: current.name,
        description: current.description,
        durationMinutes: String(current.durationMinutes),
        isActive: String(current.isActive),
      }
    : { isActive: 'true' };
}
