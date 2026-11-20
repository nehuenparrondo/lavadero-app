import { z } from 'zod';

/** Valida configuración antes de aceptar solicitudes; los secretos no se imprimen. */
export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    MAINTENANCE_MODE: z.enum(['true', 'false']).default('false'),
    DATABASE_URL: z.url().startsWith('mysql://').optional(),
    DATABASE_TLS: z.enum(['true', 'false']).default('true'),
    DATABASE_CA_BASE64: z.string().optional(),
    DATABASE_POOL_SIZE: z.coerce.number().int().min(1).max(10).default(5),
    CORS_ORIGINS: z.string().default(''),
    JWT_ACCESS_SECRET: z.string().min(32).optional(),
  })
  .superRefine((value, context) => {
    if (value.NODE_ENV === 'production' && !value.JWT_ACCESS_SECRET) {
      context.addIssue({
        code: 'custom',
        message: 'Producción requiere una clave JWT segura.',
      });
    }
    if (
      value.NODE_ENV === 'production' &&
      (!value.DATABASE_URL || value.DATABASE_TLS !== 'true')
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Producción requiere MariaDB/MySQL y TLS.',
      });
    }
  });
