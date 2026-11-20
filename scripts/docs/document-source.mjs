import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { projectModules } from './source-model.mjs';
import { sourceMap, folderGuide } from './render-source.mjs';
import { purposeOf } from './purposes.mjs';

/** Reconstruye o comprueba documentación de todos los módulos propios del proyecto.
 * @param {string} project Directorio backend o frontend con sus dependencias instaladas.
 * @param {boolean} check true compara sin escribir; útil para detectar documentación desactualizada en CI.
 * @returns {Promise<void>} Falla si un archivo generado no coincide en modo comprobación.
 */
export async function documentSource(project, check = false) {
  const prettier = createRequire(join(project, 'package.json'))('prettier');
  const format = await prettier.resolveConfig(join(project, 'README.md'));
  const modules = projectModules(project),
    files = new Map();
  files.set('docs/source-map.md', sourceMap(modules));
  const groups = Map.groupBy(
    modules.filter((module) => module.area === 'src'),
    (module) => module.folder,
  );
  for (const [folder, items] of groups)
    files.set(folder + '/README.md', folderGuide(folder, items, purposeOf(folder)));
  for (const [name, content] of files) {
    const formatted = await prettier.format(content, {
      ...format,
      parser: 'markdown',
      printWidth: 95,
      proseWrap: 'preserve',
    });
    await persist(join(project, name), formatted, check);
  }
  console.info(
    `Documentación ${check ? 'verificada' : 'generada'}: ${modules.length} archivos propios, ${groups.size} carpetas de producción.`,
  );
}

/** Compara salida estable o guarda solo documentos; nunca recibe archivos privados como entrada.
 * @param {string} path Archivo Markdown generado.
 * @param {string} expected Texto normalizado con Prettier.
 * @param {boolean} check Activa comparación sin mutar.
 * @returns {Promise<void>} Rechaza diferencias para que CI no acepte índices obsoletos.
 */
async function persist(path, expected, check) {
  if (!check) return writeFile(path, expected);
  const actual = await readFile(path, 'utf8').catch(() => '');
  if (actual.replaceAll('\r\n', '\n') !== expected)
    throw new Error(`Documentación desactualizada: ${path}. Ejecutá npm run docs desde main.`);
}
