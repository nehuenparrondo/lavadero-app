/** Comprueba fronteras entre capas usando imports y llamadas reales del AST.
 * @param {object} ts Compilador TypeScript.
 * @param {object} source AST del archivo propio.
 * @param {string} name Ruta relativa que identifica la capa.
 * @returns {string[]} Incumplimientos de separación de responsabilidades.
 */
export function architectureFailures(ts, source, name) {
  const failures = [];
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const specifier = statement.moduleSpecifier.text;
    if (name.endsWith('.controller.ts') && specifier.includes('.repository'))
      failures.push(`${name}: controller debe pasar por service antes de repository`);
    if (
      name.endsWith('.service.ts') &&
      specifier.endsWith('/utils/db.js') &&
      !statement.importClause?.isTypeOnly
    )
      failures.push(
        `${name}: el SQL debe permanecer en repository; solo Executor puede importarse como tipo`,
      );
    if (
      /src\/(screens|components)\//u.test(name) &&
      /(?:api\/(?:transport|services)|^axios$)/u.test(specifier)
    )
      failures.push(`${name}: acceso HTTP debe pasar por un hook`);
  }
  if (/src\/(screens|components)\//u.test(name)) inspectUiCalls(ts, source, name, failures);
  return failures;
}

/** Evita falsos positivos por palabras fetch/axios dentro de comentarios o textos de ayuda.
 * @param {object} ts Compilador TypeScript.
 * @param {object} source AST de una pantalla o componente.
 * @param {string} name Ruta legible del archivo.
 * @param {string[]} failures Colector de errores.
 * @returns {void} Registra llamadas directas a transporte en la interfaz.
 */
function inspectUiCalls(ts, source, name, failures) {
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const expression = node.expression.getText(source);
      if (expression === 'fetch' || /^axios\.(get|post|put|patch|delete)$/u.test(expression))
        failures.push(`${name}: HTTP directo fuera de api/services`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}
