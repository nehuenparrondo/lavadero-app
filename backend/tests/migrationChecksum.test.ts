import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { migrationChecksum, matchesMigrationChecksum } from '../database/migrationChecksum.js';

test('migraciones portables entre LF/CRLF conservan detección de cambios reales', () => {
  const linux = 'CREATE TABLE demo (id INT);\n-- fin\n';
  const windows = linux.replaceAll('\n', '\r\n');
  const historicWindows = createHash('sha256').update(windows).digest('hex');
  assert.equal(migrationChecksum(linux), migrationChecksum(windows));
  assert.ok(matchesMigrationChecksum(linux, historicWindows));
  assert.ok(matchesMigrationChecksum(windows, migrationChecksum(linux)));
  assert.equal(
    matchesMigrationChecksum(linux.replace('INT', 'VARCHAR(10)'), historicWindows),
    false,
  );
});
