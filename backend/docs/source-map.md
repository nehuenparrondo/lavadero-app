# Mapa del código fuente

Guía de navegación de todos los archivos TypeScript de producción. Los contratos detallados de parámetros, retorno e invariantes se conservan junto a las funciones; los flujos completos se explican en [code-guide.md](code-guide.md).

Este mapa no ejecuta módulos ni lee variables de entorno. Revisión: 01/11/2026.

## src/app.ts

Compone Express. No abre puertos ni conecta MySQL al importarse.

[Abrir fuente](../src/app.ts)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| createApp   | Compone Express. No abre puertos ni conecta MySQL al importarse. |

## src/config/authEnv.ts

Configuración privada de autenticación, validada sin imprimir valores sensibles.

[Abrir fuente](../src/config/authEnv.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| authEnv     | Configuración privada de autenticación, validada sin imprimir valores sensibles. |

## src/config/database.ts

Pool privado de infraestructura; los módulos acceden mediante repositories.

[Abrir fuente](../src/config/database.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| database    | Pool privado de infraestructura; los módulos acceden mediante repositories. |

## src/config/env.ts

Configuración de proceso validada una sola vez al iniciar.

[Abrir fuente](../src/config/env.ts)

| Exportación | Responsabilidad                                            |
| ----------- | ---------------------------------------------------------- |
| env         | Configuración de proceso validada una sola vez al iniciar. |

## src/config/envSchema.ts

Valida configuración antes de aceptar solicitudes; los secretos no se imprimen.

[Abrir fuente](../src/config/envSchema.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| envSchema   | Valida configuración antes de aceptar solicitudes; los secretos no se imprimen. |

## src/config/oauth.ts

Indica qué botones pueden iniciar OAuth sin revelar secretos.

[Abrir fuente](../src/config/oauth.ts)

| Exportación          | Responsabilidad                                               |
| -------------------- | ------------------------------------------------------------- |
| providerAvailability | Indica qué botones pueden iniciar OAuth sin revelar secretos. |
| getProvider          | Configuración de proveedor.                                   |

## src/config/readEnv.ts

Lee variables sin efectos secundarios.

[Abrir fuente](../src/config/readEnv.ts)

| Exportación | Responsabilidad                        |
| ----------- | -------------------------------------- |
| readEnv     | Lee variables sin efectos secundarios. |

## src/config/recovery.ts

Sandbox únicamente: las credenciales nunca se exponen al cliente.

[Abrir fuente](../src/config/recovery.ts)

| Exportación        | Responsabilidad                                                   |
| ------------------ | ----------------------------------------------------------------- |
| recoveryEnv        | Sandbox únicamente: las credenciales nunca se exponen al cliente. |
| recoveryConfigured | Indica si se puede capturar un correo de demostración.            |

## src/config/validation.ts

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/config/validation.ts)

## src/constants/business.ts

Roles que puede emitir y validar el contrato del sistema.

[Abrir fuente](../src/constants/business.ts)

| Exportación        | Responsabilidad                                                                      |
| ------------------ | ------------------------------------------------------------------------------------ |
| ROLES              | Roles que puede emitir y validar el contrato del sistema.                            |
| APPOINTMENT_STATUS | Estados persistidos del turno; los servicios controlan las transiciones autorizadas. |

## src/errors/AppError.ts

Error controlado con estado HTTP y código estable para la app.

[Abrir fuente](../src/errors/AppError.ts)

| Exportación | Responsabilidad                                                |
| ----------- | -------------------------------------------------------------- |
| AppError    | Error controlado con estado HTTP y código estable para la app. |

## src/errors/ConflictError.ts

Representa un error 409 controlado por el dominio.

[Abrir fuente](../src/errors/ConflictError.ts)

| Exportación   | Responsabilidad                                    |
| ------------- | -------------------------------------------------- |
| ConflictError | Representa un error 409 controlado por el dominio. |

## src/errors/ForbiddenError.ts

Representa un error 403 controlado por el dominio.

[Abrir fuente](../src/errors/ForbiddenError.ts)

| Exportación    | Responsabilidad                                    |
| -------------- | -------------------------------------------------- |
| ForbiddenError | Representa un error 403 controlado por el dominio. |

## src/errors/NotFoundError.ts

Representa un error 404 controlado por el dominio.

[Abrir fuente](../src/errors/NotFoundError.ts)

| Exportación   | Responsabilidad                                    |
| ------------- | -------------------------------------------------- |
| NotFoundError | Representa un error 404 controlado por el dominio. |

## src/errors/publicError.ts

Proyección pública de errores; nunca incluye SQL, tokens ni stack traces.

[Abrir fuente](../src/errors/publicError.ts)

| Exportación | Responsabilidad                                                           |
| ----------- | ------------------------------------------------------------------------- |
| publicError | Proyección pública de errores; nunca incluye SQL, tokens ni stack traces. |

## src/middlewares/authenticate.ts

Verifica JWT y permisos actuales; desactivar o cambiar rol invalida inmediatamente el access.

[Abrir fuente](../src/middlewares/authenticate.ts)

| Exportación  | Responsabilidad                                                                               |
| ------------ | --------------------------------------------------------------------------------------------- |
| authenticate | Verifica JWT y permisos actuales; desactivar o cambiar rol invalida inmediatamente el access. |

## src/middlewares/createCors.ts

Permite orígenes web exactos y apps nativas, que no envían cabecera Origin.

[Abrir fuente](../src/middlewares/createCors.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| createCors  | Permite orígenes web exactos y apps nativas, que no envían cabecera Origin. |

## src/middlewares/errorHandler.ts

Único punto de respuesta de errores; conserva el contrato uniforme de la API.

[Abrir fuente](../src/middlewares/errorHandler.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| errorHandler | Único punto de respuesta de errores; conserva el contrato uniforme de la API. |

## src/middlewares/maintenanceGuard.ts

Pausa la API durante la copia final; las sondas de salud quedan disponibles.

[Abrir fuente](../src/middlewares/maintenanceGuard.ts)

| Exportación            | Responsabilidad                                                              |
| ---------------------- | ---------------------------------------------------------------------------- |
| createMaintenanceGuard | Pausa la API durante la copia final; las sondas de salud quedan disponibles. |

## src/middlewares/requireOwnership.ts

Restringe acceso por propietario y oculta existencia de recursos ajenos.

[Abrir fuente](../src/middlewares/requireOwnership.ts)

| Exportación      | Responsabilidad                                                          |
| ---------------- | ------------------------------------------------------------------------ |
| requireOwnership | Restringe acceso por propietario y oculta existencia de recursos ajenos. |

## src/middlewares/requireRole.ts

Restringe una ruta a roles vigentes, después de authenticate.

[Abrir fuente](../src/middlewares/requireRole.ts)

| Exportación | Responsabilidad                                               |
| ----------- | ------------------------------------------------------------- |
| requireRole | Restringe una ruta a roles vigentes, después de authenticate. |

## src/middlewares/validate.ts

Valida y elimina campos no admitidos antes de llegar al controller.

[Abrir fuente](../src/middlewares/validate.ts)

| Exportación | Responsabilidad                                                     |
| ----------- | ------------------------------------------------------------------- |
| validate    | Valida y elimina campos no admitidos antes de llegar al controller. |

## src/modules/appointments/agendaScope.repository.ts

Define próximas visitas por día local y separa la jornada actual del historial.

[Abrir fuente](../src/modules/appointments/agendaScope.repository.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| agendaScope | Define próximas visitas por día local y separa la jornada actual del historial. |

## src/modules/appointments/appointments.access.ts

Oculta turnos de otros clientes; el equipo comparte la agenda operativa.

[Abrir fuente](../src/modules/appointments/appointments.access.ts)

| Exportación             | Responsabilidad                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------- |
| assertAppointmentAccess | Oculta turnos de otros clientes; el equipo comparte la agenda operativa.                |
| presentAppointment      | Proyecta el turno por actor sin serializar la fila interna completa.                    |
| canReassign             | Un turno en proceso puede recuperarse si el responsable anterior ya no está habilitado. |

## src/modules/appointments/appointments.controller.ts

Lista por rol y filtros.

[Abrir fuente](../src/modules/appointments/appointments.controller.ts)

| Exportación | Responsabilidad                        |
| ----------- | -------------------------------------- |
| list        | Lista por rol y filtros.               |
| get         | Detalle autorizado.                    |
| slots       | Cotización/horarios.                   |
| create      | Alta de turno.                         |
| status      | Cambio de estado por empleado o admin. |
| cancel      | Cancelación del cliente/admin.         |
| assign      | Asignación administrativa.             |
| note        | Observación de trabajo.                |
| receipt     | Comprobante histórico.                 |

## src/modules/appointments/appointments.filters.repository.ts

Construye únicamente predicados cerrados; los datos siempre viajan como parámetros.

[Abrir fuente](../src/modules/appointments/appointments.filters.repository.ts)

| Exportación       | Responsabilidad                                                                     |
| ----------------- | ----------------------------------------------------------------------------------- |
| appointmentFilter | Construye únicamente predicados cerrados; los datos siempre viajan como parámetros. |

## src/modules/appointments/appointments.repository.ts

Busca un turno sin revelar datos fuera del servicio autorizado.

[Abrir fuente](../src/modules/appointments/appointments.repository.ts)

| Exportación        | Responsabilidad                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| findAppointment    | Busca un turno sin revelar datos fuera del servicio autorizado.                                                  |
| listAppointments   | Lista mediante condiciones SQL construidas exclusivamente en el repositorio de filtros, nunca desde input libre. |
| quoteServices      | Obtiene precios activos para todos los servicios de una cotización.                                              |
| overlapping        | Intervalos que intersectan una ventana. Reservas canceladas no ocupan capacidad.                                 |
| insertAppointment  | Contrato tipado declarado en la fuente.                                                                          |
| insertItems        | Contrato tipado declarado en la fuente.                                                                          |
| recordCancellation | Contrato tipado declarado en la fuente.                                                                          |
| setEmployee        | Contrato tipado declarado en la fuente.                                                                          |
| setStatus          | Contrato tipado declarado en la fuente.                                                                          |
| readItems          | Lee servicios históricos.                                                                                        |

## src/modules/appointments/appointments.routes.ts

Turnos con controles adicionales de propiedad/asignación dentro de cada servicio.

[Abrir fuente](../src/modules/appointments/appointments.routes.ts)

| Exportación              | Responsabilidad                                                                   |
| ------------------------ | --------------------------------------------------------------------------------- |
| createAppointmentsRoutes | Turnos con controles adicionales de propiedad/asignación dentro de cada servicio. |
| createAvailabilityRoutes | Disponibilidad usa el mismo cálculo que la creación transaccional.                |

## src/modules/appointments/appointments.schema.ts

Valores únicos y acotados evitan consultas y totales ambiguos.

[Abrir fuente](../src/modules/appointments/appointments.schema.ts)

| Exportación            | Responsabilidad                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| serviceIdsSchema       | Valores únicos y acotados evitan consultas y totales ambiguos.        |
| appointmentSchema      | Alta de reserva: fechas ISO con offset, convertidas a UTC.            |
| appointmentQuerySchema | Búsqueda y filtros; servicio limita visibilidad según rol.            |
| availabilitySchema     | Selección de disponibilidad sin crear reservas.                       |
| statusSchema           | Estados admitidos; la transición se decide exclusivamente en service. |
| assignmentSchema       | Solo un administrador puede elegir empleado.                          |
| cancelSchema           | Cancelación con un motivo obligatorio que el titular puede consultar. |
| noteSchema             | Observación atribuida al actor, no a un autor elegido en el body.     |

## src/modules/appointments/appointments.service.ts

Lista turnos propios para clientes y agenda compartida para el equipo y admite filtros administrativos sin ampliar acceso.

[Abrir fuente](../src/modules/appointments/appointments.service.ts)

| Exportación      | Responsabilidad                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| listAppointments | Lista turnos propios para clientes y agenda compartida para el equipo y admite filtros administrativos sin ampliar acceso. |
| getAppointment   | Detalle autorizado con servicios/observaciones; empleado recibe solo datos operativos.                                     |
| addNote          | Registra observación por el equipo o administrador, con autor autenticado.                                                 |
| receipt          | Comprobante de trabajo finalizado, visible al dueño y admin. No equivale a una factura fiscal.                             |

## src/modules/appointments/appointments.types.ts

Flujo compartido por rutas y reglas del módulo.

[Abrir fuente](../src/modules/appointments/appointments.types.ts)

| Exportación        | Responsabilidad                                                        |
| ------------------ | ---------------------------------------------------------------------- |
| AppointmentStatus  | Flujo compartido por rutas y reglas del módulo.                        |
| Appointment        | Reserva proyectada según el contrato REST.                             |
| QuoteItem          | Renglón contratado y precio vigente para el tipo elegido.              |
| Interval           | Intervalo ocupado, con extremos UTC en milisegundos para cálculo puro. |
| BookingIntervalRow | Fila mínima usada para calcular ocupación sin cargar datos personales. |

## src/modules/appointments/appointments.write.repository.ts

Inserta turno pendiente. El llamador mantiene lock de agenda y snapshot de precios.

[Abrir fuente](../src/modules/appointments/appointments.write.repository.ts)

| Exportación        | Responsabilidad                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| insertAppointment  | Inserta turno pendiente. El llamador mantiene lock de agenda y snapshot de precios. |
| insertItems        | Guarda snapshot de cada servicio.                                                   |
| setStatus          | Cambia estado incrementando versión; las reglas viven en service.                   |
| setEmployee        | Asignación administrativa.                                                          |
| recordCancellation | Autor y motivo de cancelación.                                                      |

## src/modules/appointments/attachVehicle.service.ts

Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda.

[Abrir fuente](../src/modules/appointments/attachVehicle.service.ts)

| Exportación   | Responsabilidad                                                                       |
| ------------- | ------------------------------------------------------------------------------------- |
| attachVehicle | Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda. |

## src/modules/appointments/availability.reason.ts

Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado.

[Abrir fuente](../src/modules/appointments/availability.reason.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| unavailableReason | Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado. |

## src/modules/appointments/availability.service.ts

Genera opciones de inicio respetando duración completa, capacidad y vehículo.

[Abrir fuente](../src/modules/appointments/availability.service.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| availability | Genera opciones de inicio respetando duración completa, capacidad y vehículo. |

## src/modules/appointments/booking.service.ts

Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda.

[Abrir fuente](../src/modules/appointments/booking.service.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| createAppointment | Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda. |

## src/modules/appointments/bookingQuote.service.ts

Cotiza desde el tipo seleccionado o desde un vehículo ya registrado.

[Abrir fuente](../src/modules/appointments/bookingQuote.service.ts)

| Exportación | Responsabilidad                                                      |
| ----------- | -------------------------------------------------------------------- |
| quote       | Cotiza desde el tipo seleccionado o desde un vehículo ya registrado. |

## src/modules/appointments/bookingSlot.service.ts

Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.

[Abrir fuente](../src/modules/appointments/bookingSlot.service.ts)

| Exportación       | Responsabilidad                                                                       |
| ----------------- | ------------------------------------------------------------------------------------- |
| canBookSlot       | Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.        |
| assertBookingSlot | Revalida horario y ocupación dentro de la transacción que mantiene el lock de agenda. |

## src/modules/appointments/cancellation.repository.ts

Aviso propio pendiente de lectura; el motivo proviene del turno cancelado.

[Abrir fuente](../src/modules/appointments/cancellation.repository.ts)

| Exportación             | Responsabilidad                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| CancellationNotice      | Aviso propio pendiente de lectura; el motivo proviene del turno cancelado.                    |
| readCancellationNotices | Consulta los avisos propios sin duplicar motivos ni depender del almacenamiento del teléfono. |
| markCancellationRead    | Marca un aviso propio como leído; repetirlo conserva la primera confirmación.                 |

## src/modules/appointments/cancellation.routes.ts

Registra antes de /:id los avisos del cliente y su confirmación de lectura.

[Abrir fuente](../src/modules/appointments/cancellation.routes.ts)

| Exportación             | Responsabilidad                                                             |
| ----------------------- | --------------------------------------------------------------------------- |
| mountCancellationRoutes | Registra antes de /:id los avisos del cliente y su confirmación de lectura. |

## src/modules/appointments/cancellation.service.ts

Guarda el motivo validado dentro de la misma transacción del cambio de estado.

[Abrir fuente](../src/modules/appointments/cancellation.service.ts)

| Exportación             | Responsabilidad                                                                |
| ----------------------- | ------------------------------------------------------------------------------ |
| saveCancellation        | Guarda el motivo validado dentro de la misma transacción del cambio de estado. |
| cancellationNotices     | Proyecta los avisos del cliente con fechas UTC del contrato REST.              |
| acknowledgeCancellation | Confirma lectura sin permitir acceder a avisos de otro cliente.                |

## src/modules/appointments/clientEmployee.routes.ts

Monta limpieza visual privada y cierre cobrado con permisos distintos.

[Abrir fuente](../src/modules/appointments/clientEmployee.routes.ts)

| Exportación               | Responsabilidad                                                        |
| ------------------------- | ---------------------------------------------------------------------- |
| mountClientEmployeeRoutes | Monta limpieza visual privada y cierre cobrado con permisos distintos. |

## src/modules/appointments/homeClear.service.ts

Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros.

[Abrir fuente](../src/modules/appointments/homeClear.service.ts)

| Exportación     | Responsabilidad                                                                |
| --------------- | ------------------------------------------------------------------------------ |
| clearClientHome | Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros. |

## src/modules/appointments/intervals.ts

Convierte filas SQL UTC al formato único del cálculo de capacidad.

[Abrir fuente](../src/modules/appointments/intervals.ts)

| Exportación      | Responsabilidad                                                    |
| ---------------- | ------------------------------------------------------------------ |
| bookingIntervals | Convierte filas SQL UTC al formato único del cálculo de capacidad. |

## src/modules/appointments/mutation.service.ts

Cambia estado con permisos, horario de finalización, plazo de cancelación y bloqueo de agenda.

[Abrir fuente](../src/modules/appointments/mutation.service.ts)

| Exportación    | Responsabilidad                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------- |
| changeStatus   | Cambia estado con permisos, horario de finalización, plazo de cancelación y bloqueo de agenda. |
| assignEmployee | Asigna/reasigna sin cambiar estado; confirmar es una acción administrativa separada.           |

## src/modules/appointments/notes.repository.ts

Lee notas atribuidas a su autor, después de autorizar el turno en service.

[Abrir fuente](../src/modules/appointments/notes.repository.ts)

| Exportación | Responsabilidad                                                            |
| ----------- | -------------------------------------------------------------------------- |
| readNotes   | Lee notas atribuidas a su autor, después de autorizar el turno en service. |
| insertNote  | Persiste una observación; el autor proviene de la sesión autenticada.      |

## src/modules/appointments/paidFinish.service.ts

Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables.

[Abrir fuente](../src/modules/appointments/paidFinish.service.ts)

| Exportación    | Responsabilidad                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| finishPaidWash | Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables. |

## src/modules/appointments/responsibility.repository.ts

Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación.

[Abrir fuente](../src/modules/appointments/responsibility.repository.ts)

| Exportación             | Responsabilidad                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| assignAvailableEmployee | Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación. |

## src/modules/appointments/schedule.ts

Interpreta un DATETIME de MySQL como UTC sin depender de la zona del servidor.

[Abrir fuente](../src/modules/appointments/schedule.ts)

| Exportación          | Responsabilidad                                                                         |
| -------------------- | --------------------------------------------------------------------------------------- |
| utcMillis            | Interpreta un DATETIME de MySQL como UTC sin depender de la zona del servidor.          |
| sqlTime              | Formato SQL UTC para persistir y comparar intervalos.                                   |
| isoTime              | Fecha ISO pública con Z.                                                                |
| businessWindow       | Calcula ventana local de atención de una fecha. Devuelve null si está cerrado.          |
| assertCompletionTime | Exige que la finalización ocurra durante la jornada local vigente del negocio.          |
| canFit               | Comprueba capacidad simultánea por barrido de eventos y exclusión de vehículo/empleado. |
| assertWorkingTime    | Exige futuro, día abierto, alineación a grilla y finalización dentro de atención.       |

## src/modules/appointments/teamCapacity.ts

Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado.

[Abrir fuente](../src/modules/appointments/teamCapacity.ts)

| Exportación        | Responsabilidad                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------- |
| assertTeamCapacity | Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado. |

## src/modules/appointments/transitions.ts

Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service.

[Abrir fuente](../src/modules/appointments/transitions.ts)

| Exportación      | Responsabilidad                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| assertTransition | Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service. |

## src/modules/appointments/vehicleDetail.service.ts

El titular agrega observaciones al turno confirmado, sin cambiar lo contratado.

[Abrir fuente](../src/modules/appointments/vehicleDetail.service.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| saveVehicleDetail | El titular agrega observaciones al turno confirmado, sin cambiar lo contratado. |

## src/modules/appointments/walkIn.repository.ts

Busca un reintento para no duplicar un ingreso al reenviar la solicitud.

[Abrir fuente](../src/modules/appointments/walkIn.repository.ts)

| Exportación       | Responsabilidad                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| previousArrival   | Busca un reintento para no duplicar un ingreso al reenviar la solicitud.         |
| registeredArrival | Resuelve patente registrada sin crear ni modificar el garaje.                    |
| hasActiveArrival  | Evita registrar dos veces un auto que ya espera atención o está siendo lavado.   |
| saveArrival       | Persiste datos presenciales y observaciones junto al turno, conservando autoría. |

## src/modules/appointments/walkIn.routes.ts

Monta el alta presencial antes de las rutas con parámetro id.

[Abrir fuente](../src/modules/appointments/walkIn.routes.ts)

| Exportación       | Responsabilidad                                               |
| ----------------- | ------------------------------------------------------------- |
| mountWalkInRoutes | Monta el alta presencial antes de las rutas con parámetro id. |

## src/modules/appointments/walkIn.schema.ts

Alta presencial mínima; el servidor decide horario, importes y responsable.

[Abrir fuente](../src/modules/appointments/walkIn.schema.ts)

| Exportación  | Responsabilidad                                                             |
| ------------ | --------------------------------------------------------------------------- |
| walkInSchema | Alta presencial mínima; el servidor decide horario, importes y responsable. |

## src/modules/appointments/walkIn.service.ts

Registra llegada, contrato y observaciones atómicamente; nunca crea cuentas ficticias.

[Abrir fuente](../src/modules/appointments/walkIn.service.ts)

| Exportación  | Responsabilidad                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| createWalkIn | Registra llegada, contrato y observaciones atómicamente; nunca crea cuentas ficticias. |

## src/modules/appointments/walkIn.slot.ts

Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes.

[Abrir fuente](../src/modules/appointments/walkIn.slot.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| walkInSlot  | Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes. |

## src/modules/appointments/wash.repository.ts

El parte guarda el responsable real, su declaración y la decisión administrativa.

[Abrir fuente](../src/modules/appointments/wash.repository.ts)

| Exportación    | Responsabilidad                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| WashSubmission | El parte guarda el responsable real, su declaración y la decisión administrativa.    |
| latestWash     | Lee el último intento. Las devoluciones anteriores quedan en el historial SQL.       |
| submitWash     | Crea un parte inmutable bajo el mismo bloqueo que el estado del turno.               |
| recordReview   | Registra quién revisó un parte y cuándo, conservando descripción y autor originales. |

## src/modules/appointments/wash.service.ts

Solo el responsable registra la finalización física, durante el horario de trabajo.

[Abrir fuente](../src/modules/appointments/wash.service.ts)

| Exportación       | Responsabilidad                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------- |
| sendWashForReview | Solo el responsable registra la finalización física, durante el horario de trabajo.         |
| reviewWash        | Valida el parte exacto inspeccionado; una revisión desactualizada no decide un parte nuevo. |
| presentWash       | El cliente ve el parte aprobado; el equipo también ve envíos y correcciones internas.       |

## src/modules/appointments/work.routes.ts

Cambios del auto, envío del responsable y decisión exclusiva de Administración.

[Abrir fuente](../src/modules/appointments/work.routes.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| mountWorkRoutes | Cambios del auto, envío del responsable y decisión exclusiva de Administración. |

## src/modules/appointments/work.schema.ts

Datos adicionales del auto ingresados después de confirmar.

[Abrir fuente](../src/modules/appointments/work.schema.ts)

| Exportación         | Responsabilidad                                                                   |
| ------------------- | --------------------------------------------------------------------------------- |
| vehicleDetailSchema | Datos adicionales del auto ingresados después de confirmar.                       |
| washSchema          | Descripción obligatoria del trabajo realizado.                                    |
| attachVehicleSchema | Identidad existente o nuevo vehículo sin tipo ni dueño editable desde la reserva. |
| reviewSchema        | Una devolución requiere instrucciones para el empleado.                           |

## src/modules/attendance/attendance.repository.ts

Muestra el plantel activo para el día actual e incluye fichajes históricos aunque cambie el plantel.

[Abrir fuente](../src/modules/attendance/attendance.repository.ts)

| Exportación    | Responsabilidad                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| readAttendance | Muestra el plantel activo para el día actual e incluye fichajes históricos aunque cambie el plantel. |
| insertArrival  | El primer fichaje del día prevalece ante clics duplicados o simultáneos.                             |

## src/modules/attendance/attendance.routes.ts

Solamente Administración puede leer y registrar la asistencia del equipo.

[Abrir fuente](../src/modules/attendance/attendance.routes.ts)

| Exportación            | Responsabilidad                                                           |
| ---------------------- | ------------------------------------------------------------------------- |
| createAttendanceRoutes | Solamente Administración puede leer y registrar la asistencia del equipo. |

## src/modules/attendance/attendance.service.ts

Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.

[Abrir fuente](../src/modules/attendance/attendance.service.ts)

| Exportación   | Responsabilidad                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| getAttendance | Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.          |
| recordArrival | Ficha una llegada observada por Administración con el reloj del servidor y el día del negocio. |

## src/modules/attendance/attendance.window.ts

Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador.

[Abrir fuente](../src/modules/attendance/attendance.window.ts)

| Exportación      | Responsabilidad                                                                    |
| ---------------- | ---------------------------------------------------------------------------------- |
| attendanceWindow | Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador. |

## src/modules/auth/auth.controller.ts

Registra cuenta pública sin permisos elegibles.

[Abrir fuente](../src/modules/auth/auth.controller.ts)

| Exportación | Responsabilidad                                 |
| ----------- | ----------------------------------------------- |
| register    | Registra cuenta pública sin permisos elegibles. |
| login       | Inicia sesión email/contraseña.                 |
| refresh     | Renueva sesión mediante rotación de refresh.    |
| logout      | Revoca la sesión del dispositivo.               |

## src/modules/auth/auth.routes.ts

Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes.

[Abrir fuente](../src/modules/auth/auth.routes.ts)

| Exportación      | Responsabilidad                                                                         |
| ---------------- | --------------------------------------------------------------------------------------- |
| createAuthRoutes | Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes. |

## src/modules/auth/auth.schema.ts

Registro público estricto: rol y habilitación de cobros no son aceptados.

[Abrir fuente](../src/modules/auth/auth.schema.ts)

| Exportación    | Responsabilidad                                                           |
| -------------- | ------------------------------------------------------------------------- |
| registerSchema | Registro público estricto: rol y habilitación de cobros no son aceptados. |
| loginSchema    | Login tradicional.                                                        |
| refreshSchema  | Refresh opaco de 32 bytes, no JWT externo.                                |

## src/modules/auth/auth.service.ts

Registra siempre Cliente y no acepta privilegios del request.

[Abrir fuente](../src/modules/auth/auth.service.ts)

| Exportación | Responsabilidad                                                   |
| ----------- | ----------------------------------------------------------------- |
| register    | Registra siempre Cliente y no acepta privilegios del request.     |
| login       | Autentica sin revelar si el email o la contraseña fue incorrecto. |

## src/modules/auth/auth.types.ts

Devuelve solo el contrato de sesión; el ID interno de rotación no se publica.

[Abrir fuente](../src/modules/auth/auth.types.ts)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| presentSession | Devuelve solo el contrato de sesión; el ID interno de rotación no se publica. |

## src/modules/auth/oauth.controller.ts

Disponibilidad de botones sociales.

[Abrir fuente](../src/modules/auth/oauth.controller.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| providers   | Disponibilidad de botones sociales.                                         |
| authorize   | Inicio OAuth con state/PKCE validado.                                       |
| start       | Prepara la URL social sin redirigir el navegador hacia un servidor dormido. |
| callback    | Callback HTTPS validado, después redirección allowlisted al cliente.        |
| exchange    | Canje final de grant y verifier por sesión propia.                          |

## src/modules/auth/oauth.exchange.service.ts

Canjea un grant de un solo uso con PKCE y confirma la vinculación local cuando corresponde.

[Abrir fuente](../src/modules/auth/oauth.exchange.service.ts)

| Exportación | Responsabilidad                                                                             |
| ----------- | ------------------------------------------------------------------------------------------- |
| exchange    | Canjea un grant de un solo uso con PKCE y confirma la vinculación local cuando corresponde. |

## src/modules/auth/oauth.grants.repository.ts

Candidato verificado por el proveedor; aún no vinculado a la cuenta local.

[Abrir fuente](../src/modules/auth/oauth.grants.repository.ts)

| Exportación  | Responsabilidad                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| PendingLink  | Candidato verificado por el proveedor; aún no vinculado a la cuenta local.           |
| OAuthGrant   | Datos internos del grant; jamás se presentan al frontend.                            |
| saveGrant    | Persiste solo hash; ofrece cinco minutos para confirmar una vinculación local.       |
| lockGrant    | Bloquea el grant para serializar intentos y evitar dos sesiones por el mismo código. |
| failedLink   | Registra intentos fallidos; la transacción debe confirmar este cambio antes del 401. |
| consumeGrant | Invalida un grant después del canje exitoso.                                         |

## src/modules/auth/oauth.identity.service.ts

Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular.

[Abrir fuente](../src/modules/auth/oauth.identity.service.ts)

| Exportación | Responsabilidad                                                                              |
| ----------- | -------------------------------------------------------------------------------------------- |
| issueGrant  | Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular. |

## src/modules/auth/oauth.repository.ts

Persiste estado opaco con vencimiento corto.

[Abrir fuente](../src/modules/auth/oauth.repository.ts)

| Exportación | Responsabilidad                                                 |
| ----------- | --------------------------------------------------------------- |
| saveState   | Persiste estado opaco con vencimiento corto.                    |
| takeState   | Bloquea/consume estado una vez antes de contactar al proveedor. |
| findSocial  | Busca identidad externa por sujeto estable del proveedor.       |
| linkSocial  | Vincula email verificado a la identidad ya existente.           |

## src/modules/auth/oauth.return.ts

Retorna errores públicos únicamente al redirect de un estado ya validado y consumido.

[Abrir fuente](../src/modules/auth/oauth.return.ts)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| oauthErrorReturn | Retorna errores públicos únicamente al redirect de un estado ya validado y consumido. |

## src/modules/auth/oauth.routes.ts

Inicio, retorno y canje de códigos sociales; todos limitados por origen.

[Abrir fuente](../src/modules/auth/oauth.routes.ts)

| Exportación       | Responsabilidad                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| createOAuthRoutes | Inicio, retorno y canje de códigos sociales; todos limitados por origen. |

## src/modules/auth/oauth.schema.ts

Provider cerrado evita redirecciones y SSRF por URLs recibidas del cliente.

[Abrir fuente](../src/modules/auth/oauth.schema.ts)

| Exportación         | Responsabilidad                                                                 |
| ------------------- | ------------------------------------------------------------------------------- |
| providerSchema      | Provider cerrado evita redirecciones y SSRF por URLs recibidas del cliente.     |
| authorizeSchema     | Contrato AuthSession: exige PKCE S256, state y redirect allowlisted en service. |
| oauthExchangeSchema | Código propio canjeable únicamente con el verifier que inició la app.           |

## src/modules/auth/oauth.service.ts

Metadatos públicos, solo habilitado/deshabilitado por proveedor.

[Abrir fuente](../src/modules/auth/oauth.service.ts)

| Exportación   | Responsabilidad                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| exchange      | Contrato tipado declarado en la fuente.                                          |
| pkceChallenge | Contrato tipado declarado en la fuente.                                          |
| listProviders | Metadatos públicos, solo habilitado/deshabilitado por proveedor.                 |
| authorize     | Prepara redirección al proveedor y vincula state/redirect/client PKCE de la app. |
| callback      | Consume callback del proveedor y entrega solamente código efímero al deep link.  |

## src/modules/auth/oauth.types.ts

Proveedores OAuth admitidos. URLs nunca se reciben del usuario.

[Abrir fuente](../src/modules/auth/oauth.types.ts)

| Exportación    | Responsabilidad                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| Provider       | Proveedores OAuth admitidos. URLs nunca se reciben del usuario.              |
| SocialIdentity | Identidad obtenida directamente del proveedor, con email verificado.         |
| OAuthState     | Estado interno efímero vinculado a la solicitud AuthSession del dispositivo. |

## src/modules/auth/pkce.ts

Calcula el challenge S256 del verifier generado por el cliente.

[Abrir fuente](../src/modules/auth/pkce.ts)

| Exportación          | Responsabilidad                                                              |
| -------------------- | ---------------------------------------------------------------------------- |
| pkceChallenge        | Calcula el challenge S256 del verifier generado por el cliente.              |
| assertGrantChallenge | Rechaza códigos ajenos o vencidos sin revelar cuál de las condiciones falló. |

## src/modules/auth/provider.http.ts

Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa.

[Abrir fuente](../src/modules/auth/provider.http.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| fetchJson   | Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa. |

## src/modules/auth/provider.profile.ts

Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor.

[Abrir fuente](../src/modules/auth/provider.profile.ts)

| Exportación     | Responsabilidad                                                                   |
| --------------- | --------------------------------------------------------------------------------- |
| providerProfile | Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor. |

## src/modules/auth/provider.service.ts

Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible.

[Abrir fuente](../src/modules/auth/provider.service.ts)

| Exportación      | Responsabilidad                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------ |
| exchangeProvider | Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible. |

## src/modules/auth/recovery.delivery.ts

Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen.

[Abrir fuente](../src/modules/auth/recovery.delivery.ts)

| Exportación      | Responsabilidad                                                                  |
| ---------------- | -------------------------------------------------------------------------------- |
| dispatchRecovery | Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen. |

## src/modules/auth/recovery.limiter.ts

Límite compartido entre solicitudes y consumo de tokens por dirección de red.

[Abrir fuente](../src/modules/auth/recovery.limiter.ts)

| Exportación     | Responsabilidad                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| recoveryLimiter | Límite compartido entre solicitudes y consumo de tokens por dirección de red. |

## src/modules/auth/recovery.mailtrap.ts

Envía exclusivamente a la bandeja Sandbox por HTTPS; no utiliza puertos SMTP.

[Abrir fuente](../src/modules/auth/recovery.mailtrap.ts)

| Exportación      | Responsabilidad                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| sendRecoveryMail | Envía exclusivamente a la bandeja Sandbox por HTTPS; no utiliza puertos SMTP. |

## src/modules/auth/recovery.queue.repository.ts

Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.

[Abrir fuente](../src/modules/auth/recovery.queue.repository.ts)

| Exportación     | Responsabilidad                                                                    |
| --------------- | ---------------------------------------------------------------------------------- |
| enqueueRecovery | Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.  |
| claimRecovery   | Reclama un trabajo con arrendamiento recuperable después de reiniciar el servidor. |
| finishDelivery  | Finaliza o reprograma sin guardar respuestas remotas que puedan contener secretos. |

## src/modules/auth/recovery.repository.ts

Consulta un token por hash; el bloqueo se toma después del usuario para evitar deadlocks.

[Abrir fuente](../src/modules/auth/recovery.repository.ts)

| Exportación     | Responsabilidad                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------- |
| findRecovery    | Consulta un token por hash; el bloqueo se toma después del usuario para evitar deadlocks.       |
| lockRecovery    | Lee un trabajo después de bloquear primero la cuenta.                                           |
| prepareRecovery | Asocia cuenta y versión de contraseña; el plazo nunca se renueva al reintentar.                 |
| consumeRecovery | Inutiliza solicitudes antiguas de la cuenta al cambiar la contraseña.                           |
| discardRecovery | Descarta correo inexistente, cuenta inactiva o trabajo vencido sin filtrar la causa al público. |

## src/modules/auth/recovery.routes.ts

Recuperación pública con límites por IP y correo y respuestas no almacenables.

[Abrir fuente](../src/modules/auth/recovery.routes.ts)

| Exportación          | Responsabilidad                                                                |
| -------------------- | ------------------------------------------------------------------------------ |
| createRecoveryRoutes | Recuperación pública con límites por IP y correo y respuestas no almacenables. |

## src/modules/auth/recovery.schema.ts

El retorno lo fija el servidor, jamás se acepta una URL del solicitante.

[Abrir fuente](../src/modules/auth/recovery.schema.ts)

| Exportación          | Responsabilidad                                                          |
| -------------------- | ------------------------------------------------------------------------ |
| forgotPasswordSchema | El retorno lo fija el servidor, jamás se acepta una URL del solicitante. |
| resetPasswordSchema  | Solo el POST consume el token; abrir el enlace no cambia la cuenta.      |

## src/modules/auth/recovery.service.ts

Respuesta idéntica para correos conocidos, desconocidos o limitados; no hace lookup de cuentas.

[Abrir fuente](../src/modules/auth/recovery.service.ts)

| Exportación     | Responsabilidad                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| requestRecovery | Respuesta idéntica para correos conocidos, desconocidos o limitados; no hace lookup de cuentas.   |
| resetPassword   | Consume el enlace una vez, cambia bcrypt y revoca JWT/refresh anteriores en la misma transacción. |

## src/modules/auth/recovery.time.ts

MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor.

[Abrir fuente](../src/modules/auth/recovery.time.ts)

| Exportación     | Responsabilidad                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| recoveryExpired | MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor. |

## src/modules/auth/recovery.token.ts

Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base.

[Abrir fuente](../src/modules/auth/recovery.token.ts)

| Exportación   | Responsabilidad                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| recoveryToken | Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base. |

## src/modules/auth/recovery.types.ts

Trabajo privado; nunca se serializa en una respuesta HTTP.

[Abrir fuente](../src/modules/auth/recovery.types.ts)

| Exportación    | Responsabilidad                                                             |
| -------------- | --------------------------------------------------------------------------- |
| RecoveryJob    | Trabajo privado; nunca se serializa en una respuesta HTTP.                  |
| RecoverySender | Puerto de entrega inyectable para pruebas sin consumir el cupo de Mailtrap. |

## src/modules/auth/recovery.worker.ts

Trabajador duradero: el cierre del proceso deja el trabajo disponible tras vencer el bloqueo.

[Abrir fuente](../src/modules/auth/recovery.worker.ts)

| Exportación         | Responsabilidad                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------- |
| startRecoveryWorker | Trabajador duradero: el cierre del proceso deja el trabajo disponible tras vencer el bloqueo. |

## src/modules/auth/session.repository.ts

Sesión interna bloqueada durante rotación.

[Abrir fuente](../src/modules/auth/session.repository.ts)

| Exportación    | Responsabilidad                                                           |
| -------------- | ------------------------------------------------------------------------- |
| SessionRow     | Sesión interna bloqueada durante rotación.                                |
| insertSession  | Inserta hash de refresh con familia y expiración.                         |
| lockSession    | Consulta y bloquea un refresh para consumirlo exactamente una vez.        |
| revokeFamily   | Revoca familia ante logout o detección de refresh reutilizado.            |
| rotateSession  | Registra el token sucesor conservando el anterior para detectar reuso.    |
| isFamilyActive | Valida que la familia del JWT siga activa tras logout o reuso de refresh. |

## src/modules/auth/session.service.ts

Crea JWT propio y refresh opaco asociado. El caller garantiza cuenta activa.

[Abrir fuente](../src/modules/auth/session.service.ts)

| Exportación    | Responsabilidad                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| createSession  | Crea JWT propio y refresh opaco asociado. El caller garantiza cuenta activa.         |
| refreshSession | Rota un refresh bajo bloqueo y revoca su familia cuando detecta reuso o vencimiento. |
| logoutSession  | Revoca la familia del dispositivo; logout repetido es idempotente.                   |

## src/modules/auth/token.service.ts

Emite JWT de quince minutos con audiencia e issuer restringidos.

[Abrir fuente](../src/modules/auth/token.service.ts)

| Exportación  | Responsabilidad                                                  |
| ------------ | ---------------------------------------------------------------- |
| signAccess   | Emite JWT de quince minutos con audiencia e issuer restringidos. |
| verifyAccess | Verifica firma y tiempo.                                         |
| opaqueToken  | Genera tokens criptográficos opacos.                             |
| tokenHash    | Hash irreversible para persistir tokens revocables.              |

## src/modules/customerMessages/messages.repository.ts

Bandeja paginada. clientId nulo corresponde únicamente a Administración.

[Abrir fuente](../src/modules/customerMessages/messages.repository.ts)

| Exportación    | Responsabilidad                                                                              |
| -------------- | -------------------------------------------------------------------------------------------- |
| listMessages   | Bandeja paginada. clientId nulo corresponde únicamente a Administración.                     |
| insertMessage  | Persiste el caso con la identidad autenticada y un vínculo al parte aprobado si corresponde. |
| resolveMessage | Resuelve una sola vez; dos administradores no se pisan la respuesta.                         |

## src/modules/customerMessages/messages.routes.ts

La bandeja está disponible únicamente para clientes y Administración.

[Abrir fuente](../src/modules/customerMessages/messages.routes.ts)

| Exportación         | Responsabilidad                                                       |
| ------------------- | --------------------------------------------------------------------- |
| createMessageRoutes | La bandeja está disponible únicamente para clientes y Administración. |

## src/modules/customerMessages/messages.schema.ts

Reclamo general o devolución del titular sobre un lavado finalizado.

[Abrir fuente](../src/modules/customerMessages/messages.schema.ts)

| Exportación   | Responsabilidad                                                         |
| ------------- | ----------------------------------------------------------------------- |
| messageSchema | Reclamo general o devolución del titular sobre un lavado finalizado.    |
| messageQuery  | Filtra por estado y pagina la bandeja sin descargar datos innecesarios. |
| replySchema   | El cliente recibe la respuesta al cerrar el caso.                       |

## src/modules/customerMessages/messages.service.ts

Administración ve la bandeja completa; el cliente solo ve sus propios mensajes.

[Abrir fuente](../src/modules/customerMessages/messages.service.ts)

| Exportación    | Responsabilidad                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| getMessages    | Administración ve la bandeja completa; el cliente solo ve sus propios mensajes. |
| createMessage  | Una devolución queda asociada al parte verificado y al cliente dueño del turno. |
| replyToMessage | Guarda la respuesta del administrador, visible para el titular en su bandeja.   |

## src/modules/health/health.controller.ts

Devuelve salud del proceso sin depender de MySQL.

[Abrir fuente](../src/modules/health/health.controller.ts)

| Exportación     | Responsabilidad                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| getHealth       | Devuelve salud del proceso sin depender de MySQL.                                    |
| createReadiness | Construye readiness con dependencia inyectada para verificar fallos reales en tests. |

## src/modules/health/health.repository.ts

Verifica MySQL sin escribir.

[Abrir fuente](../src/modules/health/health.repository.ts)

| Exportación   | Responsabilidad              |
| ------------- | ---------------------------- |
| checkDatabase | Verifica MySQL sin escribir. |

## src/modules/health/health.routes.ts

Expone sondas públicas sin incluir datos sensibles.

[Abrir fuente](../src/modules/health/health.routes.ts)

| Exportación        | Responsabilidad                                     |
| ------------------ | --------------------------------------------------- |
| createHealthRoutes | Expone sondas públicas sin incluir datos sensibles. |

## src/modules/health/information.routes.ts

Publica el aviso de uso de datos necesario para la configuración de identidad.

[Abrir fuente](../src/modules/health/information.routes.ts)

| Exportación             | Responsabilidad                                                                |
| ----------------------- | ------------------------------------------------------------------------------ |
| createInformationRoutes | Publica el aviso de uso de datos necesario para la configuración de identidad. |

## src/modules/payments/payments.controller.ts

Cobros del turno autorizado.

[Abrir fuente](../src/modules/payments/payments.controller.ts)

| Exportación | Responsabilidad                |
| ----------- | ------------------------------ |
| list        | Cobros del turno autorizado.   |
| create      | Registro idempotente de cobro. |

## src/modules/payments/payments.repository.ts

Lista cobros del turno sin datos de autenticación.

[Abrir fuente](../src/modules/payments/payments.repository.ts)

| Exportación   | Responsabilidad                                          |
| ------------- | -------------------------------------------------------- |
| listPayments  | Lista cobros del turno sin datos de autenticación.       |
| findPayment   | Busca un reintento de cobro por clave global.            |
| insertPayment | Inserta cobro bajo lock del turno; service valida saldo. |

## src/modules/payments/payments.routes.ts

Rutas anidadas que conservan appointment id por mergeParams.

[Abrir fuente](../src/modules/payments/payments.routes.ts)

| Exportación          | Responsabilidad                                              |
| -------------------- | ------------------------------------------------------------ |
| createPaymentsRoutes | Rutas anidadas que conservan appointment id por mergeParams. |

## src/modules/payments/payments.schema.ts

Cobro idempotente en centavos ARS. Clave estable al reintentar desde móvil.

[Abrir fuente](../src/modules/payments/payments.schema.ts)

| Exportación   | Responsabilidad                                                             |
| ------------- | --------------------------------------------------------------------------- |
| paymentSchema | Cobro idempotente en centavos ARS. Clave estable al reintentar desde móvil. |

## src/modules/payments/payments.service.ts

Lista cobros propios o administrados; empleados solo pueden registrar cuando están habilitados.

[Abrir fuente](../src/modules/payments/payments.service.ts)

| Exportación   | Responsabilidad                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------- |
| getPayments   | Lista cobros propios o administrados; empleados solo pueden registrar cuando están habilitados. |
| recordPayment | Registra un cobro de forma atómica; no ejecuta una transferencia bancaria.                      |

## src/modules/reports/reportAggregation.ts

Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas.

[Abrir fuente](../src/modules/reports/reportAggregation.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| aggregateReport | Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas. |

## src/modules/reports/reportWeeks.ts

Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales.

[Abrir fuente](../src/modules/reports/reportWeeks.ts)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| reportWeeks | Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales. |

## src/modules/reports/reports.controller.ts

Reporte administrativo.

[Abrir fuente](../src/modules/reports/reports.controller.ts)

| Exportación | Responsabilidad             |
| ----------- | --------------------------- |
| business    | Reporte administrativo.     |
| personal    | Resumen propio de empleado. |

## src/modules/reports/reports.repository.ts

Trabajos finalizados en el intervalo UTC derivado del calendario local.

[Abrir fuente](../src/modules/reports/reports.repository.ts)

| Exportación     | Responsabilidad                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| completedWork   | Trabajos finalizados en el intervalo UTC derivado del calendario local.              |
| revenue         | Ingresos contabilizados por momento real del pago, sin multiplicarlos por servicios. |
| popularServices | Servicios contratados por fecha de atención, excluyendo cancelados.                  |
| employeeSummary | Cuenta la jornada compartida por estado y fecha, sin revelar ingresos del negocio.   |

## src/modules/reports/reports.routes.ts

Reportes de ingresos solo admin; resumen de jornada solo empleado.

[Abrir fuente](../src/modules/reports/reports.routes.ts)

| Exportación         | Responsabilidad                                                    |
| ------------------- | ------------------------------------------------------------------ |
| createReportsRoutes | Reportes de ingresos solo admin; resumen de jornada solo empleado. |

## src/modules/reports/reports.schema.ts

Período calendario local del negocio.

[Abrir fuente](../src/modules/reports/reports.schema.ts)

| Exportación  | Responsabilidad                       |
| ------------ | ------------------------------------- |
| reportSchema | Período calendario local del negocio. |

## src/modules/reports/reports.service.ts

Reporte administrativo: lavados, ingresos, populares y rendimiento por empleado.

[Abrir fuente](../src/modules/reports/reports.service.ts)

| Exportación    | Responsabilidad                                                                  |
| -------------- | -------------------------------------------------------------------------------- |
| businessReport | Reporte administrativo: lavados, ingresos, populares y rendimiento por empleado. |
| personalReport | Resumen de la jornada compartida, sin datos financieros.                         |

## src/modules/reports/reports.window.ts

Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio.

[Abrir fuente](../src/modules/reports/reports.window.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| reportWindow | Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio. |
| ReportRange  | Ventana de calendario común al resumen personal y al reporte del negocio.     |

## src/modules/services/catalogRules.ts

El lavado de moto y el catálogo de los demás vehículos no se mezclan.

[Abrir fuente](../src/modules/services/catalogRules.ts)

| Exportación         | Responsabilidad                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| supportsService     | El lavado de moto y el catálogo de los demás vehículos no se mezclan.          |
| assertWashSelection | Protege la cotización y la reserva de combinaciones que no ofrece el catálogo. |

## src/modules/services/services.controller.ts

Catálogo según rol.

[Abrir fuente](../src/modules/services/services.controller.ts)

| Exportación | Responsabilidad                            |
| ----------- | ------------------------------------------ |
| list        | Catálogo según rol.                        |
| get         | Consulta individual de servicio y tarifas. |
| create      | Alta de servicio.                          |
| edit        | Edición administrativa.                    |
| remove      | Baja lógica.                               |
| price       | Tarifa por tipo.                           |

## src/modules/services/services.repository.ts

Servicio de catálogo.

[Abrir fuente](../src/modules/services/services.repository.ts)

| Exportación   | Responsabilidad                                                  |
| ------------- | ---------------------------------------------------------------- |
| Service       | Servicio de catálogo.                                            |
| listServices  | Lee catálogo sin borrar historia; admin puede incluir inactivos. |
| findService   | Busca servicio por ID.                                           |
| listPrices    | Precios vigentes, agrupables por tipo en el servicio.            |
| insertService | Inserta un servicio de catálogo validado.                        |
| updateService | Actualiza datos sin modificar snapshots de turnos previos.       |
| removeService | Desactiva y borra lógicamente un servicio.                       |
| savePrice     | Upsert de un precio vigente por par servicio/tipo.               |

## src/modules/services/services.routes.ts

Catálogo autenticado y escritura administrativa.

[Abrir fuente](../src/modules/services/services.routes.ts)

| Exportación          | Responsabilidad                                  |
| -------------------- | ------------------------------------------------ |
| createServicesRoutes | Catálogo autenticado y escritura administrativa. |

## src/modules/services/services.schema.ts

Servicio administrable con duración explícita en minutos.

[Abrir fuente](../src/modules/services/services.schema.ts)

| Exportación        | Responsabilidad                                           |
| ------------------ | --------------------------------------------------------- |
| serviceSchema      | Servicio administrable con duración explícita en minutos. |
| priceSchema        | Precio en centavos ARS.                                   |
| servicePatchSchema | Actualización parcial del servicio.                       |

## src/modules/services/services.service.ts

Retorna catálogo con tarifas por tipo y duración estimada.

[Abrir fuente](../src/modules/services/services.service.ts)

| Exportación   | Responsabilidad                                                       |
| ------------- | --------------------------------------------------------------------- |
| catalog       | Retorna catálogo con tarifas por tipo y duración estimada.            |
| createService | Crea servicio, aún sin tarifas hasta que admin las cargue.            |
| editService   | Edita y valida un servicio existente.                                 |
| deleteService | Desactiva servicio existente sin afectar precios históricos.          |
| setPrice      | Cambia tarifa vigente. FK impide un tipo inexistente.                 |
| getService    | Detalle de catálogo con la misma proyección normalizada que la lista. |

## src/modules/settings/settings.controller.ts

Consulta configuración del negocio.

[Abrir fuente](../src/modules/settings/settings.controller.ts)

| Exportación | Responsabilidad                               |
| ----------- | --------------------------------------------- |
| get         | Consulta configuración del negocio.           |
| save        | Guarda configuración administrativa validada. |

## src/modules/settings/settings.repository.ts

Configuración interna de una sucursal.

[Abrir fuente](../src/modules/settings/settings.repository.ts)

| Exportación    | Responsabilidad                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| Settings       | Configuración interna de una sucursal.                                                  |
| BusinessHour   | Horario local por día ISO.                                                              |
| readSettings   | Lee configuración o bloquea la fila común para serializar cambios de agenda y reservas. |
| readHours      | Lee días abiertos, sin filas para días cerrados.                                        |
| updateSettings | Guarda parámetros bajo la misma transacción de horario.                                 |
| updateHours    | Reemplaza la semana completa de forma atómica.                                          |

## src/modules/settings/settings.routes.ts

Todos pueden conocer horarios; solo admin puede editarlos.

[Abrir fuente](../src/modules/settings/settings.routes.ts)

| Exportación          | Responsabilidad                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------ |
| createSettingsRoutes | Todos pueden conocer horarios; solo admin puede editarlos.                                 |
| createBusinessRoutes | Horarios y política de cancelación legibles por todos, fuera de las rutas administrativas. |

## src/modules/settings/settings.schema.ts

Configuración tipada de agenda de una única sucursal.

[Abrir fuente](../src/modules/settings/settings.schema.ts)

| Exportación    | Responsabilidad                                       |
| -------------- | ----------------------------------------------------- |
| settingsSchema | Configuración tipada de agenda de una única sucursal. |

## src/modules/settings/settings.service.ts

Lee configuración pública de operación, sin datos privados.

[Abrir fuente](../src/modules/settings/settings.service.ts)

| Exportación  | Responsabilidad                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------ |
| getSettings  | Lee configuración pública de operación, sin datos privados.                                      |
| saveSettings | Guarda la configuración serializando con las reservas en curso. No reprograma turnos existentes. |

## src/modules/users/admin.repository.ts

Serializa todos los cambios que podrían eliminar el último administrador.

[Abrir fuente](../src/modules/users/admin.repository.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| lockAdminGuard    | Serializa todos los cambios que podrían eliminar el último administrador.    |
| countActiveAdmins | Cuenta administradores vigentes dentro de la transacción que tiene el guard. |
| setRole           | Cambia rol usando catálogo, nunca un ID recibido del cliente.                |
| setAccount        | Actualiza permisos o estado lógico con lista cerrada de columnas.            |
| setPassword       | Cambia hash, no contraseña legible.                                          |

## src/modules/users/admin.service.ts

Impide autoexclusión y pérdida del último admin bajo lock común.

[Abrir fuente](../src/modules/users/admin.service.ts)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| changeRole  | Impide autoexclusión y pérdida del último admin bajo lock común.               |
| editAccount | Edita/desactiva o elimina lógicamente preservando invariantes administrativas. |

## src/modules/users/users.controller.ts

Devuelve perfil de sesión.

[Abrir fuente](../src/modules/users/users.controller.ts)

| Exportación | Responsabilidad                      |
| ----------- | ------------------------------------ |
| me          | Devuelve perfil de sesión.           |
| editMe      | Actualiza perfil propio.             |
| password    | Actualiza contraseña propia.         |
| list        | Lista administrativa paginada.       |
| create      | Crea cuenta administrativa.          |
| get         | Consulta individual administrativa.  |
| edit        | Edita cuenta administrativa.         |
| role        | Cambia rol bajo guard transaccional. |
| remove      | Borrado lógico administrativo.       |

## src/modules/users/users.repository.ts

Obtiene identidad interna por ID, incluyendo estado lógico.

[Abrir fuente](../src/modules/users/users.repository.ts)

| Exportación        | Responsabilidad                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------- |
| findUser           | Obtiene identidad interna por ID, incluyendo estado lógico.                              |
| findByEmail        | Busca email normalizado para login o vinculación OAuth verificada.                       |
| insertUser         | Inserta una identidad; el servicio decide el rol autorizado.                             |
| listUsers          | Lista usuarios sin hashes con búsqueda y paginación; filtros son valores parametrizados. |
| updateProfile      | Actualiza únicamente campos de perfil permitidos.                                        |
| revokeUserSessions | Invalida permisos antiguos y todos los refresh de una cuenta.                            |

## src/modules/users/users.routes.ts

Perfil para todos; gestión de cuentas exclusivamente administrativa.

[Abrir fuente](../src/modules/users/users.routes.ts)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| createUsersRoutes | Perfil para todos; gestión de cuentas exclusivamente administrativa. |

## src/modules/users/users.schema.ts

Perfil propio sin campos de privilegios.

[Abrir fuente](../src/modules/users/users.schema.ts)

| Exportación          | Responsabilidad                                            |
| -------------------- | ---------------------------------------------------------- |
| profileSchema        | Perfil propio sin campos de privilegios.                   |
| createUserSchema     | Alta por administrador con rol explícito opcional.         |
| adminPatchSchema     | Edición administrativa, separada de promoción/degradación. |
| passwordChangeSchema | Cambio de contraseña exige acreditar la contraseña actual. |
| usersQuerySchema     | Filtro de usuarios administrativo.                         |
| roleSchema           | Rol sin posibilidad de incluir campos de perfil.           |

## src/modules/users/users.service.ts

Lee perfil por ID y exige que la cuenta exista.

[Abrir fuente](../src/modules/users/users.service.ts)

| Exportación      | Responsabilidad                                                                    |
| ---------------- | ---------------------------------------------------------------------------------- |
| getProfile       | Lee perfil por ID y exige que la cuenta exista.                                    |
| updateOwnProfile | Guarda solo perfil permitido, preservando campos omitidos.                         |
| createUser       | Alta administrativa con contraseña hasheada y rol previamente autorizado por ruta. |
| listUsers        | Lista perfiles sin datos de autenticación.                                         |
| changePassword   | Verifica contraseña actual y revoca sesiones anteriores al cambiarla.              |

## src/modules/users/users.types.ts

Registro interno de identidad. passwordHash nunca se serializa.

[Abrir fuente](../src/modules/users/users.types.ts)

| Exportación | Responsabilidad                                                          |
| ----------- | ------------------------------------------------------------------------ |
| Identity    | Registro interno de identidad. passwordHash nunca se serializa.          |
| publicUser  | Convierte el registro privado en un perfil público de campos explícitos. |

## src/modules/vehicleTypes/vehicleTypes.controller.ts

Catálogo de tipos.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.controller.ts)

| Exportación | Responsabilidad         |
| ----------- | ----------------------- |
| list        | Catálogo de tipos.      |
| create      | Alta administrativa.    |
| edit        | Edición administrativa. |
| remove      | Baja administrativa.    |

## src/modules/vehicleTypes/vehicleTypes.repository.ts

Consulta la categoría de una cotización o una tarifa.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.repository.ts)

| Exportación    | Responsabilidad                                       |
| -------------- | ----------------------------------------------------- |
| findType       | Consulta la categoría de una cotización o una tarifa. |
| listTypes      | Lista tipos de vehículo con ID string.                |
| insertType     | Crea tipo y devuelve ID.                              |
| updateType     | Edita tipo.                                           |
| deactivateType | Baja lógica del tipo.                                 |

## src/modules/vehicleTypes/vehicleTypes.routes.ts

Tipos visibles para todos, administrables solo por admin.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.routes.ts)

| Exportación              | Responsabilidad                                           |
| ------------------------ | --------------------------------------------------------- |
| createVehicleTypesRoutes | Tipos visibles para todos, administrables solo por admin. |

## src/modules/vehicleTypes/vehicleTypes.schema.ts

Tipo de vehículo administrable con código estable.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.schema.ts)

| Exportación       | Responsabilidad                                    |
| ----------------- | -------------------------------------------------- |
| vehicleTypeSchema | Tipo de vehículo administrable con código estable. |

## src/modules/vehicleTypes/vehicleTypes.service.ts

Catálogo con booleanos serializables.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.service.ts)

| Exportación | Responsabilidad                                                         |
| ----------- | ----------------------------------------------------------------------- |
| listTypes   | Catálogo con booleanos serializables.                                   |
| createType  | Alta de tipo.                                                           |
| editType    | Actualiza tipo y verifica existencia incluso si los valores no cambian. |
| deleteType  | Desactiva tipo.                                                         |

## src/modules/vehicles/vehicles.controller.ts

Lista visibles para el actor, con búsqueda/paginación.

[Abrir fuente](../src/modules/vehicles/vehicles.controller.ts)

| Exportación | Responsabilidad                                        |
| ----------- | ------------------------------------------------------ |
| list        | Lista visibles para el actor, con búsqueda/paginación. |
| get         | Consulta por ID con propiedad validada.                |
| create      | Crea vehículo.                                         |
| edit        | Edita vehículo.                                        |
| remove      | Elimina vehículo lógicamente.                          |

## src/modules/vehicles/vehicles.repository.ts

Vehículo con IDs serializables y campos propios.

[Abrir fuente](../src/modules/vehicles/vehicles.repository.ts)

| Exportación         | Responsabilidad                                                          |
| ------------------- | ------------------------------------------------------------------------ |
| Vehicle             | Vehículo con IDs serializables y campos propios.                         |
| findVehicle         | Busca vehículo; autorización corresponde al servicio o requireOwnership. |
| listVehicles        | Lista solo propios cuando ownerId está definido.                         |
| insertVehicle       | Guarda vehículo validado usando parámetros.                              |
| updateVehicle       | Actualiza columnas permitidas del vehículo.                              |
| removeVehicle       | Elimina lógicamente sin perder historial.                                |
| isVehicleTypeActive | Indica si el tipo está habilitado para nuevos vehículos.                 |

## src/modules/vehicles/vehicles.routes.ts

Vehículos: clientes propietarios y administración; empleados excluidos.

[Abrir fuente](../src/modules/vehicles/vehicles.routes.ts)

| Exportación          | Responsabilidad                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| createVehiclesRoutes | Vehículos: clientes propietarios y administración; empleados excluidos. |

## src/modules/vehicles/vehicles.schema.ts

Formulario de vehículo: el cliente no puede seleccionar un dueño ajeno.

[Abrir fuente](../src/modules/vehicles/vehicles.schema.ts)

| Exportación        | Responsabilidad                                                                        |
| ------------------ | -------------------------------------------------------------------------------------- |
| vehicleSchema      | Formulario de vehículo: el cliente no puede seleccionar un dueño ajeno.                |
| vehiclePatchSchema | Edición parcial, siempre validada como vehículo completo al combinarse en el servicio. |

## src/modules/vehicles/vehicles.service.ts

Accede solo a un vehículo propio o administrado; oculta recursos ajenos.

[Abrir fuente](../src/modules/vehicles/vehicles.service.ts)

| Exportación   | Responsabilidad                                                              |
| ------------- | ---------------------------------------------------------------------------- |
| getVehicle    | Accede solo a un vehículo propio o administrado; oculta recursos ajenos.     |
| createVehicle | Crea vehículo y asigna al cliente autenticado, salvo gestión administrativa. |
| editVehicle   | Edita los campos permitidos y valida el resultado completo.                  |
| deleteVehicle | Rechaza baja de vehículos con trabajos aún pendientes.                       |

## src/routes.ts

Compone módulos autónomos bajo /api/v1 sin lógica de negocio.

[Abrir fuente](../src/routes.ts)

| Exportación     | Responsabilidad                                               |
| --------------- | ------------------------------------------------------------- |
| createApiRoutes | Compone módulos autónomos bajo /api/v1 sin lógica de negocio. |

## src/server.ts

Cierra conexiones para permitir un despliegue o apagado ordenado.

[Abrir fuente](../src/server.ts)

## src/types/domain.ts

Roles persistidos y emitidos en JWT; el backend verifica siempre su vigencia.

[Abrir fuente](../src/types/domain.ts)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| Role        | Roles persistidos y emitidos en JWT; el backend verifica siempre su vigencia. |
| Actor       | Actor de la solicitud después de verificar token y usuario activo.            |
| User        | Perfil público; nunca incluye el hash de contraseña.                          |
| Page        | Resultado paginado con tamaño limitado por el servidor.                       |

## src/types/express.d.ts

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/types/express.d.ts)

## src/utils/db.ts

Ejecutor SQL utilizado exclusivamente por repositories e infraestructura.

[Abrir fuente](../src/utils/db.ts)

| Exportación | Responsabilidad                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Executor    | Ejecutor SQL utilizado exclusivamente por repositories e infraestructura.    |
| db          | Obtiene infraestructura configurada.                                         |
| rows        | Consulta parametrizada con filas tipadas.                                    |
| execute     | Escritura parametrizada. Nunca interpolar valores de usuarios dentro de sql. |

## src/utils/http.ts

Adapta un controller async al sobre REST estándar.

[Abrir fuente](../src/utils/http.ts)

| Exportación | Responsabilidad                                                       |
| ----------- | --------------------------------------------------------------------- |
| endpoint    | Adapta un controller async al sobre REST estándar.                    |
| actor       | Extrae actor autenticado.                                             |
| paramId     | Valida un identificador decimal positivo sin perder precisión BIGINT. |

## src/utils/pagination.ts

Paginación limitada y búsqueda opcional para listas administrativas.

[Abrir fuente](../src/utils/pagination.ts)

| Exportación      | Responsabilidad                                                      |
| ---------------- | -------------------------------------------------------------------- |
| paginationSchema | Paginación limitada y búsqueda opcional para listas administrativas. |
| pageResult       | Construye metadatos de una lista.                                    |

## src/utils/password.ts

Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar.

[Abrir fuente](../src/utils/password.ts)

| Exportación     | Responsabilidad                                                   |
| --------------- | ----------------------------------------------------------------- |
| passwordSchema  | Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar. |
| hashPassword    | Hashea con costo 12.                                              |
| comparePassword | Compara sin exponer el hash al frontend.                          |

## src/utils/transaction.ts

Ejecuta el caso de uso en una conexión y siempre libera el recurso.

[Abrir fuente](../src/utils/transaction.ts)

| Exportación | Responsabilidad                                                     |
| ----------- | ------------------------------------------------------------------- |
| transaction | Ejecuta el caso de uso en una conexión y siempre libera el recurso. |
