import { createApp } from './app.js';
import { startRecoveryWorker } from './modules/auth/recovery.worker.js';
import { database } from './config/database.js';
import { env } from './config/env.js';
import { checkDatabase } from './modules/health/health.repository.js';

const origins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const app = createApp({ origins, checkDatabase });
const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.info(`lavadero-api escuchando en puerto ${env.PORT}`);
});

const recoveryWorker = startRecoveryWorker();

/** Cierra conexiones para permitir un despliegue o apagado ordenado. */
function shutdown(): void {
  clearInterval(recoveryWorker);
  const timeout = setTimeout(() => process.exit(1), 10000).unref();
  server.close(() => {
    void (database?.end() ?? Promise.resolve()).finally(() => {
      clearTimeout(timeout);
      process.exit(0);
    });
  });
}
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
