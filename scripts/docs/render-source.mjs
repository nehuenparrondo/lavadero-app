/** Escapa celdas sin modificar ejemplos ni contratos en bloques de código.
 * @param {string} value Texto de una celda Markdown.
 * @returns {string} Texto con barras y saltos seguros para tablas.
 */
export function cell(value) {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

/** Produce un índice navegable de cada archivo y sus contratos, sin copiar cuerpos de funciones.
 * @param {object[]} modules Inventario calculado desde AST.
 * @returns {string} Documento reproducible para docs/source-map.md.
 */
export function sourceMap(modules) {
  const lines = [
    '# Mapa completo del código propio',
    '',
    '<!-- Generado por npm run docs. Cambiar los contratos junto al código y regenerar. -->',
    '',
    'Incluye producción, soporte de base, scripts y pruebas. Excluye dependencias, secretos y compilaciones. Las firmas y explicaciones se extraen de la fuente; no ejecuta módulos ni lee `.env`.',
    '',
    'Ver [guía del proyecto](../../docs/README.md) y [mantenimiento](../../docs/maintenance.md).',
    '',
  ];
  for (const module of modules) {
    lines.push(
      '## ' + module.path,
      '',
      module.summary,
      '',
      `[Abrir fuente](../${encodeURI(module.path)})`,
      '',
    );
    if (module.exports.length) {
      lines.push('| Exportación | Responsabilidad |', '| --- | --- |');
      for (const item of module.exports)
        lines.push(
          `| ${cell(item.name)} | ${cell(item.docs.split(/\n@/u)[0] || 'Contrato de tipos o reexportación; consultar la fuente enlazada.')} |`,
        );
      lines.push('');
    }
    for (const item of module.exports.filter((item) => item.signature)) {
      lines.push('### ' + item.name, '', '```ts', item.signature, '```', '');
      for (const line of item.docs.split('\n').filter((line) => line.startsWith('@')))
        lines.push('- ' + line);
      lines.push('');
    }
  }
  return lines.join('\n');
}

/** Mantiene los README por carpeta de producción, con enlaces a los contratos completos.
 * @param {string} folder Carpeta relativa src/... del proyecto.
 * @param {object[]} modules Archivos del directorio.
 * @param {string} purpose Responsabilidad y frontera de la capa.
 * @returns {string} README generado; no altera guías manuales de database/tests.
 */
export function folderGuide(folder, modules, purpose) {
  return [
    '# ' + folder,
    '',
    '<!-- Generado por npm run docs. -->',
    '',
    purpose,
    '',
    '## Archivos y responsabilidades',
    '',
    '| Archivo | Responsabilidad |',
    '| --- | --- |',
    ...modules.map(
      (module) => `| [${module.name}](${encodeURI(module.name)}) | ${cell(module.summary)} |`,
    ),
    '',
    '## Mantenimiento',
    '',
    'Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.',
    '',
  ].join('\n');
}
