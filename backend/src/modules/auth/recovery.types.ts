import type { RowDataPacket } from 'mysql2/promise';
/** Trabajo privado; nunca se serializa en una respuesta HTTP. */
export interface RecoveryJob extends RowDataPacket {
  id: string;
  email: string;
  userId: string | null;
  authVersion: number | null;
  nonce: Buffer;
  tokenHash: Buffer | null;
  status: string;
  attempts: number;
  expiresAt: string | null;
  requestedAt: string;
}
/** Puerto de entrega inyectable para pruebas sin consumir el cupo de Mailtrap. */
export type RecoverySender = (email: string, url: string) => Promise<void>;
