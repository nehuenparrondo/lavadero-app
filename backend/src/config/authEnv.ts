import 'dotenv/config';
import { z } from 'zod';

/** Configuración privada de autenticación, validada sin imprimir valores sensibles. */
export const authEnv = z
  .object({
    JWT_ACCESS_SECRET: z.string().min(32).optional(),
    JWT_ISSUER: z.string().default('lavadero-api'),
    JWT_AUDIENCE: z.string().default('lavadero-app'),
    PUBLIC_API_URL: z.url().optional(),
    OAUTH_REDIRECT_URIS: z.string().default('lavadero://oauth'),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
  })
  .parse(process.env);
