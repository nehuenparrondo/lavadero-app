/** Genera documentación desde AST usando las herramientas comunes del repositorio. */
import { documentSource } from '../../scripts/docs/document-source.mjs';
import process from 'node:process';
await documentSource(process.cwd(), process.argv.includes('--check'));
