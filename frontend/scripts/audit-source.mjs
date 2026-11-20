/** Punto de entrada de Expo: verifica contratos, capas, tamaño y dependencias de src/. */
import { verifySource } from '../../scripts/quality/audit-source.mjs';
import process from 'node:process';
verifySource(process.cwd());
