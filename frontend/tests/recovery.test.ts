import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parseResetLink } from '../src/utils/resetLink';
test('Recuperación solo admite secreto del fragmento, sin consultas, HTML ni valores parciales', () => {
  const token = 'a'.repeat(64);
  assert.equal(parseResetLink('https://app.example/reset-password#token=' + token), token);
  assert.equal(parseResetLink('https://app.example/reset-password?token=' + token), '');
  assert.equal(parseResetLink('https://app.example/reset-password#token=<script>'), '');
  assert.equal(parseResetLink('no-url'), '');
});
test('CSP de publicación bloquea scripts inyectados, objetos y sitios embebidos', () => {
  const headers = JSON.parse(readFileSync('security-headers.json', 'utf8')) as Record<
    string,
    string
  >;
  const policy = headers['Content-Security-Policy']!;
  assert.ok(policy.includes("script-src 'self';"));
  assert.ok(!policy.includes('unsafe-eval'));
  assert.ok(policy.includes("object-src 'none'"));
  assert.ok(policy.includes("frame-ancestors 'none'"));
  assert.equal(headers['Referrer-Policy'], 'no-referrer');
});
test('El arranque captura el enlace en memoria antes de Router y lo retira sin usar almacenamiento', () => {
  const token = 'b'.repeat(64);
  const script = readFileSync('public/reset-link.js', 'utf8');
  const paths: string[] = [];
  const window: {
    location: { pathname: string; hash: string };
    history: {
      state: null;
      replaceState: (state: unknown, title: string, url: string) => void;
    };
    __lavaderoRecoveryToken?: () => string;
  } = {
    location: { pathname: '/reset-password', hash: '#token=' + token },
    history: {
      state: null,
      replaceState: (_state, _title, url) => {
        paths.push(url);
      },
    },
  };
  runInNewContext(script, { window, URLSearchParams });
  assert.equal(window.__lavaderoRecoveryToken?.(), token);
  assert.deepEqual(paths, ['/reset-password']);
  delete window.__lavaderoRecoveryToken;
  window.location = { pathname: '/profile', hash: '#token=' + token };
  runInNewContext(script, { window, URLSearchParams });
  assert.equal(window.__lavaderoRecoveryToken, undefined);
  assert.equal(paths.length, 1);
});
