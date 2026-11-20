import { createServer } from 'node:net';

/** Solo admite puertos válidos y evita que Expo elija otro silenciosamente. */
export function port(value, fallback) {
  const result = Number(value ?? fallback);
  if (!Number.isInteger(result) || result < 1024 || result > 65535)
    throw new Error('Puerto inválido.');
  return result;
}

/** Comprueba disponibilidad sin modificar el servicio que ocupa un puerto. */
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
