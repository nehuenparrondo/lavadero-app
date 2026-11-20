import { z } from 'zod';
/** Provider cerrado evita redirecciones y SSRF por URLs recibidas del cliente. */
export const providerSchema = z.enum(['google', 'discord', 'github']);
/** Contrato AuthSession: exige PKCE S256, state y redirect allowlisted en service. */
export const authorizeSchema = z.object({
  redirect_uri: z.string().max(2048),
  state: z.string().min(16).max(256),
  code_challenge: z.string().regex(/^[A-Za-z0-9_-]{43}$/u),
  code_challenge_method: z.literal('S256'),
  response_type: z.literal('code'),
});
/** Código propio canjeable únicamente con el verifier que inició la app. */
export const oauthExchangeSchema = z
  .object({
    code: z.string().regex(/^[a-f0-9]{64}$/u),
    codeVerifier: z.string().min(43).max(128),
    password: z.string().min(1).max(72).optional(),
  })
  .strict();
