import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { typescriptFor } from '../lib/source-files.mjs';
import { inspectContracts } from '../quality/contracts.mjs';
import { dependencyCycles } from '../quality/dependencies.mjs';
import { architectureFailures } from '../quality/architecture.mjs';

const ts = typescriptFor(fileURLToPath(new URL('../../frontend/', import.meta.url)));
const parse = (text) => ts.createSourceFile('fixture.ts', text, ts.ScriptTarget.Latest, true);
/** Ejecuta el auditor sobre una función sintética; no importa ni ejecuta fixtures. */
function contracts(text) {
  const metrics = { functions: 0, publicFunctions: 0 },
    failures = [];
  inspectContracts({ ts, source: parse(text), name: 'fixture.ts', metrics, failures });
  return failures;
}

test('contratos: exige explicar cada parámetro y el resultado', () => {
  const partial =
    '/** Suma.\n * @param first Importe inicial.\n * @returns Total.\n */\nexport function sum(first, second) { return first + second; }';
  assert.deepEqual(contracts(partial), ['fixture.ts#sum: falta documentar second']);
  assert.deepEqual(
    contracts(
      partial.replace(' * @returns', ' * @param second Importe agregado.\n * @returns'),
    ),
    [],
  );
});

test('contratos: admite props desestructuradas y rechaza una función sin explicación', () => {
  assert.equal(contracts('export function missing() {}').length, 2);
  assert.deepEqual(
    contracts(
      '/** Presenta.\n * @param props Datos de entrada.\n * @returns Texto.\n */\nexport function show({label}) { return label; }',
    ),
    [],
  );
});

test('contratos: también revisa funciones públicas declaradas como constantes', () => {
  assert.ok(
    contracts('export const run = (value) => value;').some((message) =>
      message.includes('falta documentar value'),
    ),
  );
  assert.deepEqual(
    contracts(
      '/** Conserva.\n * @param value Dato.\n * @returns Mismo dato.\n */\nexport const run = (value) => value;',
    ),
    [],
  );
});

test('complejidad: detecta cuerpos grandes dentro de callbacks, aunque no se exporten', () => {
  assert.ok(
    contracts('const handler = () => {\n' + 'const x = 1;\n'.repeat(31) + '};').some(
      (message) => message.includes('cuerpo mayor'),
    ),
  );
});

test('dependencias: detecta ciclos de reexportación y permite un diamante sin ciclo', () => {
  const cyclic = new Map([
    ['a', ['b']],
    ['b', ['c']],
    ['c', ['a']],
  ]);
  assert.match(dependencyCycles(cyclic, (file) => file)[0], /a → b → c → a/u);
  const diamond = new Map([
    ['a', ['b', 'c']],
    ['b', ['d']],
    ['c', ['d']],
    ['d', []],
  ]);
  assert.deepEqual(
    dependencyCycles(diamond, (file) => file),
    [],
  );
});

test('capas: prohíbe saltar servicio o repositorio, conservando imports solo de tipos', () => {
  assert.equal(
    architectureFailures(
      ts,
      parse("import { list } from './users.repository.js';"),
      'src/users.controller.ts',
    ).length,
    1,
  );
  assert.equal(
    architectureFailures(
      ts,
      parse("import { execute } from '../../utils/db.js';"),
      'src/users.service.ts',
    ).length,
    1,
  );
  assert.deepEqual(
    architectureFailures(
      ts,
      parse("import type { Executor } from '../../utils/db.js';"),
      'src/users.service.ts',
    ),
    [],
  );
});

test('interfaz: inspecciona llamadas/imports reales, sin confundir comentarios ni textos', () => {
  assert.deepEqual(
    architectureFailures(
      ts,
      parse('// fetch() queda fuera de componentes\nconst help = "axios.get()";'),
      'src/screens/Page.tsx',
    ),
    [],
  );
  assert.equal(
    architectureFailures(ts, parse("fetch('/api');"), 'src/screens/Page.tsx').length,
    1,
  );
  assert.equal(
    architectureFailures(
      ts,
      parse("import { read } from '../../api/services/resourceService';"),
      'src/components/organisms/Page.tsx',
    ).length,
    1,
  );
});
