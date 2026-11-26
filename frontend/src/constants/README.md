# src/constants

<!-- Generado por npm run docs. -->

Catálogos de solo lectura y definiciones declarativas. No contienen secretos ni estado mutable de sesión.

## Archivos y responsabilidades

| Archivo                                      | Responsabilidad                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [appointmentFields.ts](appointmentFields.ts) | Motivo obligatorio visible al cliente y conservado con la cancelación.                      |
| [authFields.ts](authFields.ts)               | Campos de acceso sin selector de rol.                                                       |
| [business.ts](business.ts)                   | Roles que puede emitir y validar el contrato del sistema.                                   |
| [iconPaths.ts](iconPaths.ts)                 | Trazos originales sobre una grilla de 24 unidades, compartidos por web y nativo.            |
| [paymentFields.ts](paymentFields.ts)         | Un cobro se registra en centavos en la API; el formulario recibe pesos argentinos.          |
| [profileFields.ts](profileFields.ts)         | Campos editables del perfil; el rol y el correo no se incluyen.                             |
| [recoveryFields.ts](recoveryFields.ts)       | Solicitud sin campos de rol, retorno ni información privada adicional.                      |
| [roleNavigation.ts](roleNavigation.ts)       | Un único catálogo alimenta el menú móvil y la barra lateral.                                |
| [rootRoutes.ts](rootRoutes.ts)               | Acceso necesario para cada pantalla; el backend valida además cada recurso.                 |
| [serviceFields.ts](serviceFields.ts)         | Campos reutilizados por alta y edición de servicios.                                        |
| [settingsFields.ts](settingsFields.ts)       | Configuración inicial de horarios, cancelación y capacidad.                                 |
| [socialProviders.ts](socialProviders.ts)     | Proveedores admitidos; su disponibilidad real depende de credenciales privadas del backend. |
| [timeWheel.ts](timeWheel.ts)                 | Alto fijo para alinear la selección central y el ajuste de cada plataforma.                 |
| [userFields.ts](userFields.ts)               | Roles y etiquetas compartidos por los filtros y el editor administrativo.                   |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
