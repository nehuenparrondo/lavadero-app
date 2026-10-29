import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseApiUrl } from '../src/utils/parseApiUrl';

test('solo admite origen HTTPS sin credenciales ni path', () => {
  assert.equal(parseApiUrl('https://lavadero.onrender.com/'), 'https://lavadero.onrender.com');
  for (const value of [
    undefined,
    '',
    'http://localhost:3000',
    'https://localhost',
    'https://127.0.0.1',
    'https://[::1]',
    'https://user:secret@api.example',
    'https://api.example/api/v1',
    'https://api.example?secret=x',
  ]) {
    assert.equal(parseApiUrl(value), null);
  }
});
