import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitSqlStatements } from '../database/splitSqlStatements.js';

test('el separador SQL no rompe cadenas con punto y coma', () => {
  const statements = splitSqlStatements("SELECT 'a; b';\n-- statement-breakpoint\nSELECT 1;");
  assert.deepEqual(statements, ["SELECT 'a; b';", 'SELECT 1;']);
});
