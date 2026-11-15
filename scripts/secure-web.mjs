import process from 'node:process';
import console from 'node:console';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
// Respaldo portable para el HTML; frame-ancestors requiere también el header del alojamiento.
const directory = resolve(process.argv[2] ?? 'web-dist');
const file = resolve(directory, 'index.html');
if (!existsSync(file)) throw new Error('Primero exportá la web.');
const headers = JSON.parse(readFileSync('security-headers.json', 'utf8'));
const policy = headers['Content-Security-Policy'].replace(/frame-ancestors [^;]+; /u, '');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const html = readFileSync(file, 'utf8');
if (!html.includes('http-equiv="Content-Security-Policy"')) {
  writeFileSync(
    file,
    html.replace(
      '<head>',
      `<head><meta http-equiv="Content-Security-Policy" content="${escape(policy)}"><meta name="referrer" content="no-referrer"><script src="/reset-link.js"></script>`,
    ),
  );
}
console.log('HTML protegido; los encabezados HTTP se configuran también en Render.');
