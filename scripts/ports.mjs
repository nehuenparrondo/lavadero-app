import { createServer } from 'node:net';

/** Solo admite puertos válidos y evita que Expo elija otro silenciosamente.
 * @param {string|undefined} value Puerto solicitado por el operador.
 * @param {number} fallback Puerto habitual cuando falta value.
 * @returns {number} Entero entre 1024 y 65535; rechaza entradas inválidas.
 */
export function port(value, fallback) {
  const result = Number(value ?? fallback);
  if (!Number.isInteger(result) || result < 1024 || result > 65535)
    throw new Error('Puerto inválido.');
  return result;
}

/** Comprueba disponibilidad sin modificar el servicio que ocupa un puerto.
 * @param {number} value Puerto validado que se intenta usar en loopback.
 * @returns {Promise<void>} Resuelve después de cerrar el socket de prueba; rechaza si no puede escuchar.
 */
export function freePort(value) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', () =>
      reject(
        new Error(`El puerto ${value} está ocupado. Cerrá la otra ejecución de Lavadero.`),
      ),
    );
    server.listen(value, '127.0.0.1', () => server.close(resolve));
  });
}
