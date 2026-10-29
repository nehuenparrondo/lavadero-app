import type { Choice } from '../components/molecules/ChoiceGroup';
/** Descripción de un campo de formulario; validación adicional en backend. */
export interface FormFieldDefinition {
  name: string;
  label: string;
  placeholder?: string;
  kind?:
    | 'text'
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
