# Guía del código de Lavadero

Esta es la entrada actual a la documentación del repositorio único. El código propio está en `backend`, `frontend` y `scripts`. Cada aplicación conserva sus dependencias; no importa archivos de la otra.

## Orden de lectura

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
| [MariaDB y gestor SQL](../backend/docs/mariadb.md)                  | Ubicación de las bases, separación de accesos y DBeaver.                                       |
| [Contrato HTTP](../backend/docs/openapi.json)                       | Métodos, rutas, cuerpos, respuestas y errores de la API.                                       |
| [Seguridad y recuperación](../backend/docs/security-recovery.md)    | Autenticación, protección de entradas y Mailtrap Sandbox.                                      |
| [Funcionamiento para usuarios](../backend/docs/functional-guide.md) | Acceso, reservas, operación, cobros, reclamos y asistencia.                                    |

Cada carpeta de `src` tiene un README navegable. Las funciones públicas explican parámetros y resultado junto a su implementación; los comentarios de invariantes describen por qué se bloquea, valida, conserva o descarta un dato. Los tipos detallan la forma de las entradas/salidas. Los callbacks simples conservan nombres claros sin repetir cada línea en un comentario.

El [resultado de la revisión](review.md) detalla el alcance, las separaciones realizadas y las pruebas aprobadas.

## Qué se genera y qué se escribe a mano

Los mapas, los índices de carpetas de `src` y el catálogo de componentes se regeneran con `npm run docs` desde `main`. `npm run docs:check` compara el resultado sin escribir y falla si quedó desactualizado. No ejecutan módulos de la app ni leen `.env`.

Esta guía, las decisiones de arquitectura, las reglas del negocio y las explicaciones de migraciones se mantienen a mano. Los mapas enlazan esas explicaciones con las firmas reales. Las capturas y documentos de entregas anteriores conservan su valor histórico; para la estructura y reglas actuales comenzar por esta guía.

La documentación abarca el código propio. Las dependencias instaladas, los archivos compilados y los secretos no se documentan copiando su contenido ni se incluyen en los ZIP de fuente.
