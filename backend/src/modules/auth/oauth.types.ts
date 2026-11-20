import type { RowDataPacket } from 'mysql2/promise';
/** Proveedores OAuth admitidos. URLs nunca se reciben del usuario. */
export type Provider = 'google' | 'discord' | 'github';
/** Identidad obtenida directamente del proveedor, con email verificado. */
export interface SocialIdentity {
  subject: string;
  email: string;
  firstName: string;
  lastName: string;
}
/** Estado interno efímero vinculado a la solicitud AuthSession del dispositivo. */
export interface OAuthState extends RowDataPacket {
  provider: Provider;
  /** State original del cliente, devuelto sin sustituir la validación del servidor. */
  clientState: string;
  redirectUri: string;
  /** Challenge S256 que vincula el código con el dispositivo solicitante. */
  clientChallenge: string;
  /** Verifier de proveedor conservado exclusivamente en el backend. */
  providerVerifier: string;
}
