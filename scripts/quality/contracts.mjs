/** Revisa contratos públicos y tamaño de cuerpos; los callbacks no exigen comentarios redundantes.
 * @param {object} context Compilador, AST, ruta, contador y colector de hallazgos.
 * @returns {void} Agrega hallazgos; no modifica el código.
 */
export function inspectContracts({ ts, source, name, metrics, failures, limitBodies = true }) {
  const visit = (node) => {
    const callable =
      ts.isFunctionDeclaration(node) ||
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isMethodDeclaration(node);
    if (callable && node.body) {
      metrics.functions++;
      const first = source.getLineAndCharacterOfPosition(node.body.getStart(source)).line;
      const last = source.getLineAndCharacterOfPosition(node.body.end).line;
      if (limitBodies && last - first + 1 > 30)
        failures.push(`${name}:${first + 1}: cuerpo mayor a 30 líneas`);
      if (ts.isFunctionDeclaration(node))
        inspectDeclaration(ts, node, source, name, metrics, failures);
      if (ts.isArrowFunction(node) && ts.isVariableDeclaration(node.parent)) {
        const owner = node.parent.parent.parent;
        if (
          ts.isVariableStatement(owner) &&
          owner.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
        )
          inspectDeclaration(
            ts,
            node,
            source,
            name,
            metrics,
            failures,
            owner,
            node.parent.name.getText(source),
          );
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

/** Comprueba cada parámetro real de una función pública, en vez de aceptar un único @param.
 * @param {object} ts Compilador TypeScript.
 * @param {object} node Declaración de función.
 * @param {object} source AST para recuperar documentación.
 * @param {string} name Ruta legible del archivo.
 * @param {object} metrics Totales acumulados.
 * @param {string[]} failures Lista que recibe incumplimientos.
 * @param {object} owner Nodo que conserva JSDoc y modificador export; por defecto la función.
 * @param {string} display Nombre de una constante callable, si corresponde.
 * @returns {void} Conserva la firma y el comportamiento inspeccionados.
 */
function inspectDeclaration(ts, node, source, name, metrics, failures, owner = node, display) {
  const docs = ts
    .getJSDocCommentsAndTags(owner)
    .map((doc) => doc.getText(source))
    .join('\n');
  const label = `${name}#${display ?? node.name?.text ?? 'default'}`;
  if (!docs) failures.push(`${label}: función con nombre sin explicación`);
  if (!owner.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)) return;
  metrics.publicFunctions++;
  if (!/@returns\s+\S/u.test(docs)) failures.push(`${label}: falta documentar el resultado`);
  for (const parameter of node.parameters) {
    const key = ts.isIdentifier(parameter.name) ? parameter.name.text : undefined;
    const documented = key
      ? new RegExp(`@param\\s+(?:\\{[^}]+\\}\\s+)?${key}(?:\\s|\\.)`, 'u').test(docs)
      : /@param\s+\S/u.test(docs);
    if (!documented) failures.push(`${label}: falta documentar ${key ?? 'las propiedades'}`);
  }
}
