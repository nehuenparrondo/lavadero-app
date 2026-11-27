import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { typescriptFor, parseSource } from '../lib/source-files.mjs';
import { exportsOf, orderModules } from '../docs/source-model.mjs';
const ts = typescriptFor(fileURLToPath(new URL('../../frontend/', import.meta.url)));
const parse = (text) => ts.createSourceFile('fixture.ts', text, ts.ScriptTarget.Latest, true);
test('documentación: conserva funciones, constantes, tipos y reexportaciones sin ejecutar el módulo', () => {
  const source = parse(
    '/** Formato público. */\nexport interface Entry {id:string}\n/** Regla. */\nexport const rule = true;\n/** Lee.\n * @returns Texto.\n */\nexport function read() {throw new Error("Nunca ejecutar");}\nexport {external} from "./other";',
  );
  const entries = exportsOf(ts, source);
  assert.deepEqual(
    entries.map((item) => item.name),
    ['Entry', 'rule', 'read', 'external'],
  );
  assert.equal(entries[2].signature, 'export function read()');
  assert.ok(!entries[2].signature.includes('throw'));
});

test('documentación: el orden no depende de Windows/Linux, mayúsculas ni el orden del directorio', () => {
  const app = { area: 'entry', path: 'App.tsx' },
    config = { area: 'entry', path: 'app.config.ts' },
    src = { area: 'src', path: 'src/app/home.tsx' };
  const windows = [config, app, src],
    linux = [src, app, config];
  assert.deepEqual(orderModules(windows), [src, app, config]);
  assert.deepEqual(orderModules(linux), [src, app, config]);
  assert.deepEqual(windows, [config, app, src]);
});

test('documentación: saltos CRLF y LF producen los mismos contratos y parámetros JSDoc', () => {
  const directory = mkdtempSync(join(tmpdir(), 'lavadero-docs-'));
  const files = ['lf.ts', 'crlf.ts'].map((name) => join(directory, name));
  const content =
    '/** Métrica.\n * @param input Entrada.\n * @returns Resultado.\n */\nexport function metric(\n input: number,\n) { return input; }\n';
  try {
    writeFileSync(files[0], content);
    writeFileSync(files[1], content.replaceAll('\n', '\r\n'));
    const entries = files.map((file) => exportsOf(ts, parseSource(ts, file).source));
    assert.deepEqual(entries[0], entries[1]);
    assert.ok(entries[0][0].docs.includes('\n@param input Entrada.'));
    assert.ok(entries[0][0].docs.includes('\n@returns Resultado.'));
  } finally {
    for (const file of files) unlinkSync(file);
    rmdirSync(directory);
  }
});
