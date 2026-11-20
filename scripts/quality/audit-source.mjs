import { existsSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import {
  parseSource,
  relativePath,
  sourceFiles,
  typescriptFor,
} from '../lib/source-files.mjs';
import { inspectContracts } from './contracts.mjs';
import { dependencies, dependencyCycles } from './dependencies.mjs';
import { architectureFailures } from './architecture.mjs';

/** Audita código de aplicación y contratos del migrador; retorna métricas reproducibles.
 * @param {string} project Raíz absoluta de backend o frontend.
 * @returns {{ files: number, functions: number, publicFunctions: number, failures: string[] }} Informe sin secretos.
 */
export function auditSource(project) {
  const ts = typescriptFor(project),
    graph = new Map();
  const metrics = { files: 0, functions: 0, publicFunctions: 0, failures: [] };
  const areas = ['src', 'database'].filter((area) => existsSync(join(project, area)));
  for (const area of areas) {
    for (const file of sourceFiles(join(project, area), /\.tsx?$/u)) {
      const { text, source } = parseSource(ts, file),
        name = relativePath(project, file);
      metrics.files++;
      if (area === 'src' && text.split('\n').length > 149)
        metrics.failures.push(`${name}: supera 149 líneas`);
      inspectContracts({
        ts,
        source,
        name,
        metrics,
        failures: metrics.failures,
        limitBodies: area === 'src',
      });
      const imports = dependencies(ts, source, file);
      graph.set(file, imports);
      if (imports.some((target) => !target.startsWith(resolve(project) + sep)))
        metrics.failures.push(`${name}: la aplicación importa código fuera de su proyecto`);
      metrics.failures.push(...architectureFailures(ts, source, name));
    }
  }
  metrics.failures.push(...dependencyCycles(graph, (file) => relativePath(project, file)));
  return metrics;
}

/** Falla el comando de verificación si hay una frontera, contrato o ciclo incumplido.
 * @param {string} project Directorio desde el que npm inició la auditoría.
 * @returns {void} Escribe únicamente métricas y rutas de hallazgos.
 */
export function verifySource(project) {
  const result = auditSource(project);
  if (result.failures.length) throw new Error(result.failures.join('\n'));
  console.info(
    `Fuente verificada: ${result.files} archivos, ${result.functions} funciones/callbacks, ${result.publicFunctions} contratos públicos; sin ciclos ni cruces de capa.`,
  );
}
