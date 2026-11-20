import { z } from 'zod';
import type { FormFieldDefinition } from '../types/form';
/** Genera validación por campo sobre valores de texto del formulario móvil.
 * @param fields - Definiciones de campos con etiquetas, tipos y restricciones.
 * @returns `z.ZodObject<{ [x: string]: z.ZodString; }, z.core.$strip>`.
 */
export function buildFormSchema(fields: FormFieldDefinition[]) {
  const shape: Record<string, z.ZodString> = {};
  for (const field of fields) {
    let rule = field.kind === 'textarea' ? z.string().trim() : z.string();
    if (field.required !== false) rule = rule.min(1, 'Completá este campo.');
    if (field.minLength)
      rule = rule.min(field.minLength, `Usá al menos ${field.minLength} caracteres.`);
    if (field.maxLength) rule = rule.max(field.maxLength, 'El texto es demasiado largo.');
    if (field.kind === 'email') rule = rule.email('Ingresá un email válido.');
    if (field.kind === 'number') rule = rule.regex(/^\d+$/u, 'Ingresá un número entero.');
    if (field.kind === 'money')
      rule = rule.regex(
        field.required === false ? /^(?:\d+(?:[.,]\d{1,2})?)?$/u : /^\d+(?:[.,]\d{1,2})?$/u,
        'Ingresá pesos, con hasta dos decimales.',
      );
    if (field.kind === 'date')
      rule = rule.regex(/^\d{4}-\d{2}-\d{2}$/u, 'Usá el formato AAAA-MM-DD.');
    if (field.kind === 'time')
      rule = rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/u, 'Usá el formato HH:MM.');
    shape[field.name] = allowedChoice(rule, field);
  }
  return z.object(shape);
}

/** Los formularios no aceptan opciones ajenas al catálogo mostrado. */
function allowedChoice(rule: z.ZodString, field: FormFieldDefinition) {
  if (field.kind !== 'choice' && field.kind !== 'multiple') return rule;
  const allowed = new Set(field.options?.map((option) => option.value));
  return rule.refine((value) => {
    if (!value && field.required === false) return true;
    const selected = field.kind === 'multiple' ? value.split(',') : [value];
    return (
      new Set(selected).size === selected.length && selected.every((id) => allowed.has(id))
    );
  }, 'Elegí una opción disponible.');
}
