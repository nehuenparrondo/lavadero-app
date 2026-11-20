# Agenda, limpieza del inicio y finalización cobrada

## Próximos e historial del cliente

`GET /api/v1/appointments?history=false` devuelve únicamente visitas propias confirmadas, en proceso o esperando revisión, cuyo día local es hoy o posterior. La comparación se hace contra la medianoche de la zona configurada del negocio, convertida a UTC. No se usa el reloj del teléfono para decidir la inclusión.

`history=true` conserva los finalizados/cancelados y también los turnos de días anteriores que quedaron sin terminar. De esta forma los pendientes viejos siguen disponibles para consultar sin aparecer en Próximos. Administración mantiene la agenda completa y sus filtros.

El Inicio agrega `home=true`: excluye únicamente tarjetas que el titular decidió ocultar. `POST /api/v1/appointments/home-clear`, exclusivo del cliente autenticado, marca `turnos.home_hidden_at` en sus visitas actuales. No acepta un titular elegido por el cuerpo. No elimina registros, no cancela horarios, no libera capacidad y no modifica pagos ni notas. Mis turnos conserva esas visitas. Las reservas nuevas comienzan con el campo nulo y vuelven a aparecer en Inicio. La operación comparte el bloqueo de agenda con las reservas y es idempotente si no hay nuevos turnos.

## Jornada del empleado

`scope=today` usa la fecha oficial argentina del servidor y muestra pendientes, confirmados y trabajos en proceso de ese día, ordenados por inicio. El parámetro `date` no permite ampliar esta jornada. La interfaz de Mi agenda muestra solo Hoy; no incorpora búsqueda ni filtros de otras fechas.

Mi historial usa `scope=all`: conserva búsqueda por patente y selección de cualquier fecha, con todos los estados. Puede consultar tanto trabajos cerrados como turnos de otras fechas aún pendientes. Los empleados comparten la consulta del equipo; solo el responsable puede trabajar o finalizar un lavado asignado.

## Finalizar después de cobrar

La decisión del titular del proyecto es **finalización directa por el empleado después del cobro completo, sin revisión administrativa**. El endpoint nuevo `POST /api/v1/appointments/:id/finish` exige empleado activo, permiso de cobros vigente, responsabilidad sobre el turno, estado en proceso o esperando revisión, saldo completamente cobrado y horario laboral actual. Requiere una descripción real de hasta 2000 caracteres.

Se bloquean configuración y turno, se recalcula el saldo desde los pagos guardados y se registra un parte nuevo. `partes_lavado.completed_by_employee=true` identifica el origen del cierre; no se inventan un administrador revisor, una fecha de inspección ni una decisión aprobada. La descripción, el nombre histórico del responsable y `submitted_at` guardan qué se hizo, quién y cuándo. Turno y parte se confirman en una misma transacción. Un reintento idéntico devuelve Finalizado sin crear otro parte ni otra transición.

Al finalizar, desaparece de Hoy y permanece en Mi historial. El cliente obtiene su parte y comprobante, y puede enviar una devolución que llega al administrador asociada al empleado y al trabajo. Los endpoints anteriores de revisión se conservan para partes previos o empleados que no registran cobros; el cierre nuevo no depende de ellos.

## Reclamos y visibilidad administrativa

Un reclamo se guarda en `mensajes_cliente`, con el titular autenticado, cuerpo y fecha. Administración consulta la misma tabla en Pendientes y puede responder; cada cliente ve únicamente sus mensajes. Las respuestas de consulta declaran `Cache-Control: no-store`. El resumen administrativo incluye la cantidad de reclamos/devoluciones abiertos y un acceso directo, con actualización automática. La bandeja también se actualiza mientras está visible.

## Archivos y verificación

La migración **017_client_home_and_employee_finish.sql** agrega los dos campos sin eliminar filas. Se mantienen 25 tablas españolas y 35 relaciones. `agendaScope.repository.ts` contiene la selección de jornadas, `homeClear.service.ts` la limpieza privada y `paidFinish.service.ts` las reglas y transacción del cierre.

`tests/client-employee.integration.ts` comprueba contra MariaDB real: próximos/pasados, aislamiento entre titulares, persistencia de la limpieza, reservas posteriores a la limpieza, jornada oficial, historial completo, responsabilidad, pagos parciales, cierre fuera de horario, domingo, reintentos concurrentes, recibo, devolución y reclamo/respuesta. Las pruebas usan bases de desarrollo/QA; la comprobación publicada consulta datos sin crear reservas ni reclamos reales.
