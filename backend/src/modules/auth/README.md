# modules/auth

Acceso local/social, sesiones y PKCE. Persistir hashes de tokens y confirmar revocaciones/contadores antes de emitir errores.

## Archivos y responsabilidades

| Archivo                                                      | Responsabilidad                                                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [auth.controller.ts](auth.controller.ts)                     | Registra cuenta pública sin permisos elegibles.                                                 |
| [auth.routes.ts](auth.routes.ts)                             | Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes.         |
| [auth.schema.ts](auth.schema.ts)                             | Registro público estricto: rol y habilitación de cobros no son aceptados.                       |
| [auth.service.ts](auth.service.ts)                           | Registra siempre Cliente y no acepta privilegios del request.                                   |
| [auth.types.ts](auth.types.ts)                               | Devuelve solo el contrato de sesión; el ID interno de rotación no se publica.                   |
| [oauth.controller.ts](oauth.controller.ts)                   | Disponibilidad de botones sociales.                                                             |
| [oauth.exchange.service.ts](oauth.exchange.service.ts)       | Canjea un grant de un solo uso con PKCE y confirma la vinculación local cuando corresponde.     |
| [oauth.grants.repository.ts](oauth.grants.repository.ts)     | Candidato verificado por el proveedor; aún no vinculado a la cuenta local.                      |
| [oauth.identity.service.ts](oauth.identity.service.ts)       | Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular.    |
| [oauth.repository.ts](oauth.repository.ts)                   | Persiste estado opaco con vencimiento corto.                                                    |
| [oauth.return.ts](oauth.return.ts)                           | Retorna errores públicos únicamente al redirect de un estado ya validado y consumido.           |
| [oauth.routes.ts](oauth.routes.ts)                           | Inicio, retorno y canje de códigos sociales; todos limitados por origen.                        |
| [oauth.schema.ts](oauth.schema.ts)                           | Provider cerrado evita redirecciones y SSRF por URLs recibidas del cliente.                     |
| [oauth.service.ts](oauth.service.ts)                         | Metadatos públicos, solo habilitado/deshabilitado por proveedor.                                |
| [oauth.types.ts](oauth.types.ts)                             | Proveedores OAuth admitidos. URLs nunca se reciben del usuario.                                 |
| [pkce.ts](pkce.ts)                                           | Calcula el challenge S256 del verifier generado por el cliente.                                 |
| [provider.http.ts](provider.http.ts)                         | Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa.                     |
| [provider.profile.ts](provider.profile.ts)                   | Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor.               |
| [provider.service.ts](provider.service.ts)                   | Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible.      |
| [recovery.delivery.ts](recovery.delivery.ts)                 | Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen.                |
| [recovery.limiter.ts](recovery.limiter.ts)                   | Límite compartido entre solicitudes y consumo de tokens por dirección de red.                   |
| [recovery.mailtrap.ts](recovery.mailtrap.ts)                 | Envía exclusivamente a la bandeja Sandbox por HTTPS; no utiliza puertos SMTP.                   |
| [recovery.queue.repository.ts](recovery.queue.repository.ts) | Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.               |
| [recovery.repository.ts](recovery.repository.ts)             | Consulta un token por hash; el bloqueo se toma después del usuario para evitar deadlocks.       |
| [recovery.routes.ts](recovery.routes.ts)                     | Recuperación pública con límites por IP y correo y respuestas no almacenables.                  |
| [recovery.schema.ts](recovery.schema.ts)                     | El retorno lo fija el servidor, jamás se acepta una URL del solicitante.                        |
| [recovery.service.ts](recovery.service.ts)                   | Respuesta idéntica para correos conocidos, desconocidos o limitados; no hace lookup de cuentas. |
| [recovery.time.ts](recovery.time.ts)                         | MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor.     |
| [recovery.token.ts](recovery.token.ts)                       | Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base.                |
| [recovery.types.ts](recovery.types.ts)                       | Trabajo privado; nunca se serializa en una respuesta HTTP.                                      |
| [recovery.worker.ts](recovery.worker.ts)                     | Trabajador duradero: el cierre del proceso deja el trabajo disponible tras vencer el bloqueo.   |
| [session.repository.ts](session.repository.ts)               | Sesión interna bloqueada durante rotación.                                                      |
| [session.service.ts](session.service.ts)                     | Crea JWT propio y refresh opaco asociado. El caller garantiza cuenta activa.                    |
| [token.service.ts](token.service.ts)                         | Emite JWT de quince minutos con audiencia e issuer restringidos.                                |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
