/** Punto de entrada del backend: comparte reglas con frontend y revisa también database/. */
import { verifySource } from '../../scripts/quality/audit-source.mjs';
import process from 'node:process';
verifySource(process.cwd());
