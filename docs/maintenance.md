# Mantener y verificar el proyecto

## Elegir el lugar del cambio

| Cambio                          | Archivos/capa que corresponden                                  | Verificación relevante                                                     |
| ------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Color, espacio o variante común | Tokens y estilos de `frontend/src/theme`, componentes atómicos. | Tipos, lint, exportación web y revisión visual.                            |
| Pantalla o formulario           | Screen y su hook; validación/payload en utils o esquema.        | Campos, ocupado/error, navegación y rol correspondiente.                   |
| Lectura de datos o reintento    | `useQuery`, `useRemoteData`, servicios HTTP y DTOs.             | Filtros, respuestas fuera de orden, revalidación silenciosa y desconexión. |
| Permiso o regla de negocio      | Middleware, schema, service y presentador del backend.          | Permiso por actor y recurso; errores y solicitudes directas sin UI.        |
| SQL o persistencia              | Repositorio del dominio; una misma conexión en la transacción.  | Filas afectadas, rollback/idempotencia y concurrencia cuando aplique.      |
| Columna/tabla                   | Migración nueva y repositorio/tipos/contrato HTTP.              | Base QA migrada, restricciones y compatibilidad de datos anteriores.       |
| Ruta HTTP                       | Controller/routes/schema y OpenAPI/Postman.                     | Estado HTTP, validación, permisos, forma pública y errores.                |
| Publicación/arranque            | Scripts raíz, `render.yaml` y configuración real de Render.     | Cada root directory, URL API pública, readiness y rutas profundas web.     |

Extraer una función cuando una responsabilidad puede nombrarse, probarse o reutilizarse por separado. Evitar archivos que mezclen UI, red y SQL. No crear capas vacías únicamente para cumplir un número de líneas. Una consulta SQL es responsabilidad del repositorio; el servicio conserva la decisión y los bloqueos.

## Documentación junto al código

Las funciones públicas describen intención, cada parámetro y resultado. Las unidades, propiedad, precondiciones, efectos, reintentos e invariantes se explican cuando cambian cómo se debe usar la función. `@throws` se reserva para rechazos que importan al llamador; el tipo de una promesa no sustituye una explicación del resultado. Tipos/interfaces describen DTOs y campos que puedan resultar ambiguos. Las funciones privadas con nombre conservan una explicación; los callbacks pequeños no necesitan parafrasear cada instrucción.

Después de cambiar un contrato ejecutar `npm run docs` desde `main`. Los mapas y README generados se calculan desde AST; el catálogo de componentes consulta sus props reales, incluidas las obligatorias/opcionales. `npm run docs:check` compara sin escribir y se ejecuta en CI. Las guías de reglas/arquitectura se actualizan manualmente cuando cambia un recorrido.

## Comandos desde main

```powershell
npm run install:all
npm run docs
npm run check
npm run format:check
npm run build
```

`check` comprueba las herramientas comunes, documentación generada y cada aplicación. En backend incluye tipos, lint, pruebas unitarias, compilación y auditoría. En frontend incluye tipos, lint, pruebas y auditoría. `build` compila API y exporta web; `export:android` genera el bundle Android, no instala ni crea un APK firmado.

La auditoría inspecciona producción TypeScript y contratos públicos de soporte SQL: límite de 149 líneas por archivo de `src`, 30 por cuerpo de función de `src`, explicación de funciones con nombre, documentación de cada parámetro público/retorno, dependencias sin ciclos y fronteras entre capas. Incluye imports de tipos y reexportaciones resueltas; los imports dinámicos solo pueden resolverse estáticamente cuando el destino es literal. Los tamaños son una señal auxiliar, no una demostración de diseño correcto.

## Pruebas y aislamiento

Las pruebas unitarias no requieren tocar la base publicada. Verifican formatos, intervalos, estados, errores, proyecciones, recuperación, filtros, revalidación e invariantes pequeñas. Las herramientas comunes tienen pruebas que comprueban que el auditor encuentra contratos incompletos, ciclos, acceso a red/SQL en capas incorrectas y que el generador no ejecuta módulos al documentarlos.

La aceptación usa la app real con Supertest y repositorios MariaDB reales. `tests/support/context.ts` exige `NODE_ENV=test`; antes de ejecutarla hay que configurar además una base QA desechable con sus propias credenciales, migrar y sembrar. `NODE_ENV=test` por sí solo no convierte una base productiva en una base segura. Los tests pueden crear cuentas/turnos, registrar pagos ficticios y modificar ajustes de esa base.

| Suite backend                                  | Qué verifica                                                                                       |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `security`, `oauth`, `oauth-link`, `recovery`  | Identidad, sesión, permisos, PKCE, vinculación y tokens/cola de recuperación.                      |
| `booking`, `team-agenda`, `agenda`             | Cupos, inicio único, ocupación, agenda compartida y fechas.                                        |
| `vehicle-later`, `operations`, `cancellation`  | Vehículo después de reservar, datos persistidos, partes, mensajes y cancelación con motivo.        |
| `management`, `admin-panel`, `client-employee` | Catálogos, alcance de vehículos, administración, asistencia, limpieza del Inicio y cierre cobrado. |
| `database.integration`                         | Restricciones de persistencia que deben sobrevivir solicitudes directas.                           |
| `business-hours`, `admin-updates`              | Jornada hasta 21:30, tarifas compartidas, responsable idempotente y pendientes desde hoy.          |

Dentro de `backend`, `npm run test:acceptance` ejecuta las suites secuencialmente. No ejecutarlas mientras otra suite modifica la misma base QA. Al cambiar un flujo concreto, empezar por su suite; ampliar si cambia una regla compartida o queda una duda sin resolver.

El [manual de usuario](../MANUAL-DE-USUARIO.md) se mantiene en la raíz como única referencia operativa. Al cambiar un botón, permiso o recorrido, actualizar esa sección y el comentario del módulo responsable; no agregar otra explicación contradictoria al final de manuales anteriores. Las guías técnicas explican invariantes, los índices generados permiten encontrar el archivo y el manual enseña a usar la pantalla.

## Publicación y diagnóstico

Render conserva dos servicios desde el mismo repositorio: raíz `backend` para la API y `frontend` para la web. Cada uno conserva sus variables privadas y sus comandos relativos. La API migra al arrancar y ofrece `/ready`; la web publica `web-dist` y reescribe rutas a `index.html`.

Comprobar la revisión desplegada, readiness de MariaDB, ingreso por el origen público y carga de una ruta profunda. Una consulta de disponibilidad correcta no garantiza que la confirmación posterior conserve el horario: manejar el 409 y volver a consultar. Un sondeo fallido conserva datos anteriores del mismo filtro y su error; no inventar listas vacías ni cerrar sesión por una caída de red.

Antes de compartir fuente, excluir `.env`, claves, certificados, bases exportadas, dependencias y compilaciones. Los ZIP deben salir del árbol de código versionado. No copiar el contenido de Environment de Render a una captura, comentario o documento.
