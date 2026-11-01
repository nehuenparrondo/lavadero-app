import type { VehicleType } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
/** Opciones de tarifa para los tipos registrados; la API valida su vigencia.
 * @param types - Valor tipado de types utilizado por esta operación.
 * @returns `FormFieldDefinition[]`, según el contrato de la operación.
 */
export function priceFields(types: VehicleType[]): FormFieldDefinition[] {
  return [
    {
      name: 'vehicleTypeId',
      label: 'Tipo de vehículo',
      kind: 'choice',
      options: types.map((t) => ({ value: t.id, label: t.name })),
    },
    { name: 'price', label: 'Precio en pesos argentinos', kind: 'money', placeholder: '9000' },
  ];
}
/** Edición de categorías preservando sus referencias históricas. */
export const vehicleTypeFields: FormFieldDefinition[] = [
  { name: 'name', label: 'Nombre', maxLength: 80 },
  {
    name: 'isActive',
    label: 'Disponibilidad',
    kind: 'choice',
    options: [
      { value: 'true', label: 'Activo' },
      { value: 'false', label: 'Inactivo' },
    ],
  },
];
