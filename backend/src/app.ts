import express from 'express';
import helmet from 'helmet';
import { readFileSync } from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import './config/validation.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { createCors } from './middlewares/createCors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { createMaintenanceGuard } from './middlewares/maintenanceGuard.js';
import { createHealthRoutes } from './modules/health/health.routes.js';
import { createInformationRoutes } from './modules/health/information.routes.js';
import { createApiRoutes } from './routes.js';

/** Dependencias de infraestructura que no contienen lógica de negocio. */
interface AppOptions {
  origins: readonly string[];
  checkDatabase: () => Promise<void>;
  maintenance?: boolean;
}

/** Compone Express. No abre puertos ni conecta MySQL al importarse.
 * @param options - Configuración de la composición o del recurso.
 * @returns `import("express-serve-static-core").Express`.
 */
export function createApp(options: AppOptions) {
  const app = express();
  const contract = JSON.parse(readFileSync('docs/openapi.json', 'utf8')) as Record<
    string,
    unknown
  >;
  app.disable('x-powered-by');
  app.set('query parser', 'simple');
  if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);
  app.use(helmet(), createCors(options.origins), express.json({ limit: '32kb' }));
  app.use(createHealthRoutes(options.checkDatabase));
  app.use(createInformationRoutes());
  app.get('/api/v1', (_request, response) => response.json({ version: 'v1', stage: 10 }));
  app.use(
    '/api/v1',
    createMaintenanceGuard(options.maintenance ?? process.env.MAINTENANCE_MODE === 'true'),
    createApiRoutes(),
  );
  app.get('/api/openapi.json', (_request, response) => response.json(contract));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(contract));
  app.use((_request, _response, next) => next(new NotFoundError()));
  app.use(errorHandler);
  return app;
}
