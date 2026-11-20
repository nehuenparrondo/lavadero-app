import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { root } from './process.mjs';
import { port, freePort } from './ports.mjs';

const directory = resolve(root, 'frontend/web-dist');
const headers = JSON.parse(
  await readFile(resolve(root, 'frontend/security-headers.json'), 'utf8'),
);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ttf': 'font/ttf',
};
const previewPort = port(process.env.LAVADERO_PREVIEW_PORT, 8086);
await freePort(previewPort);
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(directory, '.' + pathname);
    if (file !== directory && !file.startsWith(directory + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    if (!extname(pathname)) file = resolve(directory, 'index.html');
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    response.writeHead(200, {
      ...headers,
      'Cache-Control': 'no-store',
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end('Recurso no encontrado. Ejecutá npm run build antes de la vista previa.');
  }
});
server.listen(previewPort, '127.0.0.1', () =>
  console.info(
    `Vista previa de producción: http://127.0.0.1:${previewPort}. Conecta a la API HTTPS publicada.`,
  ),
);
process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
