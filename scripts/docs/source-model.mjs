import { dirname, basename, join } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import {
  parseSource,
  relativePath,
  sourceFiles,
  typescriptFor,
} from '../lib/source-files.mjs';

/** Extrae la explicación del JSDoc; no inventa significado a partir del nombre de una función.
 * @param {object} ts Compilador TypeScript.
 * @param {object} node Declaración documentada.
 * @param {object} source AST del archivo.
 * @returns {string} Comentario legible completo, incluidos parámetros y advertencias.
 */
export function commentOf(ts, node, source) {
  return ts
    .getJSDocCommentsAndTags(node)
    .map((doc) =>
      doc
        .getText(source)
        .replace(/^\/\*\*\s*|\s*\*\/$/gu, '')
        .replace(/^\s*\* ?/gmu, ''),
    )
    .join('\n')
    .trim();
}

/** Identifica exportaciones de funciones, tipos, constantes y reexportaciones sin ejecutar código.
 * @param {object} ts Compilador TypeScript.
 * @param {object} source AST del archivo propio.
 * @returns {object[]} Nombre, explicación y firma pública de cada exportación.
 */
export function exportsOf(ts, source) {
  return source.statements.flatMap((statement) => {
    const docs = commentOf(ts, statement, source);
    if (ts.isExportDeclaration(statement))
      return (
        statement.exportClause?.elements?.map((item) => ({
          name: item.name.text,
          docs,
          signature: '',
        })) ?? []
      );
    if (!statement.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword))
      return [];
    if (ts.isVariableStatement(statement))
      return statement.declarationList.declarations.map((item) => ({
        name: item.name.getText(source),
        docs,
        signature: '',
      }));
    const signature =
      ts.isFunctionDeclaration(statement) && statement.body
        ? source.text.slice(statement.getStart(source), statement.body.getStart(source)).trim()
        : '';
    return [{ name: statement.name?.text ?? 'default', docs, signature }];
  });
}

/** Inventaría código propio de producción, migradores, scripts y pruebas; excluye secretos y paquetes.
 * @param {string} project Directorio backend o frontend.
 * @returns {object[]} Módulos ordenados con exportaciones documentadas y línea de fuente.
 */
export function projectModules(project) {
  const ts = typescriptFor(project),
    areas = ['src', 'database', 'scripts', 'tests'];
  const files = areas
    .filter((area) => existsSync(join(project, area)))
    .flatMap((area) => sourceFiles(join(project, area)).map((file) => ({ file, area })));
  for (const entry of readdirSync(project, { withFileTypes: true })) {
    if (entry.isFile() && /\.[cm]?[tj]sx?$/u.test(entry.name))
      files.push({ file: join(project, entry.name), area: 'entry' });
  }
  return files.map(({ file, area }) => moduleRecord(ts, project, file, area));
}

/** Resume un módulo sin importar su configuración o ejecutar sus efectos de arranque.
 * @param {object} ts Compilador del proyecto.
 * @param {string} project Raíz para enlaces relativos.
 * @param {string} file Archivo propio inventariado.
 * @param {string} area Capa de aplicación, herramienta o punto de entrada.
 * @returns {object} Descriptor para los índices de documentación.
 */
function moduleRecord(ts, project, file, area) {
  const { source } = parseSource(ts, file),
    exports = exportsOf(ts, source);
  const firstDoc =
    exports.find((item) => item.docs)?.docs ||
    source.statements.map((node) => commentOf(ts, node, source)).find(Boolean);
  const summary =
    firstDoc?.split(/\n@/u)[0].replace(/\s+/gu, ' ').trim() || areaDescription(area);
  return {
    file,
    path: relativePath(project, file),
    folder: relativePath(project, dirname(file)),
    name: basename(file),
    area,
    summary,
    exports,
  };
}

/** Describe el alcance de archivos de composición que no exponen una API propia.
 * @param {string} area Carpeta superior del proyecto.
 * @returns {string} Contexto verificable de la ubicación.
 */
function areaDescription(area) {
  return {
    src: 'Composición interna; los tipos y el flujo se consultan en la fuente.',
    database:
      'Comando o soporte de migración/semillas; ejecutar solo en la base seleccionada.',
    scripts:
      'Herramienta de documentación, verificación o exportación; no forma parte del servidor/app.',
    tests: 'Escenarios y aserciones que verifican el comportamiento descrito por cada test.',
    entry:
      'Punto de entrada o configuración del proyecto; consultar su declaración y los comandos de la guía de instalación.',
  }[area];
}
