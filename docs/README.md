# Guía del código de Lavadero

Esta es la entrada actual a la documentación del repositorio único. El código propio está en `backend`, `frontend` y `scripts`. Cada aplicación conserva sus dependencias; no importa archivos de la otra.

## Orden de lectura

Para operar el lavadero, ir directamente al [manual de usuario de la raíz](../MANUAL-DE-USUARIO.md). Es la única guía operativa vigente; los manuales anteriores enlazan allí para evitar instrucciones contradictorias.

1. [Arrancar el proyecto](../README.md): instalación, desarrollo local y publicación.
2. [Arquitectura y recorridos](architecture.md): desde una acción en pantalla hasta MariaDB.
3. [Configuración y datos](configuration.md): variables, unidades, secretos y migraciones.
4. [Mantenimiento y pruebas](maintenance.md): dónde cambiar cada cosa y qué verificar.

## Referencias completas

| Referencia                                                          | Contenido                                                                                      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Mapa backend](../backend/docs/source-map.md)                       | Cada archivo propio: servidor, migrador, scripts y pruebas; exportaciones, firmas y contratos. |
| [Mapa frontend](../frontend/docs/source-map.md)                     | Rutas, pantallas, componentes, hooks, transporte, utilidades y pruebas.                        |
| [Catálogo de componentes](../frontend/docs/components.md)           | Props obligatorias/opcionales, tipos y ejemplos de composición.                                |
| [Modelo de datos](../backend/docs/database.md)                      | Relaciones, normalización, claves, unidades e historial.                                       |
| [Gestores web de datos](../tools/database-admin/USO.md)             | Producción y escuela, acceso de consulta y separación de bases.                                |
| [MariaDB](../backend/docs/mariadb.md)                               | Ubicación de las bases, tablas y evolución del alojamiento.                                    |
| [Contrato HTTP](../backend/docs/openapi.json)                       | Métodos, rutas, cuerpos, respuestas y errores de la API.                                       |
| [Seguridad y recuperación](../backend/docs/security-recovery.md)    | Autenticación, protección de entradas y Mailtrap Sandbox.                                      |
| [Funcionamiento para usuarios](../backend/docs/functional-guide.md) | Acceso, reservas, operación, cobros, reclamos y asistencia.                                    |

Cada carpeta de `src` tiene un README navegable. Las funciones públicas explican parámetros y resultado junto a su implementación; los comentarios de invariantes describen por qué se bloquea, valida, conserva o descarta un dato. Los tipos detallan la forma de las entradas/salidas. Los callbacks simples conservan nombres claros sin repetir cada línea en un comentario.

El [resultado de la revisión](review.md) detalla el alcance, las separaciones realizadas y las pruebas aprobadas.

## Qué se genera y qué se escribe a mano

Los mapas, los índices de carpetas de `src` y el catálogo de componentes se regeneran con `npm run docs` desde `main`. `npm run docs:check` compara el resultado sin escribir y falla si quedó desactualizado. No ejecutan módulos de la app ni leen `.env`.

Esta guía, las decisiones de arquitectura, las reglas del negocio y las explicaciones de migraciones se mantienen a mano. Los mapas enlazan esas explicaciones con las firmas reales. Las capturas y documentos de entregas anteriores conservan su valor histórico; para la estructura y reglas actuales comenzar por esta guía.

La documentación abarca el código propio. Las dependencias instaladas, los archivos compilados y los secretos no se documentan copiando su contenido ni se incluyen en los ZIP de fuente.

## Reglas vigentes que afectan al código

La jornada es de 09:30 a 21:30; el cliente guarda el horario antes de confirmar y completa el vehículo después. Administración consulta pendientes desde hoy, puede registrar autos sin garaje y guardar de nuevo al responsable actual. El empleado habilitado cierra directamente después del cobro total; las cuentas sin ese permiso conservan el envío a revisión. Las tarifas interior/exterior son Auto $15.000, Camioneta $20.000 y Utilitario $17.000 ARS; no reescriben los contratos anteriores.

Las reglas exactas y los archivos están en [arquitectura](architecture.md), [horarios](../backend/docs/business-hours.md) y [tarifas/responsables/pendientes](../backend/docs/catalog-assignment-queue.md). Para extender el código, usar estas referencias y el contrato HTTP, no las capturas históricas.
