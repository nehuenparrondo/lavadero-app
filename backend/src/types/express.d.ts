import type { Actor } from './domain.js';
declare global {
  namespace Express {
    interface Request {
      actor?: Actor;
    }
  }
}
export {};
