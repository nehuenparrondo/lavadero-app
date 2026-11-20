import type { FormFieldDefinition } from '../types/form';
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
/** Configuración inicial de horarios, cancelación y capacidad. */
export const settingsFields: FormFieldDefinition[] = [
  {
    name: 'days',
    label: 'Días de atención',
    kind: 'multiple',
    options: days.map((label, i) => ({ label, value: String(i + 1) })),
  },
  { name: 'opensAt', label: 'Apertura', kind: 'time', placeholder: '09:30' },
  { name: 'closesAt', label: 'Cierre', kind: 'time', placeholder: '16:30' },
  { name: 'capacity', label: 'Vehículos que se pueden atender a la vez', kind: 'number' },
  {
    name: 'cancellation',
    label: 'Anticipación mínima para cancelar (minutos)',
    kind: 'number',
  },
  { name: 'step', label: 'Ofrecer horarios cada (minutos)', kind: 'number' },
];
