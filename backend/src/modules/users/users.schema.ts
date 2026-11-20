import { z } from 'zod';
import { ROLES } from '../../constants/business.js';
import { paginationSchema } from '../../utils/pagination.js';
import { passwordSchema } from '../../utils/password.js';
import { registerSchema } from '../auth/auth.schema.js';

/** Perfil propio sin campos de privilegios. */
export const profileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().max(80).optional(),
    phone: z.string().max(30).nullable().optional(),
  })
  .strict();
/** Alta por administrador con rol explícito opcional. */
export const createUserSchema = registerSchema.extend({
  role: z.enum(['client', 'employee']).default('client'),
});
/** Edición administrativa, separada de promoción/degradación. */
export const adminPatchSchema = profileSchema.extend({
  email: z.email().max(254).optional(),
  isActive: z.boolean().optional(),
  canRecordPayments: z.boolean().optional(),
});
/** Cambio de contraseña exige acreditar la contraseña actual. */
export const passwordChangeSchema = z
  .object({ currentPassword: z.string().min(1).max(200), newPassword: passwordSchema })
  .strict();
/** Filtro de usuarios administrativo. */
export const usersQuerySchema = paginationSchema.extend({
  role: z.enum(ROLES).optional(),
});
/** Rol sin posibilidad de incluir campos de perfil. */
export const roleSchema = z.object({ role: z.enum(ROLES) }).strict();
