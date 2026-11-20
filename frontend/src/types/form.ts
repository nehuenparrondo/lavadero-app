/** Opción de catálogo o filtro sin dependencia del sistema visual. */
export interface Choice {
  value: string;
  label: string;
  description?: string;
}
/** Descripción de un campo de formulario; validación adicional en backend. */
export interface FormFieldDefinition {
  name: string;
  label: string;
  placeholder?: string;
  kind?:
    | 'text'
    | 'textarea'
    | 'email'
    | 'password'
    | 'number'
    | 'money'
    | 'date'
    | 'time'
    | 'choice'
    | 'multiple';
  required?: boolean;
  options?: Choice[];
  minLength?: number;
  maxLength?: number;
}
