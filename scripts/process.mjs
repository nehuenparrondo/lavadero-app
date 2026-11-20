import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Ejecuta npm sin intérprete de comandos ni interpolación de argumentos en Windows. */
export function npmProcess(folder, args, options = {}) {
  const cli =
    process.env.npm_execpath ??
    resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
  if (!existsSync(cli)) throw new Error('Ejecutá este comando con npm desde main.');
  return spawn(process.execPath, [cli, ...args], {
    cwd: resolve(root, folder),
    stdio: 'inherit',
    ...options,
    env: { ...process.env, ...options.env },
  });
}

/** Convierte fallos de procesos en una salida fallida del comando principal. */
export function completed(child, label) {
  return new Promise((resolveResult, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) =>
      code === 0
        ? resolveResult()
        : reject(
            new Error(`${label} terminó ${signal ? `por ${signal}` : `con código ${code}`}.`),
          ),
    );
  });
}

/** Apaga únicamente el árbol de procesos que inició este comando. */
export function stop(child) {
  if (!child?.pid || child.exitCode !== null) return;
  if (process.platform === 'win32') {
    const killer = spawn('taskkill.exe', ['/pid', String(child.pid), '/t', '/f'], {
      stdio: 'ignore',
      windowsHide: true,
    });
    killer.on('error', () => child.kill());
  } else child.kill('SIGTERM');
}
