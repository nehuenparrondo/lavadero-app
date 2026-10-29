/** Contrato propio del frontend, documentado en OpenAPI v0.1.0 del backend. */
export interface HealthResponse {
  status: 'ok';
  service: 'lavadero-api';
  version: string;
}
/** Estados de conectividad que puede mostrar la pantalla inicial. */
export type HealthState = 'unconfigured' | 'checking' | 'online' | 'offline';
