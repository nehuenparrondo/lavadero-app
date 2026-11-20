import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { typescriptFor } from '../lib/source-files.mjs';
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
