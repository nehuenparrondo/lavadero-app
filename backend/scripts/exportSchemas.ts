import { writeFile } from 'node:fs/promises';
import { z } from 'zod';
import * as auth from '../src/modules/auth/auth.schema.js';
import * as recovery from '../src/modules/auth/recovery.schema.js';
import * as users from '../src/modules/users/users.schema.js';
import * as vehicles from '../src/modules/vehicles/vehicles.schema.js';
import * as services from '../src/modules/services/services.schema.js';
import * as appointments from '../src/modules/appointments/appointments.schema.js';
import * as work from '../src/modules/appointments/work.schema.js';
import * as messages from '../src/modules/customerMessages/messages.schema.js';
import { vehicleTypeSchema } from '../src/modules/vehicleTypes/vehicleTypes.schema.js';
import { settingsSchema } from '../src/modules/settings/settings.schema.js';
import { paymentSchema } from '../src/modules/payments/payments.schema.js';
import { oauthExchangeSchema } from '../src/modules/auth/oauth.schema.js';
import { walkInSchema } from '../src/modules/appointments/walkIn.schema.js';

/** Esquemas de entrada OpenAPI obtenidos de las mismas validaciones que ejecuta Express. */
const schemas = {
  ...auth,
  ...recovery,
  ...users,
  ...vehicles,
  ...services,
  ...appointments,
  ...work,
  ...messages,
  vehicleTypeSchema,
  settingsSchema,
  paymentSchema,
  oauthExchangeSchema,
  walkInSchema,
};
const exported = Object.fromEntries(
  Object.entries(schemas).map(([name, schema]) => [
    name,
    z.toJSONSchema(schema, { io: 'input', unrepresentable: 'any' }),
  ]),
);
await writeFile('docs/request-schemas.json', JSON.stringify(exported, null, 2) + '\n');
console.info('Esquemas de entrada exportados desde Zod.');
