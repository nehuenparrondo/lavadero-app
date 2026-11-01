import type { User, Vehicle, VehicleType } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
const identityFields: FormFieldDefinition[] = [
  { name: 'plate', label: 'Patente', placeholder: 'AB123CD', maxLength: 16 },
  { name: 'brand', label: 'Marca', maxLength: 80 },
  { name: 'model', label: 'Modelo', maxLength: 80 },
  { name: 'color', label: 'Color', maxLength: 50 },
];
/** Construye el formulario sin ofrecer selección de titulares a un cliente.
 * @param types - Categorías de vehículo que determinan las tarifas disponibles.
 * @param clients - Clientes autorizados que pueden elegirse como titulares.
 * @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
 * @returns `FormFieldDefinition[]`.
 */
export function vehicleFields(
  types: VehicleType[],
  clients: User[],
  admin: boolean,
): FormFieldDefinition[] {
  const type: FormFieldDefinition = {
    name: 'vehicleTypeId',
    label: 'Tipo de vehículo',
    kind: 'choice',
    options: types.filter((t) => t.isActive).map((t) => ({ value: t.id, label: t.name })),
  };
  const owner: FormFieldDefinition = {
    name: 'ownerId',
    label: 'Titular',
    kind: 'choice',
    options: clients.map((c) => ({ value: c.id, label: `${c.firstName} ${c.lastName}` })),
  };
  return [...identityFields, type, ...(admin ? [owner] : [])];
}
/** Valores de edición del vehículo; el backend impide cambiar su titular histórico.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @returns `Record<string, string>`.
 */
export function vehicleInitialValues(current: Vehicle | null): Record<string, string> {
  if (!current) return {};
  const fields = ['plate', 'brand', 'model', 'color', 'vehicleTypeId', 'ownerId'] as const;
  return Object.fromEntries(fields.map((key) => [key, current[key]]));
}
/** Serializa únicamente atributos permitidos de un vehículo.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `{ ownerId?: string; plate: string | undefined; brand: string | undefined; model: string | undefined; color: string | undefined; vehicleTypeId: string | undefined; }`.
 */
export function vehiclePayload(v: Record<string, string>) {
  return {
    plate: v.plate,
    brand: v.brand,
    model: v.model,
    color: v.color,
    vehicleTypeId: v.vehicleTypeId,
    ...(v.ownerId ? { ownerId: v.ownerId } : {}),
  };
}
