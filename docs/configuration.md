# Configuración, datos y archivos de soporte

## Archivos y entornos

| Archivo                                                    | Función                                                                          | Quién lo utiliza                             |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| `package.json` raíz                                        | Comandos coordinados; no mezcla dependencias de ambas aplicaciones.              | Desarrollo y mantenimiento.                  |
| `backend/package.json` y lock                              | Dependencias y comandos de Express, base y pruebas.                              | Backend local, CI y Render.                  |
| `frontend/package.json` y lock                             | Dependencias Expo/React Native, compilación y comprobaciones.                    | Frontend, Expo, CI y Render.                 |
| `backend/.env.example`                                     | Variables del servidor y sus valores de ejemplo.                                 | Plantilla para `.env` privado.               |
| `frontend/.env.example`                                    | Únicamente datos públicos que se incorporan al bundle.                           | Plantilla para desarrollo/Expo.              |
| `render.yaml` raíz                                         | Servicios con raíces `backend` y `frontend`, comandos, variables y encabezados.  | Referencia conjunta para Render.             |
| `.github/workflows/ci.yml`                                 | Verificaciones independientes de las dos carpetas y de sus documentos generados. | GitHub Actions.                              |
| `.gitignore`                                               | Excluye entornos privados, certificados, dependencias y compilaciones.           | Git y entrega de fuente.                     |
| `tsconfig*`, `eslint.config*`, `.prettierrc*`              | Tipos estrictos, reglas y formato.                                               | Comandos de comprobación de cada aplicación. |
| `frontend/app.config.ts`, `frontend/eas.json`              | Identidad/plataformas Expo y perfiles de compilación que existan en la fuente.   | Expo y EAS.                                  |
| `frontend/security-headers.json`, `scripts/secure-web.mjs` | CSP, encabezados y preparación segura del HTML exportado.                        | Exportación web y hosting.                   |

Los archivos `render.yaml` dentro de cada aplicación describen su servicio; al cambiar publicación, mantenerlos alineados con la definición conjunta de la raíz y la configuración efectiva del panel. Un YAML de referencia no modifica por sí solo un servicio existente.

## Variables del backend

Los valores privados se completan en `backend/.env` local o en Environment de Render. No se envían al frontend ni se copian a ejemplos, documentación, logs o ZIP. La validación está en `backend/src/config/env.ts`, conexión en `database.ts` y disponibilidad OAuth en `oauth.ts`.

| Grupo            | Variables                                                                                                                                                          | Uso y precaución                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Proceso          | `NODE_ENV`, `PORT`, `MAINTENANCE_MODE`                                                                                                                             | Modo, puerto y pausa de operaciones durante una migración coordinada; readiness permanece consultable.                           |
| Base             | `DATABASE_URL`, `DATABASE_TLS`, `DATABASE_CA_BASE64`, `DATABASE_POOL_SIZE`                                                                                         | URL privada con contraseña codificada, cifrado/certificado e identidad verificados, CA privada opcional y límite de conexiones.  |
| Sesión           | `JWT_ACCESS_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE`                                                                                                                  | Secreto privado de firma y emisor/audiencia exigidos al verificar access JWT.                                                    |
| Orígenes         | `CORS_ORIGINS`, `PUBLIC_API_URL`, `OAUTH_REDIRECT_URIS`                                                                                                            | Lista de orígenes y retornos exactos; no usar comodines. La app nativa no utiliza CORS como mecanismo de permisos.               |
| Accesos sociales | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`                               | Credencial web del backend y su retorno autorizado; el secreto no llega a Expo.                                                  |
| Recuperación     | `MAILTRAP_API_TOKEN`, `MAILTRAP_INBOX_ID`, `PASSWORD_RESET_URL`                                                                                                    | Captura de correo en Sandbox y destino público de recuperación. No entrega a casillas reales.                                    |
| Semilla          | `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`                                                                                                                          | Alta inicial controlada; repetir semillas conserva la contraseña de una cuenta existente.                                        |
| Negocio inicial  | `BUSINESS_CURRENCY`, `BUSINESS_TIME_ZONE`, `BUSINESS_OPEN_TIME`, `BUSINESS_CLOSE_TIME`, `BUSINESS_OPEN_DAYS`, `BUSINESS_CAPACITY`, `BUSINESS_CANCELLATION_MINUTES` | Valores validados para una instalación nueva; la operación vigente se lee de las tablas de configuración y se edita en el panel. |

El frontend solo conoce `EXPO_PUBLIC_API_URL` y `EXPO_PUBLIC_EAS_PROJECT_ID`. Toda variable `EXPO_PUBLIC_*` puede quedar visible en el código distribuido. En producción la URL API exige HTTPS; el arranque común permite HTTP únicamente para loopback en desarrollo explícito.

La jornada vigente es de **09:30 a 21:30** en Argentina, con los mismos días de apertura. Las reglas y el cambio de datos de la migración 019 se explican en [horario de atención y límites](../backend/docs/business-hours.md). La disponibilidad y las operaciones laborales usan las filas de `horarios_atencion`, también cuando se accede desde una APK.

`scripts/dev.mjs` admite `LAVADERO_API_PORT` y `LAVADERO_WEB_PORT` para elegir otros puertos libres. El código comprueba que sean distintos y válidos; no mata otros servicios que ya estén usando un puerto.

## MariaDB y unidades

La aplicación publicada usa `nehuenlavadero_prod` en alwaysdata; el desarrollo escolar usa `nehuenlavadero_dev`, con credenciales distintas. Las pruebas de aceptación se ejecutan en una base QA desechable, nunca en producción. El protocolo de conexión es `mysql://` porque se utiliza el driver compatible `mysql2` contra MariaDB. Cambiar el nombre del driver no migra datos ni cambia el motor.

