import type { FormFieldDefinition } from '../types/form';
/** Un cobro se registra en centavos en la API; el formulario recibe pesos argentinos. */
export const paymentFields: FormFieldDefinition[] = [
  { name: 'amount', label: 'Importe en pesos argentinos', kind: 'money' },
  {
    name: 'method',
    label: 'Medio de pago',
    kind: 'choice',
    options: [
      { value: 'cash', label: 'Efectivo' },
      { value: 'transfer', label: 'Transferencia' },
    ],
  },
  { name: 'reference', label: 'Referencia (opcional)', required: false, maxLength: 100 },
];
