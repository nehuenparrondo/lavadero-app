# Herramientas comunes

Estas herramientas ejecutan las aplicaciones o analizan archivos; no forman parte del bundle del usuario ni contienen credenciales. Cada función pública documenta entradas y resultado junto al código.

| Archivo/carpeta                                           | Responsabilidad                                                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `dev.mjs`                                                 | Comprueba configuración/puertos, inicia API y Expo web y detiene los procesos que creó.      |
| `development-env.mjs`                                     | Entorno explícito de desarrollo: base `_dev`, CORS loopback y Google deshabilitado.          |
| `ports.mjs`                                               | Puertos válidos y libres; nunca termina un servicio ajeno.                                   |
| `process.mjs`                                             | Invocación de npm sin interpolación de shell, código de salida y cierre de procesos propios. |
| `run.mjs`                                                 | Orquesta instalación, comprobación, compilación, migración y documentación en orden.         |
| `lib/source-files.mjs`                                    | Enumeración de archivos propios, compilador por proyecto y lectura estática de AST.          |
| `quality/audit-source.mjs`                                | Coordina métricas, contratos, dependencias y fronteras de aplicación.                        |
| `quality/contracts.mjs`                                   | Explicación de funciones, cada parámetro público, retorno y tamaño del cuerpo.               |
| `quality/dependencies.mjs`                                | Imports/reexportaciones y detección de ciclos, incluidos tipos.                              |
| `quality/architecture.mjs`                                | Controllers pasan por servicios, SQL queda en repositorios y HTTP fuera de la UI.            |
| `docs/source-model.mjs`                                   | Inventario y exportaciones a partir de AST, sin ejecutar módulos.                            |
| `docs/render-source.mjs`                                  | Formato de mapas/README y escape de tablas.                                                  |
| `docs/purposes.mjs`                                       | Fronteras de las capas que acompañan cada índice.                                            |
| `docs/document-source.mjs`                                | Formatea, guarda o compara los documentos generados.                                         |
| `tests/quality.test.mjs` y `tests/documentation.test.mjs` | Casos positivos/negativos del auditor y del extractor de contratos.                          |

Los puntos de entrada dentro de `backend/scripts` y `frontend/scripts` llaman estas herramientas con su directorio actual. Así existe una definición común de las reglas. Las dependencias TypeScript/Prettier se resuelven desde cada aplicación ya instalada; no hay una tercera copia en la raíz.

`npm run docs:check` no escribe documentos ni consulta bases. `npm run test:tooling` usa fixtures sintéticos en memoria. Los únicos comandos que escriben en MariaDB son los comandos explícitos del backend, con el entorno y permisos configurados por el operador.
