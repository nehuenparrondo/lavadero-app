import { npmProcess, completed } from './process.mjs';

const tasks = {
  install: [
    ['backend', ['ci']],
    ['frontend', ['ci']],
  ],
  check: [
    ['.', ['run', 'lint']],
    ['.', ['run', 'test:tooling']],
    ['.', ['run', 'docs:check']],
    ['backend', ['run', 'check']],
    ['frontend', ['run', 'check']],
  ],
  build: [
    ['backend', ['run', 'build']],
    ['frontend', ['run', 'export:web']],
  ],
  web: [['frontend', ['run', 'export:web']]],
  android: [['frontend', ['run', 'export:android']]],
  migrate: [['backend', ['run', 'db:migrate']]],
  docs: [
    ['backend', ['run', 'docs:source']],
    ['frontend', ['run', 'docs:source']],
    ['frontend', ['run', 'docs:components']],
  ],
  'docs-check': [
    ['backend', ['run', 'docs:source', '--', '--check']],
    ['frontend', ['run', 'docs:source', '--', '--check']],
    ['frontend', ['run', 'docs:components', '--', '--check']],
  ],
};

try {
  const steps = tasks[process.argv[2]];
  if (!steps)
    throw new Error('Operación desconocida. Usá los comandos del package.json de main.');
  for (const [folder, args] of steps) {
    console.info(`\nLavadero · ${folder}: ${args.join(' ')}`);
    await completed(npmProcess(folder, args), folder);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
