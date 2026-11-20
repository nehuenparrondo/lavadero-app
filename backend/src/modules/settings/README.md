# modules/settings

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

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
