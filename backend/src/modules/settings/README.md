# src/modules/settings

<!-- Generado por npm run docs. -->

Configuración operativa compartida. Los cambios se serializan con reservas y no reprograman turnos existentes.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                             |
| ------------------------------------------------ | ----------------------------------------------------------- |
| [settings.controller.ts](settings.controller.ts) | Consulta configuración del negocio.                         |
| [settings.repository.ts](settings.repository.ts) | Configuración interna de una sucursal.                      |
| [settings.routes.ts](settings.routes.ts)         | Todos pueden conocer horarios; solo admin puede editarlos.  |
| [settings.schema.ts](settings.schema.ts)         | Configuración tipada de agenda de una única sucursal.       |
| [settings.service.ts](settings.service.ts)       | Lee configuración pública de operación, sin datos privados. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
