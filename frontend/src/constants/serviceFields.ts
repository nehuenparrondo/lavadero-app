import type { FormFieldDefinition } from '../types/form';
/** Campos reutilizados por alta y edición de servicios. */
export const serviceFields: FormFieldDefinition[] = [
  { name: 'name', label: 'Nombre del servicio', maxLength: 100 },
  { name: 'description', label: 'Descripción', maxLength: 3000 },
  { name: 'durationMinutes', label: 'Duración estimada (minutos)', kind: 'number' },
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
