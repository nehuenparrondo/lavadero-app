import type { Service, VehicleType } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
import { pesosToCents } from './pesosToCents';

/** Filtra la oferta exclusiva de moto frente a las demás categorías.
 * @param code Código del tipo, si ya se eligió.
 * @param service Servicio que se quiere ofrecer.
 * @returns Si el servicio corresponde al tipo.
 */
export function supportsVehicleType(code: string | undefined, service: Service) {
  return (code === 'motorcycle') === (service.code === 'motorcycle_wash');
}

/** Campos de tarifas, con importes existentes precargados para editar el tipo.
 * @param services Catálogo de servicios disponible para administración.
 * @param type Tipo existente o null al crear.
 * @returns Campos y valores iniciales del editor.
 */
export function typePriceFields(services: Service[], type: VehicleType | null) {
  const offered = services.filter((s) => s.isActive && supportsVehicleType(type?.code, s));
  const fields: FormFieldDefinition[] = offered.map((s) => ({
    name: `price_${s.id}`,
    label: `${s.name} (ARS)`,
    kind: 'money',
    required: false,
    placeholder: 'Sin tarifa',
  }));
  const values = Object.fromEntries(
    offered.map((s) => {
      const price = s.prices.find((p) => p.vehicleTypeId === type?.id)?.priceCents;
      return [`price_${s.id}`, price === undefined ? '' : String(price / 100)];
    }),
  );
  return { fields, values };
}

/** Serializa solo importes ingresados o modificados.
 * @param values Entradas del formulario.
 * @param initial Valores previos del tipo.
 * @returns Tarifas a guardar junto con la categoría.
 */
export function changedTypePrices(
  values: Record<string, string>,
  initial: Record<string, string>,
) {
  return Object.entries(values)
    .filter(([key, value]) => key.startsWith('price_') && value && value !== initial[key])
    .map(([key, value]) => ({
      serviceId: key.slice('price_'.length),
      priceCents: pesosToCents(value),
    }));
}
