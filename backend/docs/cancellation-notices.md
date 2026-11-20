# Cancelaciones y observaciones persistentes

Cuando Administración cancela un turno, debe escribir el motivo. El cambio de estado, el autor, el motivo y el historial se guardan en una misma transacción. Si falta el motivo o una validación falla, no queda una cancelación parcial. El cambio genérico de estado tampoco permite saltarse este requisito.

Inicio del cliente consulta sus avisos al entrar, al volver y cada 15 segundos mientras está visible. Una cancelación del equipo aparece antes del acceso a reservar, con fecha, vehículo y motivo completo. **Ver turno** abre el detalle sin descartar el aviso. **Entendido** confirma su lectura en MariaDB; no vuelve a aparecer al cerrar sesión o usar otro dispositivo. El motivo y las observaciones permanecen en el detalle del turno.

Una cancelación del propio cliente conserva su motivo, pero no genera un aviso como si fuera del lavadero. Las cancelaciones antiguas sin motivo muestran explícitamente que no se registró uno; no se inventan ni rellenan motivos históricos.

## Campos reales

| Pantalla / dato              | Tabla y columnas                                | Regla                                                                                         |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Motivo de cancelación        | `turnos.cancellation_reason`, `cancelled_by_id` | Texto obligatorio de 1 a 500 caracteres, autor desde la sesión.                               |
| Lectura en Inicio            | `turnos.cancellation_read_at`                   | Fecha UTC nullable; se conserva la primera confirmación y no se borra el aviso del historial. |
| Cambio de estado             | `historial_estados_turno`                       | Turno, estado, autor y fecha de la misma transacción.                                         |
| Observaciones del trabajo    | `notas_turno.body`, `author_id`, `created_at`   | Texto de 1 a 2000 caracteres, con autor y fecha. Cliente consulta; equipo/admin escribe.      |
| Descripción del vehículo     | `detalles_vehiculo_turno.description`           | Descripción del cliente vinculada al turno.                                                   |
| Parte del empleado           | `partes_lavado.description`                     | Trabajo declarado por el empleado responsable.                                                |
| Devolución del administrador | `partes_lavado.review_note`                     | Motivo de devolución a corrección y revisor.                                                  |
| Reclamos y respuestas        | `mensajes_cliente.body`, `reply`                | Mensaje del cliente y respuesta administrativa con sus autores.                               |

La migración **015_cancellation_notices.sql** agrega solo el campo de lectura y su índice. El motivo y las observaciones ya existían en la base. La migración es reintentable después de un corte y no elimina ni copia filas. El sistema conserva 25 tablas españolas.

## API y autorización

- `POST /api/v1/appointments/:id/cancel`: cliente propietario o administrador; exige `{ "reason": "..." }`.
- `GET /api/v1/appointments/cancellation-notices`: solo cliente; hasta diez avisos propios sin leer, más recientes primero, sin caché. No marca lectura automáticamente.
- `POST /api/v1/appointments/:id/cancellation-read`: solo titular; confirmación idempotente. Un aviso ajeno responde 404.
- `POST /api/v1/appointments/:id/notes`: empleado o administrador; exige `{ "body": "..." }` y rechaza un autor elegido desde el formulario.
- `GET /api/v1/appointments/:id`: detalle autorizado, con `cancellationReason`, `cancelledByName` y notas con fecha ISO UTC.

El estado de lectura pertenece al usuario titular de ese turno. No depende de cookies, `localStorage` ni de que permanezca abierta una pestaña. Las consultas no revelan avisos de otros clientes ni ofrecen una bandeja global al empleado.

## Archivos y verificación

`cancellation.repository.ts` consulta y confirma lectura con parámetros SQL; `cancellation.service.ts` valida y autoriza; `cancellation.routes.ts` monta las rutas antes de `/:id`. La cancelación principal sigue coordinada por `mutation.service.ts`.

En la app, `useCancellationNotices` coordina la API y `ClientCancellationNotices` presenta los avisos. `AppointmentCancellation` conserva el motivo en el detalle. Los formularios comparten `appointmentFields`; el texto largo valida espacios, limita longitud y muestra contador. El borrador de una observación solo se limpia después de guardar esa observación: una consulta automática o una nota de otro empleado no lo reemplazan.

`tests/cancellation.integration.ts` comprueba el texto exacto en MariaDB, autor, historial atómico, permisos, límites, persistencia al reingresar y lectura idempotente. La revisión de navegador cubre notificación automática entre cliente/admin, notas del empleado, conservación del borrador y presentación de escritorio, teléfono y tema oscuro. Se prueba en la base escolar/QA; no se cancelan reservas reales para generar capturas.

Ver [panel administrativo actualizado: ingreso presencial, cuentas, asistencia y semanas](admin-panel.md).
