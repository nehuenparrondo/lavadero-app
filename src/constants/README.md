# constants

Catálogos de solo lectura y definiciones declarativas. No contienen secretos ni estado mutable de sesión.

## Archivos y responsabilidades

| Archivo                                      | Responsabilidad                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| [appointmentFields.ts](appointmentFields.ts) | Motivo obligatorio visible al cliente y conservado con la cancelación.             |
| [authFields.ts](authFields.ts)               | Campos de acceso sin selector de rol.                                              |
| [business.ts](business.ts)                   | Roles que puede emitir y validar el contrato del sistema.                          |
| [iconPaths.ts](iconPaths.ts)                 | Trazos originales sobre una grilla de 24 unidades, compartidos por web y nativo.   |
| [paymentFields.ts](paymentFields.ts)         | Un cobro se registra en centavos en la API; el formulario recibe pesos argentinos. |
| [profileFields.ts](profileFields.ts)         | Campos editables del perfil; el rol y el correo no se incluyen.                    |
| [roleNavigation.ts](roleNavigation.ts)       | Un único catálogo alimenta el menú móvil y la barra lateral.                       |
| [rootRoutes.ts](rootRoutes.ts)               | Acceso necesario para cada pantalla; el backend valida además cada recurso.        |
| [serviceFields.ts](serviceFields.ts)         | Campos reutilizados por alta y edición de servicios.                               |
| [settingsFields.ts](settingsFields.ts)       | Configuración inicial de horarios, cancelación y capacidad.                        |
| [timeWheel.ts](timeWheel.ts)                 | Alto fijo para alinear la selección central y el ajuste de cada plataforma.        |
| [userFields.ts](userFields.ts)               | Roles y etiquetas compartidos por los filtros y el editor administrativo.          |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
