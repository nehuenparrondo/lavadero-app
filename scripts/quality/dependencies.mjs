import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';

/** Resuelve imports/reexportaciones locales sin cargar módulos ni ejecutar efectos.
 * @param {object} ts Compilador TypeScript.
 * @param {object} source AST del archivo.
 * @param {string} file Ruta absoluta del módulo.
 * @returns {string[]} Dependencias locales existentes, incluidos imports dinámicos literales.
 */
export function dependencies(ts, source, file) {
  const values = new Set();
  const visit = (node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      values.add(node.moduleSpecifier.text);
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      values.add(node.arguments[0].text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...values]
    .filter((value) => value.startsWith('.'))
    .flatMap((value) => {
      const base = resolve(dirname(file), value.replace(/\.[cm]?js$/u, ''));
      const target = [
        base + '.ts',
        base + '.tsx',
        base + '.mjs',
        base + '.js',
        join(base, 'index.ts'),
      ].find(existsSync);
      return target ? [target] : [];
    });
}

/** Informa ciclos de imports de ejecución o de tipos con su cadena concreta.
 * @param {Map<string, string[]>} graph Dependencias de los archivos propios.
 * @param {(file: string) => string} label Conversión de ruta absoluta a nombre legible.
 * @returns {string[]} Hallazgos; vacío cuando no hay ciclos.
 */
export function dependencyCycles(graph, label) {
  const done = new Set(),
    failures = [];
  const visit = (file, chain) => {
    if (chain.includes(file)) {
      failures.push('Ciclo: ' + [...chain, file].map(label).join(' → '));
      return;
    }
    if (done.has(file)) return;
    for (const next of graph.get(file) ?? []) visit(next, [...chain, file]);
    done.add(file);
  };
  for (const file of graph.keys()) visit(file, []);
  return failures;
}
