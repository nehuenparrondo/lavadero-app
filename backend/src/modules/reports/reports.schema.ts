import { z } from 'zod';
/** Período calendario local del negocio. */
export const reportSchema = z.object({
  period: z.enum(['day', 'week', 'month']).default('week'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u)
    .optional(),
});
