import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { npmProcess, root, stop } from './process.mjs';
import { port, freePort } from './ports.mjs';
import { developmentEnvironment } from './development-env.mjs';

const children = [];
let stopping = false;
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  children.forEach(stop);
  process.exitCode = code;
}
function launch(folder, args, env) {
  const child = npmProcess(folder, args, { env });
  children.push(child);
  child.once('error', () => shutdown(1));
  child.once('exit', (code) => {
    if (!stopping) shutdown(code ?? 1);
  });
}
try {
  if (!existsSync(resolve(root, 'backend/.env')))
    throw new Error('Completá backend/.env con la conexión escolar. Ver README.md.');
  for (const folder of ['backend', 'frontend'])
    if (!existsSync(resolve(root, folder, 'node_modules')))
      throw new Error('Primero ejecutá npm run install:all.');
  const apiPort = port(process.env.LAVADERO_API_PORT, 3000);
  const webPort = port(process.env.LAVADERO_WEB_PORT, 8081);
  if (apiPort === webPort) throw new Error('Frontend y backend necesitan puertos distintos.');
  await Promise.all([freePort(apiPort), freePort(webPort)]);
  launch('backend', ['run', 'dev'], developmentEnvironment(apiPort, webPort));
  launch('frontend', ['run', 'web', '--', '--localhost', '--port', String(webPort)], {
    EXPO_PUBLIC_API_URL: `http://127.0.0.1:${apiPort}`,
    NODE_ENV: 'development',
  });
  console.info(
    `\nLavadero · web: http://localhost:${webPort}\nAPI: http://127.0.0.1:${apiPort}/ready\nBase: la configurada en backend/.env (desarrollo). Ctrl+C detiene ambos.\n`,
  );
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
process.once('SIGINT', () => shutdown());
process.once('SIGTERM', () => shutdown());
