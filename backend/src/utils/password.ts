import bcrypt from 'bcrypt';
import { z } from 'zod';

/** Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar. */
export const passwordSchema = z
  .string()
  .min(12, 'Usá al menos 12 caracteres.')
  .refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'La contraseña supera 72 bytes.');
/** Hashea con costo 12.
 * @param password - Contraseña validada de entre 12 caracteres y 72 bytes UTF-8.
 * @returns Hash bcrypt; nunca contraseña legible.
 */
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
/** Compara sin exponer el hash al frontend.
 * @param password - Contraseña de la cuenta, usada solo para comprobar su propiedad.
 * @param hash - Hash bcrypt almacenado de la cuenta que se autentica.
 * @returns `Promise<boolean>`.
 */
export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
