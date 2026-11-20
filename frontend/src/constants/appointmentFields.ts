import type { FormFieldDefinition } from '../types/form';

/** Motivo obligatorio visible al cliente y conservado con la cancelación. */
export const cancellationFields: FormFieldDefinition[] = [
  {
    name: 'reason',
    label: 'Motivo de cancelación',
    kind: 'textarea',
    required: true,
    minLength: 1,
    maxLength: 500,
    placeholder: 'Explicá por qué se cancela el turno.',
  },
];

/** Observación del equipo, atribuida en el servidor a quien la escribe. */
export const appointmentNoteFields: FormFieldDefinition[] = [
  {
    name: 'body',
    label: 'Nueva observación',
    kind: 'textarea',
    maxLength: 2000,
    placeholder: 'Describí el estado del vehículo, indicaciones o detalles del trabajo.',
  },
];
