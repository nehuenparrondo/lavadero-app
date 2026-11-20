import { seedSchema } from './seedSchema.js';

/** Lee configuración semilla validada.
 * @returns Configuración tipada de administrador y negocio.
 * @throws ZodError si las variables no cumplen los límites documentados.
 */
export function readSeedConfig() {
  return seedSchema.parse(process.env);
}