Las tablas tienen nombres españoles y las columnas/códigos conservan su contrato estable. IDs BIGINT viajan como strings; importes como centavos enteros ARS; instantes como UTC y fechas de agenda como calendario local del negocio. Un paso de cinco minutos indica posibles inicios y no la duración del servicio.

| Grupo de tablas                                                     | Responsabilidad                                                                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `roles`, `usuarios`, `cuentas_sociales`                             | Identidades, permisos actuales y vinculación social.                                           |
| `sesiones_renovacion`, `estados_oauth`, `autorizaciones_oauth`      | Hashes, rotación, state, PKCE y códigos de un uso.                                             |
| `limites_recuperacion`, `recuperaciones_clave`                      | Límites por hash de correo y cola/token de recuperación con estados, reintentos y vencimiento. |
| `tipos_vehiculo`, `vehiculos`, `servicios`, `tarifas_servicio`      | Garaje y catálogo vigente por categoría.                                                       |
| `turnos`, `estados_turno`, `servicios_turno`                        | Agenda y contrato histórico de servicios/precios/duración.                                     |
| `notas_turno`, `historial_estados_turno`, `detalles_vehiculo_turno` | Observaciones, cambios y descripción para una visita.                                          |
| `ingresos_sin_turno`, `partes_lavado`                               | Datos presenciales y trabajo declarado con responsable.                                        |
| `mensajes_cliente`, `asistencia_empleados`, `pagos`                 | Reclamos/devoluciones, llegada observada y cobros declarados.                                  |
| `configuracion_negocio`, `horarios_atencion`, `bloqueos_agenda`     | Parámetros de operación; el lock activo es la fila de configuración, no `bloqueos_agenda`.     |
| `migraciones_esquema`                                               | Nombres/checksums de las versiones SQL aplicadas.                                              |

El [modelo detallado](../backend/docs/database.md), [SQL agregado](../backend/database/schema.sql) y [migraciones](../backend/database/migrations/README.md) son referencias de estructura. Las contraseñas SQL se consultan/configuran por el canal privado del entorno y no forman parte de esta guía.

## Migraciones y semillas

El migrador obtiene un lock de sesión por base, valida checksums y aplica SQL en orden. Adapta diferencias históricas de sintaxis a MariaDB sin reescribir archivos ya aplicados. DDL puede hacer commit implícito: un fallo parcial no se resuelve prometiendo rollback de todo el esquema. Se debe revisar el último archivo/statement aplicado antes de continuar.

Las semillas cargan catálogos y configuración ausentes de una instalación nueva; no son una herramienta para restaurar producción. El cierre del comando libera conexión/pool aunque una tarea falle. `schema.sql` es una referencia agregada/instalación alternativa y no registra el historial del migrador; no combinar ambos procedimientos en una misma instalación.

La migración 013 conserva el paso de nombres ingleses a españoles y la 018 incorpora recuperación. No editar migraciones históricas para documentarlas: agregar explicaciones en los README y una migración nueva si cambia el esquema.

La migración 020 iguala interior/exterior de Auto ($15.000), Camioneta ($20.000) y Utilitario ($17.000 ARS) en el catálogo común. No cambia los contratos históricos. El esquema sigue teniendo 27 tablas; la instalación completa aplica 20 migraciones. [Detalle técnico](../backend/docs/catalog-assignment-queue.md).
