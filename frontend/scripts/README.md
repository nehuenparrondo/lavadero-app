# Scripts de documentación y revisión

`audit-source.mjs` y `document-source.mjs` son puntos de entrada a las herramientas comunes de `main/scripts`. No mantienen una segunda copia de las reglas ni del generador.

- `npm run audit:source` comprueba tamaño de producción, contratos de cada parámetro/retorno, ciclos y fronteras entre capas. Backend incluye también contratos de `database`.
- `npm run docs:source` genera el mapa de todos los archivos propios y README por carpeta de producción; `-- --check` compara sin escribir.
- Desde `main`, `npm run docs` actualiza ambas aplicaciones y el catálogo de componentes. `npm run check` comprueba documentación y código.

El frontend tiene además `document-components.mjs` para props y ejemplos, y `secure-web.mjs` para la exportación segura. Backend mantiene `exportSchemas.ts` para esquemas de solicitudes. Ver [herramientas comunes](../../scripts/README.md) y [mantenimiento](../../docs/maintenance.md).
