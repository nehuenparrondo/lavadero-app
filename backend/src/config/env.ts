import 'dotenv/config';
import { readEnv } from './readEnv.js';

/** Configuración de proceso validada una sola vez al iniciar. */
export const env = readEnv(process.env);
