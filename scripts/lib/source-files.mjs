import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';

/** Enumera archivos propios en orden estable; no sigue enlaces ni entra en dependencias.
 * @param {string} directory Directorio de código, nunca un archivo de entorno.
 * @param {RegExp} extension Extensiones que necesita el consumidor.
 * @returns {string[]} Rutas absolutas de archivos regulares.
 */
export function sourceFiles(directory, extension = /\.[cm]?[tj]sx?$/u) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) return [];
      const file = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(file, extension);
      return entry.isFile() && extension.test(entry.name) ? [file] : [];
    })
    .sort();
}

/** Usa el compilador ya instalado por cada aplicación; la raíz no duplica dependencias.
 * @param {string} project Directorio que contiene package.json y node_modules.
 * @returns {typeof import('typescript')} API de análisis estático de TypeScript.
 */
export function typescriptFor(project) {
  return createRequire(join(project, 'package.json'))('typescript');
}

/** Obtiene texto y AST con saltos LF, sin importar ni ejecutar el archivo inspeccionado.
 * @param {typeof import('typescript')} ts Compilador del proyecto.
 * @param {string} file Archivo de código propio.
 * @returns {{ text: string, source: import('typescript').SourceFile }} Entrada para auditoría/documentación.
 */
export function parseSource(ts, file) {
  const text = readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
  return { text, source: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true) };
}

/** Normaliza separadores para que informes y enlaces coincidan en Windows y Linux.
 * @param {string} root Base del proyecto.
 * @param {string} file Archivo que se referencia.
 * @returns {string} Ruta relativa con barras URL.
 */
export function relativePath(root, file) {
  return relative(root, file).replaceAll('\\', '/');
}
