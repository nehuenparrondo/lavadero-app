import { Router } from 'express';
import {
  createAppointmentsRoutes,
  createAvailabilityRoutes,
} from './modules/appointments/appointments.routes.js';
import { createAuthRoutes } from './modules/auth/auth.routes.js';
import { createAttendanceRoutes } from './modules/attendance/attendance.routes.js';
import { createMessageRoutes } from './modules/customerMessages/messages.routes.js';
import { createOAuthRoutes } from './modules/auth/oauth.routes.js';
import { createPaymentsRoutes } from './modules/payments/payments.routes.js';
import { createReportsRoutes } from './modules/reports/reports.routes.js';
import { createServicesRoutes } from './modules/services/services.routes.js';
import {
  createBusinessRoutes,
  createSettingsRoutes,
} from './modules/settings/settings.routes.js';
import { createUsersRoutes } from './modules/users/users.routes.js';
import { createVehiclesRoutes } from './modules/vehicles/vehicles.routes.js';
import { createVehicleTypesRoutes } from './modules/vehicleTypes/vehicleTypes.routes.js';

/** Compone módulos autónomos bajo /api/v1 sin lógica de negocio.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createApiRoutes() {
  const r = Router();
  r.use('/auth', createOAuthRoutes());
  r.use('/auth', createAuthRoutes());
  r.use('/users', createUsersRoutes());
  r.use('/vehicles', createVehiclesRoutes());
  r.use('/vehicle-types', createVehicleTypesRoutes());
  r.use('/services', createServicesRoutes());
  r.use('/settings', createSettingsRoutes());
  r.use('/business', createBusinessRoutes());
  r.use('/availability', createAvailabilityRoutes());
  r.use('/appointments/:id/payments', createPaymentsRoutes());
  r.use('/appointments', createAppointmentsRoutes());
  r.use('/reports', createReportsRoutes());
  r.use('/attendance', createAttendanceRoutes());
  r.use('/customer-messages', createMessageRoutes());
  return r;
}
