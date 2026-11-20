import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import ts from 'typescript';

const root = resolve('src');
const failures: string[] = [];
const graph = new Map<string, string[]>();
const MAX_FILE_LINES = 149;
const MAX_BODY_LINES = 30;
let functionCount = 0;

/** Enumera solo fuente TypeScript; no inspecciona dependencias ni exportaciones generadas. */
function sourceFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory()
      ? sourceFiles(join(folder, item.name))
      : /\.tsx?$/u.test(item.name)
        ? [join(folder, item.name)]
        : [],
  );
}

/** Resuelve imports internos sin ejecutar módulos; considera las extensiones de Node/Expo. */
function dependency(file: string, specifier: string) {
  if (!specifier.startsWith('.')) return undefined;
  const base = resolve(dirname(file), specifier.replace(/\.js$/u, ''));
  return [base + '.ts', base + '.tsx', join(base, 'index.ts')].find(existsSync);
}

/** Audita complejidad por líneas de cuerpo y TSDoc de funciones públicas. */
function inspectNode(node: ts.Node, source: ts.SourceFile, file: string) {
  const callable =
    ts.isFunctionDeclaration(node) ||
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node);
  if (callable && node.body) {
    functionCount++;
    const first = source.getLineAndCharacterOfPosition(node.body.getStart(source)).line;
    const last = source.getLineAndCharacterOfPosition(node.body.end).line;
    if (last - first + 1 > MAX_BODY_LINES)
      failures.push(`${file}:${first + 1}: cuerpo mayor a ${MAX_BODY_LINES} líneas`);
  }
  if (
    ts.isFunctionDeclaration(node) &&
    node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  ) {
    const docs = ts
      .getJSDocCommentsAndTags(node)
      .map((d) => d.getText(source))
      .join('\n');
    if (!docs.includes('@returns') || (node.parameters.length > 0 && !docs.includes('@param')))
      failures.push(`${file}: función pública sin contrato TSDoc completo`);
  }
  ts.forEachChild(node, (child) => inspectNode(child, source, file));
}

/** Registra imports y verifica que las pantallas no ejecuten HTTP directamente. */
function inspectFile(file: string) {
  const text = readFileSync(file, 'utf8');
  const name = relative(process.cwd(), file).replaceAll('\\', '/');
  if (text.split('\n').length > MAX_FILE_LINES)
    failures.push(`${name}: supera ${MAX_FILE_LINES} líneas`);
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const imports = source.statements.filter(
    (item): item is ts.ImportDeclaration | ts.ExportDeclaration =>
      ts.isImportDeclaration(item) || ts.isExportDeclaration(item),
  );
  const dependencies = imports.flatMap((item) => {
    const value =
      item.moduleSpecifier && ts.isStringLiteral(item.moduleSpecifier)
        ? dependency(file, item.moduleSpecifier.text)
        : undefined;
    return value ? [value] : [];
  });
  graph.set(file, dependencies);
  if (
    /src\/(screens|components)\//u.test(name) &&
    /\b(fetch\s*\(|axios\.(get|post|put|patch|delete)\s*\()/u.test(text)
  )
    failures.push(`${name}: HTTP fuera de api/services`);
  inspectNode(source, source, name);
}

/** Detecta también ciclos que solo involucren imports de tipos. */
function assertAcyclic(file: string, chain: string[], complete: Set<string>) {
  if (chain.includes(file)) {
    failures.push(
      'Ciclo: ' + [...chain, file].map((item) => relative(root, item)).join(' -> '),
    );
    return;
  }
  if (complete.has(file)) return;
  for (const next of graph.get(file) ?? []) assertAcyclic(next, [...chain, file], complete);
  complete.add(file);
}

const files = sourceFiles(root);
files.forEach(inspectFile);
const complete = new Set<string>();
files.forEach((file) => assertAcyclic(file, [], complete));
if (failures.length) throw new Error(failures.join('\n'));
console.log(
  `Fuente verificada: ${files.length} archivos, ${functionCount} funciones/callbacks; TSDoc público y sin ciclos.`,
);
