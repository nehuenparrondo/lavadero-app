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

test('desarrollo admite únicamente loopback cuando se habilita explícitamente', () => {
  for (const value of ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://[::1]:3000'])
    assert.equal(parseApiUrl(value, true), value);
  for (const value of [
    'http://0.0.0.0:3000',
    'http://192.168.1.10:3000',
    'http://localhost.evil.example',
    'http://localhost:3000/api/v1',
    'http://user:pass@localhost:3000',
    'javascript:alert(1)',
  ])
    assert.equal(parseApiUrl(value, true), null);
});

test('publicación mantiene HTTPS obligatorio aunque el desarrollo permita HTTP local', () => {
  assert.equal(parseApiUrl('http://127.0.0.1:3000', false), null);
  assert.equal(
    parseApiUrl('https://lavadero-api-48m4.onrender.com', false),
    'https://lavadero-api-48m4.onrender.com',
  );
  assert.equal(parseApiUrl('http://api.example.invalid', true), null);
});
