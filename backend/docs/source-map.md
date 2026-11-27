# Mapa completo del código propio

<!-- Generado por npm run docs. Cambiar los contratos junto al código y regenerar. -->

Incluye producción, soporte de base, scripts y pruebas. Excluye dependencias, secretos y compilaciones. Las firmas y explicaciones se extraen de la fuente; no ejecuta módulos ni lee `.env`.

Ver [guía del proyecto](../../docs/README.md) y [mantenimiento](../../docs/maintenance.md).

## src/app.ts

Compone Express. No abre puertos ni conecta MySQL al importarse.

[Abrir fuente](../src/app.ts)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| createApp   | Compone Express. No abre puertos ni conecta MySQL al importarse. |

### createApp

```ts
export function createApp(options: AppOptions);
```

- @param options - Configuración de la composición o del recurso.
- @returns `import("express-serve-static-core").Express`.

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

| Exportación          | Responsabilidad                                                        |
| -------------------- | ---------------------------------------------------------------------- |
| providerAvailability | Indica qué botones pueden iniciar OAuth sin revelar secretos.          |
| getProvider          | Configuración de proveedor. @throws AppError 503 si no fue habilitado. |

### providerAvailability

```ts
export function providerAvailability();
```

- @returns `{ provider: string; enabled: boolean; }[]`.

### getProvider

```ts
export function getProvider(provider: Provider);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @returns Credenciales, endpoints, alcance, opción de selección o consentimiento y soporte PKCE.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/config/readEnv.ts

Lee variables sin efectos secundarios. @throws Error si falta configuración válida.

[Abrir fuente](../src/config/readEnv.ts)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| readEnv     | Lee variables sin efectos secundarios. @throws Error si falta configuración válida. |

### readEnv

```ts
export function readEnv(source: NodeJS.ProcessEnv);
```

- @param source - Entrada original que se transforma sin modificarla.
- @returns Objeto con NODE_ENV, PORT, DATABASE_TLS, DATABASE_POOL_SIZE, CORS_ORIGINS, DATABASE_URL, DATABASE_CA_BASE64, JWT_ACCESS_SECRET.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/config/recovery.ts

Sandbox únicamente: las credenciales nunca se exponen al cliente.

[Abrir fuente](../src/config/recovery.ts)

| Exportación        | Responsabilidad                                                   |
| ------------------ | ----------------------------------------------------------------- |
| recoveryEnv        | Sandbox únicamente: las credenciales nunca se exponen al cliente. |
| recoveryConfigured | Indica si se puede capturar un correo de demostración.            |

### recoveryConfigured

```ts
export function recoveryConfigured();
```

- @returns Verdadero cuando todas las variables privadas están configuradas.

## src/config/validation.ts

Composición interna; los tipos y el flujo se consultan en la fuente.

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

### publicError

```ts
export function publicError(error: unknown);
```

- @param error - Fallo recibido que se proyecta sin exponer datos internos.
- @returns `{ status: number; error: { code: string; message: string; fields: { path: string; message: string; }[]; }; } | { status: number; error: { code: string; message: string; }; }`.

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

### createCors

```ts
export function createCors(origins: readonly string[]);
```

- @param origins - Orígenes exactos habilitados para CORS.
- @returns `(req: cors.CorsRequest, res: { statusCode?: number | undefined; setHeader(key: string, value: string): any; end(): any; }, next: (err?: any) => any) => void`.

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

### createMaintenanceGuard

```ts
export function createMaintenanceGuard(enabled: boolean): RequestHandler;
```

- @param enabled Activado exclusivamente durante una migración de datos.
- @returns Middleware que evita escrituras y nuevas sesiones en las dos bases a la vez.

## src/middlewares/requireOwnership.ts

Restringe acceso por propietario y oculta existencia de recursos ajenos.

[Abrir fuente](../src/middlewares/requireOwnership.ts)

| Exportación      | Responsabilidad                                                          |
| ---------------- | ------------------------------------------------------------------------ |
| requireOwnership | Restringe acceso por propietario y oculta existencia de recursos ajenos. |

### requireOwnership

```ts
export function requireOwnership(
  resolveOwner: (request: Request) => Promise<string | undefined>,
): RequestHandler;
```

- @param resolveOwner - Resuelve el titular permitido sin aceptar ownership arbitrario.
- @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/middlewares/requireRole.ts

Restringe una ruta a roles vigentes, después de authenticate.

[Abrir fuente](../src/middlewares/requireRole.ts)

| Exportación | Responsabilidad                                               |
| ----------- | ------------------------------------------------------------- |
| requireRole | Restringe una ruta a roles vigentes, después de authenticate. |

### requireRole

```ts
export function requireRole(...roles: Role[]): RequestHandler;
```

- @param roles - Roles que la ruta admite después de autenticar al actor.
- @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/middlewares/validate.ts

Valida y elimina campos no admitidos antes de llegar al controller.

[Abrir fuente](../src/middlewares/validate.ts)

| Exportación | Responsabilidad                                                     |
| ----------- | ------------------------------------------------------------------- |
| validate    | Valida y elimina campos no admitidos antes de llegar al controller. |

### validate

```ts
export function validate(schema: ZodType): RequestHandler;
```

- @param schema - Esquema Zod que valida y transforma la entrada.
- @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.

## src/modules/appointments/agendaScope.repository.ts

Define próximas visitas por día local y separa la jornada actual del historial.

[Abrir fuente](../src/modules/appointments/agendaScope.repository.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| agendaScope | Define próximas visitas por día local y separa la jornada actual del historial. |

### agendaScope

```ts
export function agendaScope(
  actor: Actor,
  input: z.infer<typeof appointmentQuerySchema>,
  timeZone: string,
);
```

- @param actor Identidad autenticada; los predicados no conceden acceso adicional.
- @param input Filtros validados de la pantalla.
- @param timeZone Zona del negocio, independiente del teléfono y del servidor SQL.
- @returns Condiciones cerradas y parámetros UTC para agregarlos a la consulta.

## src/modules/appointments/appointmentDetails.repository.ts

Vincula el vehículo ya validado sin cambiar los servicios ni el horario contratados.

[Abrir fuente](../src/modules/appointments/appointmentDetails.repository.ts)

| Exportación          | Responsabilidad                                                                      |
| -------------------- | ------------------------------------------------------------------------------------ |
| linkVehicle          | Vincula el vehículo ya validado sin cambiar los servicios ni el horario contratados. |
| saveDescription      | Guarda la descripción de esta visita; no modifica los datos del garaje.              |
| hideHomeAppointments | Oculta tarjetas propias del Inicio conservando reservas, pagos y auditoría.          |

### linkVehicle

```ts
export function linkVehicle(id: string, vehicleId: string, executor: Executor);
```

- @param id Turno bloqueado por el servicio.
- @param vehicleId Vehículo propio de la categoría reservada.
- @param executor Conexión que conserva el bloqueo común de agenda.
- @returns Resultado SQL; incrementa version para identificar el cambio del turno.

### saveDescription

```ts
export function saveDescription(id: string, description: string, executor: Executor);
```

- @param id Turno confirmado y autorizado por el servicio.
- @param description Texto validado que se conserva como dato.
- @param executor Conexión del bloqueo del turno.
- @returns Resultado de insertar o actualizar la única descripción de ese turno.

### hideHomeAppointments

```ts
export function hideHomeAppointments(
  clientId: string,
  from: string | null,
  executor: Executor,
);
```

- @param clientId Cliente autenticado; no proviene del cuerpo del formulario.
- @param from Inicio UTC del día local calculado por el servicio.
- @param executor Conexión de la operación transaccional.
- @returns Resultado SQL; affectedRows informa cuántas tarjetas se ocultaron.

## src/modules/appointments/appointments.access.ts

Oculta turnos de otros clientes; el equipo comparte la agenda operativa.

[Abrir fuente](../src/modules/appointments/appointments.access.ts)

| Exportación             | Responsabilidad                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------- |
| assertAppointmentAccess | Oculta turnos de otros clientes; el equipo comparte la agenda operativa.                |
| presentAppointment      | Proyecta el turno por actor sin serializar la fila interna completa.                    |
| canReassign             | Un turno en proceso puede recuperarse si el responsable anterior ya no está habilitado. |

### assertAppointmentAccess

```ts
export function assertAppointmentAccess(
  actor: Actor,
  appointment: Appointment | undefined,
): asserts appointment is Appointment;
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param appointment - Turno autorizado que conserva datos históricos del contrato.
- @returns No devuelve datos; al terminar estrecha el tipo y garantiza que el actor puede acceder al turno.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### presentAppointment

```ts
export function presentAppointment(v: Appointment, actor: Actor);
```

- @param v Turno interno con claves de cuenta e importes históricos.
- @param actor Identidad vigente que determina los campos autorizados.
- @returns Datos operativos; el empleado recibe importes solo con canRecordPayments.

### canReassign

```ts
export function canReassign(v: Appointment);
```

- @param v - Turno y disponibilidad vigente del responsable.
- @returns Si Administración puede elegir otro responsable.

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

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con items, total, page, limit.

### get

```ts
export function get(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con services, notes, totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate.

### slots

```ts
export function slots(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ items: import("./appointments.types.js").QuoteItem[]; totalCents: number; durationMinutes: number; slots: string[]; currencyCode: string; }>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate, brand, model.

### status

```ts
export function status(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ updated: boolean; status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"; }>`.

### cancel

```ts
export function cancel(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ updated: boolean; status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"; }>`.

### assign

```ts
export function assign(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ assigned: boolean; }>`.

### note

```ts
export function note(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ created: boolean; }>`.

### receipt

```ts
export function receipt(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con receiptNumber, issuedAt, fiscalInvoice, services, notes, totalCents, paidCents, currencyCode, id, status.

## src/modules/appointments/appointments.filters.repository.ts

Construye únicamente predicados cerrados; los datos siempre viajan como parámetros.

[Abrir fuente](../src/modules/appointments/appointments.filters.repository.ts)

| Exportación       | Responsabilidad                                                                     |
| ----------------- | ----------------------------------------------------------------------------------- |
| appointmentFilter | Construye únicamente predicados cerrados; los datos siempre viajan como parámetros. |

### appointmentFilter

```ts
export function appointmentFilter(actor: Actor, input: Filters, timeZone: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param input - Entrada validada por el esquema del caso de uso.
- @param timeZone - Zona IANA usada para convertir el calendario local a UTC.
- @returns `{ where: string; values: unknown[]; }`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/appointments/appointments.repository.ts

Busca un turno sin revelar datos fuera del servicio autorizado.

[Abrir fuente](../src/modules/appointments/appointments.repository.ts)

| Exportación        | Responsabilidad                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| findAppointment    | Busca un turno sin revelar datos fuera del servicio autorizado.                                                  |
| listAppointments   | Lista mediante condiciones SQL construidas exclusivamente en el repositorio de filtros, nunca desde input libre. |
| quoteServices      | Obtiene precios activos para todos los servicios de una cotización.                                              |
| overlapping        | Intervalos que intersectan una ventana. Reservas canceladas no ocupan capacidad.                                 |
| insertAppointment  | Contrato de tipos o reexportación; consultar la fuente enlazada.                                                 |
| insertItems        | Contrato de tipos o reexportación; consultar la fuente enlazada.                                                 |
| recordCancellation | Contrato de tipos o reexportación; consultar la fuente enlazada.                                                 |
| setEmployee        | Contrato de tipos o reexportación; consultar la fuente enlazada.                                                 |
| setStatus          | Contrato de tipos o reexportación; consultar la fuente enlazada.                                                 |
| readItems          | Lee servicios históricos.                                                                                        |

### findAppointment

```ts
export async function findAppointment(id: string, executor?: Executor, lock = false);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
- @returns `Promise<Appointment | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### listAppointments

```ts
export async function listAppointments(
  filter: string,
  values: unknown[],
  page: number,
  limit: number,
  order: 'ASC' | 'DESC' | 'NEWEST' = 'DESC',
);
```

- @param filter - Predicados cerrados construidos por el repositorio de filtros.
- @param values - Valores del formulario o parámetros que se serializan para la operación.
- @param page - Número de página desde uno.
- @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
- @param order - Orden permitido ASC o DESC; nunca se acepta SQL libre.
- @returns `Promise<{ items: Appointment[]; total: number; page: number; limit: number; }>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### quoteServices

```ts
export function quoteServices(ids: string[], typeId: string, executor?: Executor);
```

- @param ids - Identificadores de servicios seleccionados, únicos y validados.
- @param typeId - Tipo de vehículo para resolver su tarifa vigente.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<QuoteItem[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### overlapping

```ts
export function overlapping(
  start: string,
  end: string,
  excludeId: string | undefined,
  executor?: Executor,
);
```

- @param start - Inicio UTC en formato SQL; extremo incluido.
- @param end - Fin UTC en formato SQL; extremo excluido.
- @param excludeId - Turno que debe excluirse al comprobar una reasignación o cambio de estado.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<BookingIntervalRow[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### readItems

```ts
export function readItems(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/appointments/appointments.routes.ts

Turnos con controles adicionales de propiedad/asignación dentro de cada servicio.

[Abrir fuente](../src/modules/appointments/appointments.routes.ts)

| Exportación              | Responsabilidad                                                                   |
| ------------------------ | --------------------------------------------------------------------------------- |
| createAppointmentsRoutes | Turnos con controles adicionales de propiedad/asignación dentro de cada servicio. |
| createAvailabilityRoutes | Disponibilidad usa el mismo cálculo que la creación transaccional.                |

### createAppointmentsRoutes

```ts
export function createAppointmentsRoutes();
```

- @returns `import("express-serve-static-core").Router`.

### createAvailabilityRoutes

```ts
export function createAvailabilityRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### listAppointments

```ts
export async function listAppointments(
  actor: Actor,
  input: z.infer<typeof appointmentQuerySchema>,
);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns Promesa de un objeto con items, total, page, limit.

### getAppointment

```ts
export async function getAppointment(actor: Actor, id: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @returns Promesa de un objeto con services, notes, totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate.

### addNote

```ts
export async function addNote(actor: Actor, id: string, body: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param body - Carga validada de la operación de escritura.
- @returns `Promise<{ created: boolean; }>`.

### receipt

```ts
export async function receipt(actor: Actor, id: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @returns Promesa de un objeto con receiptNumber, issuedAt, fiscalInvoice, services, notes, totalCents, paidCents, currencyCode, id, status.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

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

### insertAppointment

```ts
export async function insertAppointment(
  v: {
    clientId: string | null;
    vehicleId: string | null;
    vehicleTypeId: string;
    startsAt: string;
    endsAt: string;
    createdById: string;
    currencyCode: string;
  },
  executor: Executor,
);
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertItems

```ts
export async function insertItems(id: string, items: QuoteItem[], executor: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param items - Renglones tipados que conservan precio, nombre y duración del contrato.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### setStatus

```ts
export async function setStatus(
  id: string,
  status: AppointmentStatus,
  actorId: string,
  executor: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param status - Estado solicitado; el servicio comprueba si la transición está permitida.
- @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### setEmployee

```ts
export function setEmployee(id: string, employeeId: string, executor: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param employeeId - Empleado activo que se asigna o consulta.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### recordCancellation

```ts
export function recordCancellation(
  id: string,
  actorId: string,
  reason: string,
  executor: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
- @param reason - Motivo de cancelación conservado en el historial.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/appointments/attachVehicle.service.ts

Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda.

[Abrir fuente](../src/modules/appointments/attachVehicle.service.ts)

| Exportación   | Responsabilidad                                                                       |
| ------------- | ------------------------------------------------------------------------------------- |
| attachVehicle | Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda. |

### attachVehicle

```ts
export function attachVehicle(actor: Actor, id: string, input: Attachment);
```

- @param actor Cliente titular autenticado; Administración y empleados solo consultan los datos.
- @param id Identificador del turno.
- @param input Identificador de un vehículo propio o sus datos para crearlo.
- @returns Identificador vinculado, incluso ante un reintento del mismo formulario.

## src/modules/appointments/availability.reason.ts

Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado.

[Abrir fuente](../src/modules/appointments/availability.reason.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| unavailableReason | Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado. |

### unavailableReason

```ts
export function unavailableReason(
  window: { open: number; close: number } | null,
  durationMinutes: number,
  slots: string[],
  now = Date.now(),
);
```

- @param window Horario UTC del día; null si el negocio no abre.
- @param durationMinutes Duración total de los servicios seleccionados.
- @param slots Inicios válidos calculados con capacidad y fecha actuales.
- @param now Reloj inyectable para probar bordes sin depender del horario del test.
- @returns Motivo público de indisponibilidad o null si hay opciones.

## src/modules/appointments/availability.service.ts

Genera opciones de inicio respetando duración completa, capacidad y vehículo.

[Abrir fuente](../src/modules/appointments/availability.service.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| availability | Genera opciones de inicio respetando duración completa, capacidad y vehículo. |

### availability

```ts
export async function availability(current: Actor, input: z.infer<typeof availabilitySchema>);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ items: import("./appointments.types.js").QuoteItem[]; totalCents: number; durationMinutes: number; slots: string[]; currencyCode: string; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/appointments/booking.service.ts

Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda.

[Abrir fuente](../src/modules/appointments/booking.service.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| createAppointment | Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda. |

### createAppointment

```ts
export async function createAppointment(actor: Actor, input: BookingInput);
```

- @param actor - Cuenta autenticada; un cliente solo puede reservar para sí mismo.
- @param input - Categoría o vehículo, servicios y hora; vehículo opcional hasta después de confirmar.
- @returns Turno confirmado automáticamente para la agenda compartida con precios y duraciones recalculados por el servidor.
- @throws AppError Si falta configuración, el titular no corresponde o el horario se ocupó.
- @remarks El lock de settings serializa reservas, asignaciones y cambios de configuración.

## src/modules/appointments/bookingQuote.service.ts

Cotiza desde el tipo seleccionado o desde un vehículo ya registrado.

[Abrir fuente](../src/modules/appointments/bookingQuote.service.ts)

| Exportación | Responsabilidad                                                      |
| ----------- | -------------------------------------------------------------------- |
| quote       | Cotiza desde el tipo seleccionado o desde un vehículo ya registrado. |

### quote

```ts
export async function quote(actor: Actor, target: QuoteTarget, executor?: Executor);
```

- @param actor Actor que puede usar solo sus vehículos salvo una reserva asistida.
- @param target Referencia exclusiva de vehículo o tipo, más servicios solicitados.
- @param executor Conexión de reserva para leer el catálogo dentro de la transacción.
- @returns Renglones y totales calculados, categoría reservada y vehículo opcional.

## src/modules/appointments/bookingSlot.service.ts

Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.

[Abrir fuente](../src/modules/appointments/bookingSlot.service.ts)

| Exportación       | Responsabilidad                                                                       |
| ----------------- | ------------------------------------------------------------------------------------- |
| canBookSlot       | Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.        |
| assertBookingSlot | Revalida horario y ocupación dentro de la transacción que mantiene el lock de agenda. |

### canBookSlot

```ts
export function canBookSlot(
  start: number,
  end: number,
  capacity: number,
  intervals: Interval[],
  vehicleId: string | null,
);
```

- @param start - Hora de inicio UTC, única entre las reservas no canceladas.
- @param end - Fin UTC, excluido del intervalo.
- @param capacity - Máximo de lavados en paralelo con inicios distintos.
- @param intervals - Reservas que podrían cruzarse con el intervalo.
- @param vehicleId - Vehículo a reservar, sin superposiciones propias.
- @returns Si la hora de inicio está libre y el lavado completo cabe.

### assertBookingSlot

```ts
export async function assertBookingSlot(
  startsAt: string,
  duration: number,
  vehicleId: string | null,
  settings: Settings,
  connection: Executor,
);
```

- @param startsAt - Inicio ISO con zona explícita, convertido a UTC antes de comparar.
- @param duration - Duración completa del lavado en minutos.
- @param vehicleId - Identificador del vehículo cuyo titular y disponibilidad se verifican.
- @param settings - Configuración operativa vigente del negocio.
- @param connection - Conexión de la transacción que conserva los bloqueos de esta operación.
- @returns `Promise<{ start: number; end: number; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/appointments/cancellation.repository.ts

Aviso propio pendiente de lectura; el motivo proviene del turno cancelado.

[Abrir fuente](../src/modules/appointments/cancellation.repository.ts)

| Exportación             | Responsabilidad                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| CancellationNotice      | Aviso propio pendiente de lectura; el motivo proviene del turno cancelado.                    |
| readCancellationNotices | Consulta los avisos propios sin duplicar motivos ni depender del almacenamiento del teléfono. |
| markCancellationRead    | Marca un aviso propio como leído; repetirlo conserva la primera confirmación.                 |

### readCancellationNotices

```ts
export function readCancellationNotices(userId: string);
```

- @param userId Cliente autenticado, nunca elegido desde parámetros públicos.
- @returns Hasta diez cancelaciones del equipo pendientes de lectura, más recientes primero.

### markCancellationRead

```ts
export function markCancellationRead(id: string, userId: string);
```

- @param id Turno cancelado cuya propiedad ya comprobó el servicio.
- @param userId Titular autenticado del turno.
- @returns Resultado de la escritura persistente, sin borrar el motivo ni el historial.

## src/modules/appointments/cancellation.routes.ts

Registra antes de /:id los avisos del cliente y su confirmación de lectura.

[Abrir fuente](../src/modules/appointments/cancellation.routes.ts)

| Exportación             | Responsabilidad                                                             |
| ----------------------- | --------------------------------------------------------------------------- |
| mountCancellationRoutes | Registra antes de /:id los avisos del cliente y su confirmación de lectura. |

### mountCancellationRoutes

```ts
export function mountCancellationRoutes(router: Router);
```

- @param router Router de turnos con autenticación ya aplicada.
- @returns No retorna datos; agrega rutas limitadas al cliente autenticado.

## src/modules/appointments/cancellation.service.ts

Guarda el motivo validado dentro de la misma transacción del cambio de estado.

[Abrir fuente](../src/modules/appointments/cancellation.service.ts)

| Exportación             | Responsabilidad                                                                |
| ----------------------- | ------------------------------------------------------------------------------ |
| saveCancellation        | Guarda el motivo validado dentro de la misma transacción del cambio de estado. |
| cancellationNotices     | Proyecta los avisos del cliente con fechas UTC del contrato REST.              |
| acknowledgeCancellation | Confirma lectura sin permitir acceder a avisos de otro cliente.                |

### saveCancellation

```ts
export function saveCancellation(
  id: string,
  actorId: string,
  reason: string,
  executor: Executor,
);
```

- @param id Turno bloqueado por la operación de cancelación.
- @param actorId Autor obtenido de la sesión autenticada.
- @param reason Motivo obligatorio; se normalizan espacios antes de guardarlo.
- @param executor Conexión de la transacción que conserva estado, autor e historial.
- @returns Resultado de persistir la cancelación; un rechazo revierte la transacción completa.

### cancellationNotices

```ts
export async function cancellationNotices(actor: Actor);
```

- @param actor Cliente autenticado por la ruta protegida.
- @returns Avisos pendientes que sobreviven al cierre de sesión o cambio de dispositivo.

### acknowledgeCancellation

```ts
export async function acknowledgeCancellation(actor: Actor, id: string);
```

- @param actor Cliente autenticado que confirma haber leído el aviso.
- @param id Identificador validado del turno cancelado.
- @returns Confirmación idempotente; conserva motivo, notas e historial del turno.

## src/modules/appointments/clientEmployee.routes.ts

Monta limpieza visual privada y cierre cobrado con permisos distintos.

[Abrir fuente](../src/modules/appointments/clientEmployee.routes.ts)

| Exportación               | Responsabilidad                                                        |
| ------------------------- | ---------------------------------------------------------------------- |
| mountClientEmployeeRoutes | Monta limpieza visual privada y cierre cobrado con permisos distintos. |

### mountClientEmployeeRoutes

```ts
export function mountClientEmployeeRoutes(router: Router);
```

- @param router Router de turnos con autenticación instalada.
- @returns void.

## src/modules/appointments/homeClear.service.ts

Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros.

[Abrir fuente](../src/modules/appointments/homeClear.service.ts)

| Exportación     | Responsabilidad                                                                |
| --------------- | ------------------------------------------------------------------------------ |
| clearClientHome | Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros. |

### clearClientHome

```ts
export function clearClientHome(actor: Actor);
```

- @param actor Cliente autenticado, nunca elegido en el cuerpo de la petición.
- @returns Cantidad ocultada; repetir la acción no modifica el historial.

## src/modules/appointments/intervals.ts

Convierte filas SQL UTC al formato único del cálculo de capacidad.

[Abrir fuente](../src/modules/appointments/intervals.ts)

| Exportación      | Responsabilidad                                                    |
| ---------------- | ------------------------------------------------------------------ |
| bookingIntervals | Convierte filas SQL UTC al formato único del cálculo de capacidad. |

### bookingIntervals

```ts
export function bookingIntervals(bookings: BookingIntervalRow[]): Interval[];
```

- @param bookings - Reservas existentes que participan en el cálculo de ocupación.
- @returns `Interval[]`.

## src/modules/appointments/mutation.service.ts

Cambia estado con permisos, horario de finalización, plazo de cancelación y bloqueo de agenda.

[Abrir fuente](../src/modules/appointments/mutation.service.ts)

| Exportación    | Responsabilidad                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------- |
| changeStatus   | Cambia estado con permisos, horario de finalización, plazo de cancelación y bloqueo de agenda. |
| assignEmployee | Asigna/reasigna sin cambiar estado; confirmar es una acción administrativa separada.           |

### changeStatus

```ts
export async function changeStatus(
  actor: Actor,
  id: string,
  status: AppointmentStatus,
  reason = '',
);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param status - Estado solicitado; el servicio comprueba si la transición está permitida.
- @param reason - Motivo de cancelación conservado en el historial.
- @returns `Promise<{ updated: boolean; status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### assignEmployee

```ts
export async function assignEmployee(actor: Actor, id: string, employeeId: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param employeeId - Empleado activo que se asigna o consulta.
- @returns `Promise<{ assigned: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/appointments/notes.repository.ts

Lee notas atribuidas a su autor, después de autorizar el turno en service.

[Abrir fuente](../src/modules/appointments/notes.repository.ts)

| Exportación | Responsabilidad                                                            |
| ----------- | -------------------------------------------------------------------------- |
| readNotes   | Lee notas atribuidas a su autor, después de autorizar el turno en service. |
| insertNote  | Persiste una observación; el autor proviene de la sesión autenticada.      |

### readNotes

```ts
export function readNotes(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertNote

```ts
export function insertNote(id: string, authorId: string, body: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param authorId - Identificador del autor conservado en el historial.
- @param body - Carga validada de la operación de escritura.
- @returns `Promise<import("mysql2").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/appointments/paidFinish.service.ts

Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables.

[Abrir fuente](../src/modules/appointments/paidFinish.service.ts)

| Exportación    | Responsabilidad                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| finishPaidWash | Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables. |

### finishPaidWash

```ts
export function finishPaidWash(actor: Actor, id: string, description: string);
```

- @param actor Empleado activo con permiso de cobros; el administrador no se suplanta como revisor.
- @param id Turno propio del responsable.
- @param description Descripción validada del trabajo efectivamente realizado.
- @returns Estado finalizado; el reintento del mismo cierre no duplica parte ni historial.

## src/modules/appointments/responsibility.repository.ts

Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación.

[Abrir fuente](../src/modules/appointments/responsibility.repository.ts)

| Exportación             | Responsabilidad                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| assignAvailableEmployee | Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación. |

### assignAvailableEmployee

```ts
export async function assignAvailableEmployee(
  id: string,
  startsAt: string,
  endsAt: string,
  connection: Executor,
);
```

- @param id - Turno confirmado al que se intenta asignar un responsable.
- @param startsAt - Inicio del contrato, en UTC y formato SQL.
- @param endsAt - Fin exclusivo del contrato, en UTC y formato SQL.
- @param connection - Conexión de la reserva que ya mantiene el bloqueo común de agenda.
- @returns Promesa sin valor; si nadie está libre el turno sigue confirmado y visible en la agenda compartida.

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

### utcMillis

```ts
export function utcMillis(value: string);
```

- @param value - DATETIME SQL o valor temporal leído del driver; se interpreta como UTC.
- @returns Instante en milisegundos desde Unix, sin aplicar la zona del servidor.

### sqlTime

```ts
export function sqlTime(milliseconds: number);
```

- @param milliseconds - Instante UTC en milisegundos desde Unix epoch.
- @returns `string`.

### isoTime

```ts
export function isoTime(value: string);
```

- @param value - Valor temporal interno opcional leído del driver SQL.
- @returns Instante ISO 8601 con zona UTC o NULL cuando no existe un valor válido.

### businessWindow

```ts
export function businessWindow(date: string, settings: Settings, hours: BusinessHour[]);
```

- @param date - Fecha de calendario en formato AAAA-MM-DD.
- @param settings - Configuración operativa vigente del negocio.
- @param hours - Días y horarios de atención en la zona del negocio.
- @returns `{ open: number; close: number; } | null`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### assertCompletionTime

```ts
export function assertCompletionTime(settings: Settings, hours: BusinessHour[]);
```

- @param settings Configuración con la zona horaria del lavadero.
- @param hours Horarios de atención por día de la semana.
- @returns void cuando la hora del servidor está entre apertura incluida y cierre excluido.
- @throws AppError Fuera de horario o en un día cerrado.

### canFit

```ts
export function canFit(
  start: number,
  end: number,
  capacity: number,
  intervals: Interval[],
  employeeId?: string | null,
  vehicleId?: string | null,
);
```

- @param start Inicio UTC en milisegundos, incluido.
- @param end Fin UTC en milisegundos, excluido.
- @param capacity Máximo de vehículos concurrentes.
- @param intervals Intervalos activos contra los que se compara la propuesta.
- @param employeeId Empleado que no puede superponerse consigo mismo; opcional.
- @param vehicleId Vehículo que no puede ocupar dos turnos simultáneos; opcional.
- @returns true si no supera capacidad ni comparte vehículo/empleado durante el intervalo.
- @remarks Los finales se procesan antes que los inicios empatados; turnos contiguos no se superponen.

### assertWorkingTime

```ts
export function assertWorkingTime(
  start: number,
  end: number,
  settings: Settings,
  hours: BusinessHour[],
);
```

- @param start - Inicio UTC en milisegundos; extremo incluido.
- @param end - Fin UTC en milisegundos; extremo excluido.
- @param settings - Configuración operativa vigente del negocio.
- @param hours - Días y horarios de atención en la zona del negocio.
- @returns `void`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/appointments/teamCapacity.ts

Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado.

[Abrir fuente](../src/modules/appointments/teamCapacity.ts)

| Exportación        | Responsabilidad                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------- |
| assertTeamCapacity | Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado. |

### assertTeamCapacity

```ts
export async function assertTeamCapacity(
  appointment: Appointment,
  capacity: number,
  connection: Executor,
);
```

- @param appointment Turno bloqueado por el llamador bajo el lock común de agenda.
- @param capacity Cantidad de autos que el negocio admite simultáneamente.
- @param connection Transacción que serializa reservas y cambios de estado.
- @returns Promesa vacía si la capacidad continúa disponible.
- @throws AppError Si reactivar un turno excedería la capacidad o duplicaría el vehículo.

## src/modules/appointments/transitions.ts

Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service.

[Abrir fuente](../src/modules/appointments/transitions.ts)

| Exportación      | Responsabilidad                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| assertTransition | Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service. |

### assertTransition

```ts
export function assertTransition(from: AppointmentStatus, to: AppointmentStatus, role: Role);
```

- @param from - Límite inicial del período o estado de origen, según su tipo.
- @param to - Límite final o estado destino, según su tipo.
- @param role - Rol permitido del catálogo de seguridad.
- @returns `void`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/appointments/vehicleDetail.service.ts

El titular agrega observaciones al turno confirmado, sin cambiar lo contratado.

[Abrir fuente](../src/modules/appointments/vehicleDetail.service.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| saveVehicleDetail | El titular agrega observaciones al turno confirmado, sin cambiar lo contratado. |

### saveVehicleDetail

```ts
export async function saveVehicleDetail(actor: Actor, id: string, description: string);
```

- @param actor - Titular autenticado; id y description identifican la descripción del turno.
- @param id - Turno cuya titularidad se comprueba antes de guardar.
- @param description - Descripción validada del vehículo para esta visita; queda ligada al turno.
- @returns Confirmación del guardado.

## src/modules/appointments/walkIn.repository.ts

Busca un reintento para no duplicar un ingreso al reenviar la solicitud.

[Abrir fuente](../src/modules/appointments/walkIn.repository.ts)

| Exportación       | Responsabilidad                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| previousArrival   | Busca un reintento para no duplicar un ingreso al reenviar la solicitud.         |
| registeredArrival | Resuelve patente registrada sin crear ni modificar el garaje.                    |
| hasActiveArrival  | Evita registrar dos veces un auto que ya espera atención o está siendo lavado.   |
| saveArrival       | Persiste datos presenciales y observaciones junto al turno, conservando autoría. |

### previousArrival

```ts
export async function previousArrival(requestId: string, connection: Executor);
```

- @param requestId Clave UUID del formulario.
- @param connection Transacción con bloqueo de agenda.
- @returns Turno existente o undefined.

### registeredArrival

```ts
export async function registeredArrival(plate: string, connection: Executor);
```

- @param plate Patente normalizada.
- @param connection Conexión bloqueada de agenda.
- @returns Identidad del vehículo y titular activo, si existen.

### hasActiveArrival

```ts
export async function hasActiveArrival(
  plate: string,
  from: string,
  to: string,
  connection: Executor,
);
```

- @param plate Patente observada en el local.
- @param connection Conexión con bloqueo de agenda.
- @param from - Inicio UTC incluido de la ventana consultada.
- @param to - Fin UTC excluido de la ventana consultada.
- @returns Si existe un turno activo del mismo auto para hoy o en proceso.

### saveArrival

```ts
export async function saveArrival(
  id: string,
  input: z.infer<typeof walkInSchema>,
  actorId: string,
  connection: Executor,
);
```

- @param id Turno recién insertado.
- @param input Datos validados sin cuenta ni garaje obligatorios.
- @param actorId Administrador que observó el ingreso.
- @param connection Transacción de la reserva.
- @returns Promesa resuelta al guardar todos los datos.

## src/modules/appointments/walkIn.routes.ts

Monta el alta presencial antes de las rutas con parámetro id.

[Abrir fuente](../src/modules/appointments/walkIn.routes.ts)

| Exportación       | Responsabilidad                                               |
| ----------------- | ------------------------------------------------------------- |
| mountWalkInRoutes | Monta el alta presencial antes de las rutas con parámetro id. |

### mountWalkInRoutes

```ts
export function mountWalkInRoutes(router: Router);
```

- @param router Router de turnos ya autenticado.
- @returns void.

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

### createWalkIn

```ts
export function createWalkIn(actor: Actor, input: z.infer<typeof walkInSchema>);
```

- @param actor Administrador autenticado por la ruta.
- @param input Datos mínimos del ingreso presencial.
- @returns Turno confirmado, o el mismo turno ante un reintento de su UUID.

## src/modules/appointments/walkIn.slot.ts

Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes.

[Abrir fuente](../src/modules/appointments/walkIn.slot.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| walkInSlot  | Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes. |

### walkInSlot

```ts
export async function walkInSlot(
  duration: number,
  settings: Settings,
  vehicleId: string | null,
  connection: Executor,
);
```

- @param duration Minutos completos de los servicios.
- @param settings Configuración vigente bloqueada por la transacción.
- @param vehicleId Identidad de un auto registrado, opcional.
- @param connection Transacción del ingreso.
- @returns Inicio y fin UTC SQL y límites del día para comprobar duplicados.

## src/modules/appointments/wash.repository.ts

El parte guarda el responsable real, su declaración y la decisión administrativa.

[Abrir fuente](../src/modules/appointments/wash.repository.ts)

| Exportación           | Responsabilidad                                                                      |
| --------------------- | ------------------------------------------------------------------------------------ |
| WashSubmission        | El parte guarda el responsable real, su declaración y la decisión administrativa.    |
| latestWash            | Lee el último intento. Las devoluciones anteriores quedan en el historial SQL.       |
| submitWash            | Crea un parte inmutable bajo el mismo bloqueo que el estado del turno.               |
| recordReview          | Registra quién revisó un parte y cuándo, conservando descripción y autor originales. |
| markEmployeeCompleted | Identifica el cierre directo del empleado sin fingir una revisión administrativa.    |

### latestWash

```ts
export async function latestWash(id: string, executor?: Executor);
```

- @param id - Turno cuyo último parte se consulta.
- @param executor - Conexión opcional; permite leer bajo el bloqueo de la operación actual.
- @returns Último parte con decisión y devolución asociada si existen.

### submitWash

```ts
export function submitWash(
  id: string,
  employeeId: string,
  description: string,
  executor: Executor,
);
```

- @param id - Turno en proceso al que pertenece el parte.
- @param employeeId - Cuenta responsable cuyo nombre se conserva junto al trabajo.
- @param description - Declaración del trabajo realizado; no reemplaza partes anteriores.
- @param executor - Conexión transaccional que mantiene el bloqueo del turno.
- @returns Resultado SQL de la inserción.

### recordReview

```ts
export function recordReview(
  submissionId: string,
  reviewerId: string,
  decision: 'approved' | 'returned',
  note: string | undefined,
  executor: Executor,
);
```

- @param submissionId - Identificador exacto del parte aún sin decisión.
- @param reviewerId - Administrador que registra la revisión.
- @param decision - Aprobación o devolución del parte seleccionado.
- @param note - Explicación opcional de la revisión; se guarda como NULL si falta.
- @param executor - Conexión de la misma transacción que cambia el estado del turno.
- @returns Resultado SQL del cambio de revisión.

### markEmployeeCompleted

```ts
export function markEmployeeCompleted(id: number, executor: Executor);
```

- @param id Parte recién insertado por la misma operación de cierre.
- @param executor Conexión que conserva los bloqueos de agenda y turno.
- @returns Resultado SQL; la escritura se confirma junto al cambio de estado del turno.

## src/modules/appointments/wash.service.ts

Flujo de revisión conservado para compatibilidad; el cierre actual del empleado usa paidFinish.service.

[Abrir fuente](../src/modules/appointments/wash.service.ts)

| Exportación       | Responsabilidad                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| sendWashForReview | Flujo de revisión conservado para compatibilidad; el cierre actual del empleado usa paidFinish.service. |
| reviewWash        | Valida el parte exacto inspeccionado; una revisión desactualizada no decide un parte nuevo.             |
| presentWash       | El cliente ve el parte aprobado; el equipo también ve envíos y correcciones internas.                   |

### sendWashForReview

```ts
export function sendWashForReview(actor: Actor, id: string, description: string);
```

- @param actor - Empleado autenticado que debe ser responsable del turno.
- @param id - Turno en proceso que se bloquea y valida antes de emitir el parte.
- @param description - Descripción del trabajo físico que se conserva en el parte.
- @returns Estado que espera revisión.

### reviewWash

```ts
export function reviewWash(actor: Actor, id: string, input: z.infer<typeof reviewSchema>);
```

- @param actor - Administrador autenticado que registra la decisión.
- @param id - Turno en revisión; se bloquea para evitar decisiones concurrentes.
- @param input - Identificador del parte, decisión y nota validados; rechaza revisiones desactualizadas.
- @returns Estado resultante de la revisión.

### presentWash

```ts
export async function presentWash(actor: Actor, id: string);
```

- @param actor - Identidad que limita los campos del parte a mostrar.
- @param id - Turno previamente autorizado por el servicio que llama a este presentador.
- @returns Parte proyectado o null cuando aún no es visible.

## src/modules/appointments/work.routes.ts

Cambios del auto, envío del responsable y decisión exclusiva de Administración.

[Abrir fuente](../src/modules/appointments/work.routes.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| mountWorkRoutes | Cambios del auto, envío del responsable y decisión exclusiva de Administración. |

### mountWorkRoutes

```ts
export function mountWorkRoutes(router: Router);
```

- @param router - Router de turnos, con autenticación ya instalada.
- @returns Registra rutas en el router recibido.

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

### readAttendance

```ts
export function readAttendance(date: string, currentDay: boolean);
```

- @param date - Fecha local del negocio en formato YYYY-MM-DD.
- @param currentDay - Incluye empleados activos aún sin fichaje solo cuando se consulta hoy.
- @returns Filas del plantel y de la asistencia.

### insertArrival

```ts
export function insertArrival(
  date: string,
  employeeId: string,
  adminId: string,
  executor: Executor,
);
```

- @param date - Día local del negocio validado por el servicio.
- @param employeeId - Empleado activo cuya llegada se registra.
- @param adminId - Administrador que observó y registra la llegada.
- @param executor - Conexión de la transacción; el primer fichaje del día prevalece.
- @returns Resultado SQL del fichaje.

## src/modules/attendance/attendance.routes.ts

Solamente Administración puede leer y registrar la asistencia del equipo.

[Abrir fuente](../src/modules/attendance/attendance.routes.ts)

| Exportación            | Responsabilidad                                                           |
| ---------------------- | ------------------------------------------------------------------------- |
| createAttendanceRoutes | Solamente Administración puede leer y registrar la asistencia del equipo. |

### createAttendanceRoutes

```ts
export function createAttendanceRoutes();
```

- @returns Router protegido de fichajes.

## src/modules/attendance/attendance.service.ts

Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.

[Abrir fuente](../src/modules/attendance/attendance.service.ts)

| Exportación   | Responsabilidad                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| getAttendance | Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.          |
| recordArrival | Ficha una llegada observada por Administración con el reloj del servidor y el día del negocio. |

### getAttendance

```ts
export async function getAttendance(requestedDate?: string);
```

- @param requestedDate - Fecha local opcional; por defecto se consulta hoy.
- @returns Fecha de consulta, día actual y llegadas.

### recordArrival

```ts
export function recordArrival(admin: Actor, employeeId: string, expectedDate: string);
```

- @param admin - Administrador autenticado que registra la llegada observada.
- @param employeeId - Cuenta de empleado que debe seguir activa.
- @param expectedDate - Día mostrado por la pantalla; debe coincidir con hoy según el servidor.
- @returns Confirmación del registro y fecha.

## src/modules/attendance/attendance.window.ts

Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador.

[Abrir fuente](../src/modules/attendance/attendance.window.ts)

| Exportación      | Responsabilidad                                                                    |
| ---------------- | ---------------------------------------------------------------------------------- |
| attendanceWindow | Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador. |

### attendanceWindow

```ts
export function attendanceWindow(settings: Settings, hours: BusinessHour[]);
```

- @param settings Zona del negocio y configuración de agenda.
- @param hours Días laborales y horas locales vigentes.
- @returns Fecha oficial, permiso y explicación para la pantalla administrativa.

## src/modules/auth/auth.controller.ts

Registra cuenta pública sin permisos elegibles.

[Abrir fuente](../src/modules/auth/auth.controller.ts)

| Exportación | Responsabilidad                                 |
| ----------- | ----------------------------------------------- |
| register    | Registra cuenta pública sin permisos elegibles. |
| login       | Inicia sesión email/contraseña.                 |
| refresh     | Renueva sesión mediante rotación de refresh.    |
| logout      | Revoca la sesión del dispositivo.               |

### register

```ts
export function register(request: Request);
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.

### login

```ts
export function login(request: Request);
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.

### refresh

```ts
export function refresh(request: Request);
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.

### logout

```ts
export function logout(request: Request);
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @returns `Promise<{ loggedOut: boolean; }>`.

## src/modules/auth/auth.routes.ts

Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes.

[Abrir fuente](../src/modules/auth/auth.routes.ts)

| Exportación      | Responsabilidad                                                                         |
| ---------------- | --------------------------------------------------------------------------------------- |
| createAuthRoutes | Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes. |

### createAuthRoutes

```ts
export function createAuthRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### register

```ts
export async function register(input: z.infer<typeof registerSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; sessionId: string; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### login

```ts
export async function login(input: z.infer<typeof loginSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; sessionId: string; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/auth/auth.types.ts

Devuelve solo el contrato de sesión; el ID interno de rotación no se publica.

[Abrir fuente](../src/modules/auth/auth.types.ts)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| presentSession | Devuelve solo el contrato de sesión; el ID interno de rotación no se publica. |

### presentSession

```ts
export function presentSession(session: Awaited<ReturnType<typeof createSession>>);
```

- @param session - Sesión del backend en memoria, o null para cerrar el acceso local.
- @returns `{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }`.

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

### providers

```ts
export async function providers();
```

- @returns `Promise<{ provider: string; enabled: boolean; }[]>`.

### authorize

```ts
export async function authorize(r: Request, s: Response);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @param s - Respuesta HTTP usada para emitir la redirección del flujo.
- @returns `Promise<void>`.

### start

```ts
export async function start(r: Request);
```

- @param r Petición con state, retorno y desafío PKCE validados.
- @returns URL HTTPS de un proveedor configurado en el servidor.

### callback

```ts
export async function callback(r: Request, s: Response);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @param s - Respuesta HTTP usada para emitir la redirección del flujo.
- @returns `Promise<void>`.

### exchange

```ts
export function exchange(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.

## src/modules/auth/oauth.exchange.service.ts

Canjea un grant de un solo uso con PKCE y confirma la vinculación local cuando corresponde.

[Abrir fuente](../src/modules/auth/oauth.exchange.service.ts)

| Exportación | Responsabilidad                                                                             |
| ----------- | ------------------------------------------------------------------------------------------- |
| exchange    | Canjea un grant de un solo uso con PKCE y confirma la vinculación local cuando corresponde. |

### exchange

```ts
export async function exchange(input: z.infer<typeof oauthExchangeSchema>);
```

- @param input Código efímero, verifier y contraseña opcional de una cuenta local existente.
- @returns Sesión propia del backend, conservando usuario y rol al vincular.
- @throws AppError INVALID_OAUTH_CODE, ACCOUNT_DISABLED, OAUTH_LINK_REQUIRED, INVALID_CREDENTIALS u OAUTH_LINK_LOCKED.
- @remarks El contador de fallos se confirma antes de emitir el error fuera de la transacción.

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

### saveGrant

```ts
export function saveGrant(
  hash: Buffer,
  id: string,
  challenge: string,
  executor: Executor,
  link?: PendingLink,
);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param challenge - Desafío S256 ligado al verifier que conserva el cliente.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @param link - Identidad social candidata, pendiente de comprobar la contraseña local.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### lockGrant

```ts
export async function lockGrant(hash: Buffer, executor: Executor);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<OAuthGrant | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### failedLink

```ts
export function failedLink(hash: Buffer, executor: Executor);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### consumeGrant

```ts
export function consumeGrant(hash: Buffer, executor: Executor);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/auth/oauth.identity.service.ts

Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular.

[Abrir fuente](../src/modules/auth/oauth.identity.service.ts)

| Exportación | Responsabilidad                                                                              |
| ----------- | -------------------------------------------------------------------------------------------- |
| issueGrant  | Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular. |

### issueGrant

```ts
export function issueGrant(provider: Provider, profile: SocialIdentity, state: OAuthState);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param profile - Identidad verificada obtenida directamente del proveedor social.
- @param state - Estado del flujo con sus datos y vencimiento.
- @returns `Promise<string>`.

## src/modules/auth/oauth.repository.ts

Persiste estado opaco con vencimiento corto.

[Abrir fuente](../src/modules/auth/oauth.repository.ts)

| Exportación | Responsabilidad                                                 |
| ----------- | --------------------------------------------------------------- |
| saveState   | Persiste estado opaco con vencimiento corto.                    |
| takeState   | Bloquea/consume estado una vez antes de contactar al proveedor. |
| findSocial  | Busca identidad externa por sujeto estable del proveedor.       |
| linkSocial  | Vincula email verificado a la identidad ya existente.           |

### saveState

```ts
export async function saveState(
  hash: Buffer,
  v: {
    provider: Provider;
    clientState: string;
    redirectUri: string;
    clientChallenge: string;
    providerVerifier: string;
  },
);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### takeState

```ts
export async function takeState(hash: Buffer, executor: Executor);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<OAuthState | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### findSocial

```ts
export async function findSocial(provider: Provider, subject: string, executor: Executor);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param subject - Identificador estable del usuario dentro del proveedor social.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<RowDataPacket | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### linkSocial

```ts
export function linkSocial(
  id: string,
  provider: Provider,
  subject: string,
  executor: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param subject - Identificador estable del usuario dentro del proveedor social.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/auth/oauth.return.ts

Retorna errores públicos únicamente al redirect de un estado ya validado y consumido.

[Abrir fuente](../src/modules/auth/oauth.return.ts)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| oauthErrorReturn | Retorna errores públicos únicamente al redirect de un estado ya validado y consumido. |

### oauthErrorReturn

```ts
export function oauthErrorReturn(
  state: OAuthState,
  error: 'access_denied' | 'provider_unavailable',
);
```

- @param state Estado persistido por authorize, nunca datos directos del callback.
- @param error Código público; no incluye tokens ni detalles del proveedor.
- @returns URL allowlisted con el state original del cliente.

## src/modules/auth/oauth.routes.ts

Inicio, retorno y canje de códigos sociales; todos limitados por origen.

[Abrir fuente](../src/modules/auth/oauth.routes.ts)

| Exportación       | Responsabilidad                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| createOAuthRoutes | Inicio, retorno y canje de códigos sociales; todos limitados por origen. |

### createOAuthRoutes

```ts
export function createOAuthRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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
| exchange      | Contrato de tipos o reexportación; consultar la fuente enlazada.                 |
| pkceChallenge | Contrato de tipos o reexportación; consultar la fuente enlazada.                 |
| listProviders | Metadatos públicos, solo habilitado/deshabilitado por proveedor.                 |
| authorize     | Prepara redirección al proveedor y vincula state/redirect/client PKCE de la app. |
| callback      | Consume callback del proveedor y entrega solamente código efímero al deep link.  |

### listProviders

```ts
export function listProviders();
```

- @returns `{ provider: string; enabled: boolean; }[]`.

### authorize

```ts
export async function authorize(provider: Provider, input: z.infer<typeof authorizeSchema>);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<string>`.

### callback

```ts
export async function callback(
  provider: Provider,
  input: { state: string; code?: string | undefined; error?: string | undefined },
);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<string>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

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

### pkceChallenge

```ts
export function pkceChallenge(verifier: string);
```

- @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
- @returns `string`.

### assertGrantChallenge

```ts
export function assertGrantChallenge(challenge: string | undefined, verifier: string);
```

- @param challenge - Desafío S256 ligado al verifier que conserva el cliente.
- @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
- @returns `void`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/auth/provider.http.ts

Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa.

[Abrir fuente](../src/modules/auth/provider.http.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| fetchJson   | Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa. |

### fetchJson

```ts
export async function fetchJson(url: string, init: RequestInit);
```

- @param url - Dirección que debe superar la validación del consumidor antes de utilizarse.
- @param init - Método, cabeceras y cuerpo definidos por el adaptador del proveedor; no acepta URLs desde el usuario.
- @returns `Promise<Record<string, unknown>>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/auth/provider.profile.ts

Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor.

[Abrir fuente](../src/modules/auth/provider.profile.ts)

| Exportación     | Responsabilidad                                                                   |
| --------------- | --------------------------------------------------------------------------------- |
| providerProfile | Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor. |

### providerProfile

```ts
export function providerProfile(provider: Provider, token: string);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param token - Token recibido; se valida o transforma antes de utilizarlo.
- @returns `Promise<SocialIdentity>`.

## src/modules/auth/provider.service.ts

Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible.

[Abrir fuente](../src/modules/auth/provider.service.ts)

| Exportación      | Responsabilidad                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------ |
| exchangeProvider | Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible. |

### exchangeProvider

```ts
export async function exchangeProvider(provider: Provider, code: string, verifier: string);
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @param code - Código efímero recibido del flujo de autorización.
- @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
- @returns `Promise<import("./oauth.types.js").SocialIdentity>`.

## src/modules/auth/recovery.delivery.ts

Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen.

[Abrir fuente](../src/modules/auth/recovery.delivery.ts)

| Exportación      | Responsabilidad                                                                  |
| ---------------- | -------------------------------------------------------------------------------- |
| dispatchRecovery | Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen. |

### dispatchRecovery

```ts
export async function dispatchRecovery(send: RecoverySender = sendRecoveryMail);
```

- @param send - Transporte sustituible únicamente en pruebas del módulo.
- @returns Verdadero si se reclamó un trabajo, aunque fuera descartado.

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

### sendRecoveryMail

```ts
export async function sendRecoveryMail(email: string, url: string);
```

- @param email - Destinatario ficticio o real capturado en Sandbox, sin entrega externa.
- @param url - Enlace fijo del sitio con token en el fragmento.
- @returns Promesa resuelta solo si Mailtrap acepta el mensaje.

## src/modules/auth/recovery.queue.repository.ts

Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.

[Abrir fuente](../src/modules/auth/recovery.queue.repository.ts)

| Exportación     | Responsabilidad                                                                    |
| --------------- | ---------------------------------------------------------------------------------- |
| enqueueRecovery | Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.  |
| claimRecovery   | Reclama un trabajo con arrendamiento recuperable después de reiniciar el servidor. |
| finishDelivery  | Finaliza o reprograma sin guardar respuestas remotas que puedan contener secretos. |

### enqueueRecovery

```ts
export async function enqueueRecovery(email: string);
```

- @param email - Correo normalizado, tratado siempre del mismo modo.
- @returns Promesa resuelta después de persistir o aplicar el límite silencioso.

### claimRecovery

```ts
export function claimRecovery();
```

- @returns Un trabajo privado o undefined si no hay pendientes.

### finishDelivery

```ts
export async function finishDelivery(id: string, success: boolean);
```

- @param id - ID reclamado por el trabajador.
- @param success - Mailtrap aceptó el mensaje.
- @returns Promesa de persistencia.

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

### findRecovery

```ts
export async function findRecovery(hash: Buffer, executor?: Executor, lock = false);
```

- @param hash - SHA-256 del secreto presentado.
- @param executor - Conexión opcional de la transacción.
- @param lock - Bloquea la fila durante el restablecimiento.
- @returns Trabajo coincidente o undefined.

### lockRecovery

```ts
export async function lockRecovery(id: string, executor: Executor);
```

- @param id - Identificador del trabajo.
- @param executor - Transacción actual.
- @returns Fila bloqueada.

### prepareRecovery

```ts
export async function prepareRecovery(
  job: RecoveryJob,
  userId: string,
  version: number,
  hash: Buffer,
  executor: Executor,
);
```

- @param job - Trabajo reclamado.
- @param userId - Cuenta activa destinataria.
- @param version - Versión actual de autenticación.
- @param hash - Hash irreversible del token.
- @param executor - Transacción actual.
- @returns Promesa de persistencia.

### consumeRecovery

```ts
export async function consumeRecovery(job: RecoveryJob, executor: Executor);
```

- @param job - Token consumido.
- @param executor - Transacción actual.
- @returns Promesa de persistencia.

### discardRecovery

```ts
export async function discardRecovery(id: string, executor?: Executor);
```

- @param id - Trabajo que ya no debe entregarse.
- @param executor - Conexión opcional de transacción.
- @returns Promesa de persistencia.

## src/modules/auth/recovery.routes.ts

Recuperación pública con límites por IP y correo y respuestas no almacenables.

[Abrir fuente](../src/modules/auth/recovery.routes.ts)

| Exportación          | Responsabilidad                                                                |
| -------------------- | ------------------------------------------------------------------------------ |
| createRecoveryRoutes | Recuperación pública con límites por IP y correo y respuestas no almacenables. |

### createRecoveryRoutes

```ts
export function createRecoveryRoutes();
```

- @returns Router sin credenciales ni datos de la cola expuestos.

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

### requestRecovery

```ts
export async function requestRecovery(email: string);
```

- @param email - Correo validado por el esquema estricto.
- @returns Mensaje público genérico y canal de demostración.

### resetPassword

```ts
export async function resetPassword(input: { token: string; newPassword: string });
```

- @param input - Token opaco y nueva contraseña; nunca se registran en logs.
- @returns Confirmación que exige volver a iniciar sesión.

## src/modules/auth/recovery.time.ts

MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor.

[Abrir fuente](../src/modules/auth/recovery.time.ts)

| Exportación     | Responsabilidad                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| recoveryExpired | MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor. |

### recoveryExpired

```ts
export function recoveryExpired(timestamp: string);
```

- @param timestamp - DATETIME de sesión UTC.
- @returns Verdadero ante una fecha inválida o vencida.

## src/modules/auth/recovery.token.ts

Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base.

[Abrir fuente](../src/modules/auth/recovery.token.ts)

| Exportación   | Responsabilidad                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| recoveryToken | Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base. |

### recoveryToken

```ts
export function recoveryToken(job: Pick<RecoveryJob, 'id' | 'nonce'>);
```

- @param job - ID y nonce aleatorio de 256 bits; ambos pertenecen al trabajo privado.
- @returns Token de 256 bits derivado con una clave separada de la firma JWT.

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

### startRecoveryWorker

```ts
export function startRecoveryWorker();
```

- @returns Temporizador cancelable, o undefined si no se configuró Mailtrap.

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

### insertSession

```ts
export async function insertSession(
  userId: string,
  hash: Buffer,
  familyId: string,
  executor?: Executor,
);
```

- @param userId - Identificador interno de cuenta, independiente del subject del proveedor.
- @param hash - Hash del token; evita persistir su valor legible.
- @param familyId - Familia de sesión que agrupa sus renovaciones.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns ID SQL serializado como string; el token legible nunca se escribe en esta tabla.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### lockSession

```ts
export async function lockSession(hash: Buffer, executor: Executor);
```

- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns Fila de sesión bajo bloqueo o undefined si el hash no existe; requiere transacción del llamador.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### revokeFamily

```ts
export async function revokeFamily(familyId: string, executor: Executor);
```

- @param familyId - Familia de sesión que agrupa sus renovaciones.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns Promesa sin valor tras marcar la familia revocada; el llamador debe confirmar la transacción antes de emitir el rechazo.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### rotateSession

```ts
export async function rotateSession(id: string, nextId: string, executor: Executor);
```

- @param id - ID de la sesión refresh consumida.
- @param nextId - ID de su sucesora en la misma familia.
- @param executor - Conexión que mantiene el bloqueo de la sesión consumida.
- @returns Promesa sin valor; conserva la sesión anterior revocada para detectar reutilización.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### isFamilyActive

```ts
export async function isFamilyActive(userId: string, familyId: string);
```

- @param userId - Identificador interno de cuenta, independiente del subject del proveedor.
- @param familyId - Familia de sesión que agrupa sus renovaciones.
- @returns Si queda alguna sesión no revocada y no vencida para esa cuenta y familia.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/auth/session.service.ts

Crea JWT propio y refresh opaco asociado. El caller garantiza cuenta activa.

[Abrir fuente](../src/modules/auth/session.service.ts)

| Exportación    | Responsabilidad                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| createSession  | Crea JWT propio y refresh opaco asociado. El caller garantiza cuenta activa.         |
| refreshSession | Rota un refresh bajo bloqueo y revoca su familia cuando detecta reuso o vencimiento. |
| logoutSession  | Revoca la familia del dispositivo; logout repetido es idempotente.                   |

### createSession

```ts
export async function createSession(
  identity: Identity,
  executor?: Executor,
  familyId: string = randomUUID(),
);
```

- @param identity - Identidad interna; puede contener hash de contraseña y no se serializa completa.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @param familyId - Familia de sesión que agrupa sus renovaciones.
- @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; sessionId: string; }>`.

### refreshSession

```ts
export async function refreshSession(token: string);
```

- @param token Refresh opaco original; solo su hash se consulta en persistencia.
- @returns Nuevo access/refresh de la misma familia después de revocar el anterior.
- @throws AppError INVALID_REFRESH si la sesión ya no es válida.
- @remarks El resultado null permite confirmar la revocación antes de emitir 401.

### logoutSession

```ts
export async function logoutSession(token: string);
```

- @param token - Token recibido; se valida o transforma antes de utilizarlo.
- @returns `Promise<{ loggedOut: boolean; }>`.

## src/modules/auth/token.service.ts

Emite JWT de quince minutos con audiencia e issuer restringidos.

[Abrir fuente](../src/modules/auth/token.service.ts)

| Exportación  | Responsabilidad                                                         |
| ------------ | ----------------------------------------------------------------------- |
| signAccess   | Emite JWT de quince minutos con audiencia e issuer restringidos.        |
| verifyAccess | Verifica firma y tiempo. @throws AppError 401 si expiró o fue alterado. |
| opaqueToken  | Genera tokens criptográficos opacos.                                    |
| tokenHash    | Hash irreversible para persistir tokens revocables.                     |

### signAccess

```ts
export function signAccess(user: Actor, familyId?: string);
```

- @param user - Perfil vigente; nunca incluye una contraseña legible.
- @param familyId - Familia de sesión que agrupa sus renovaciones.
- @returns `Promise<string>`.

### verifyAccess

```ts
export async function verifyAccess(token: string);
```

- @param token - Token recibido; se valida o transforma antes de utilizarlo.
- @returns `Promise<import("jose").JWTPayload>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### opaqueToken

```ts
export function opaqueToken();
```

- @returns `string`.

### tokenHash

```ts
export function tokenHash(token: string);
```

- @param token - Token recibido; se valida o transforma antes de utilizarlo.
- @returns `NonSharedBuffer`.

## src/modules/customerMessages/messages.repository.ts

Bandeja paginada. clientId nulo corresponde únicamente a Administración.

[Abrir fuente](../src/modules/customerMessages/messages.repository.ts)

| Exportación    | Responsabilidad                                                                              |
| -------------- | -------------------------------------------------------------------------------------------- |
| listMessages   | Bandeja paginada. clientId nulo corresponde únicamente a Administración.                     |
| insertMessage  | Persiste el caso con la identidad autenticada y un vínculo al parte aprobado si corresponde. |
| resolveMessage | Resuelve una sola vez; dos administradores no se pisan la respuesta.                         |

### listMessages

```ts
export async function listMessages(
  clientId: string | null,
  state: string | undefined,
  page: number,
  limit: number,
);
```

- @param clientId - Cuenta cuyo buzón se consulta; NULL amplía el alcance y solo lo usa Administración.
- @param state - Filtro open/resolved; undefined incluye ambos estados.
- @param page - Página validada, comenzando en uno.
- @param limit - Cantidad máxima validada de mensajes por página.
- @returns Mensajes y metadatos de paginación.

### insertMessage

```ts
export function insertMessage(
  clientId: string,
  kind: 'complaint' | 'feedback',
  body: string,
  submissionId: string | null,
  executor?: Executor,
);
```

- @param clientId - Cliente autenticado que envía el texto.
- @param kind - Distingue reclamo general de devolución sobre un lavado.
- @param body - Texto validado; se almacena como dato, sin interpretar HTML.
- @param submissionId - Parte finalizado al que se refiere una devolución; NULL en reclamos generales.
- @param executor - Conexión opcional para guardar la devolución bajo el bloqueo del turno.
- @returns Resultado SQL con el identificador generado.

### resolveMessage

```ts
export function resolveMessage(id: string, adminId: string, reply: string);
```

- @param id - Caso abierto que se intenta resolver una sola vez.
- @param adminId - Cuenta administrativa autora de la respuesta.
- @param reply - Respuesta validada que verá el cliente en su bandeja.
- @returns Resultado SQL; cero filas si el caso está cerrado o ausente.

## src/modules/customerMessages/messages.routes.ts

La bandeja está disponible únicamente para clientes y Administración.

[Abrir fuente](../src/modules/customerMessages/messages.routes.ts)

| Exportación         | Responsabilidad                                                       |
| ------------------- | --------------------------------------------------------------------- |
| createMessageRoutes | La bandeja está disponible únicamente para clientes y Administración. |

### createMessageRoutes

```ts
export function createMessageRoutes();
```

- @returns Router autenticado de mensajes y respuestas.

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
| createMessage  | Guarda reclamos generales o una devolución única sobre un lavado ya finalizado. |
| replyToMessage | Guarda la respuesta del administrador, visible para el titular en su bandeja.   |

### getMessages

```ts
export async function getMessages(actor: Actor, query: z.infer<typeof messageQuery>);
```

- @param actor - Identidad autenticada que delimita la bandeja.
- @param query - Estado y paginación validados; no puede ampliar el alcance del cliente.
- @returns Mensajes autorizados y fechas ISO.

### createMessage

```ts
export async function createMessage(actor: Actor, input: z.infer<typeof messageSchema>);
```

- @param actor - Cliente autenticado; el mensaje conserva este autor.
- @param input - Tipo, texto y turno opcional; las devoluciones comprueban titularidad y parte finalizado.
- @returns Identificador del mensaje creado.

### replyToMessage

```ts
export async function replyToMessage(actor: Actor, id: string, reply: string);
```

- @param actor - Administrador autenticado autor de la respuesta.
- @param id - Mensaje abierto que se resuelve con una escritura condicional.
- @param reply - Respuesta validada y visible para el titular del caso.
- @returns Confirmación del cierre.

## src/modules/health/health.controller.ts

Devuelve salud del proceso sin depender de MySQL.

[Abrir fuente](../src/modules/health/health.controller.ts)

| Exportación     | Responsabilidad                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| getHealth       | Devuelve salud del proceso sin depender de MySQL.                                    |
| createReadiness | Construye readiness con dependencia inyectada para verificar fallos reales en tests. |

### createReadiness

```ts
export function createReadiness(check: () => Promise<void>): RequestHandler;
```

- @param check - Operación que comprueba la disponibilidad de infraestructura.
- @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.

## src/modules/health/health.repository.ts

Verifica MySQL sin escribir. @throws Error si MySQL no responde o no está configurado.

[Abrir fuente](../src/modules/health/health.repository.ts)

| Exportación   | Responsabilidad                                                                        |
| ------------- | -------------------------------------------------------------------------------------- |
| checkDatabase | Verifica MySQL sin escribir. @throws Error si MySQL no responde o no está configurado. |

### checkDatabase

```ts
export async function checkDatabase(): Promise<void>;
```

- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/health/health.routes.ts

Expone sondas públicas sin incluir datos sensibles.

[Abrir fuente](../src/modules/health/health.routes.ts)

| Exportación        | Responsabilidad                                     |
| ------------------ | --------------------------------------------------- |
| createHealthRoutes | Expone sondas públicas sin incluir datos sensibles. |

### createHealthRoutes

```ts
export function createHealthRoutes(check: () => Promise<void>);
```

- @param check - Operación que comprueba la disponibilidad de infraestructura.
- @returns `import("express-serve-static-core").Router`.

## src/modules/health/information.routes.ts

Publica el aviso de uso de datos necesario para la configuración de identidad.

[Abrir fuente](../src/modules/health/information.routes.ts)

| Exportación             | Responsabilidad                                                                |
| ----------------------- | ------------------------------------------------------------------------------ |
| createInformationRoutes | Publica el aviso de uso de datos necesario para la configuración de identidad. |

### createInformationRoutes

```ts
export function createInformationRoutes();
```

- @returns `import("express-serve-static-core").Router`.

## src/modules/payments/payments.controller.ts

Cobros del turno autorizado.

[Abrir fuente](../src/modules/payments/payments.controller.ts)

| Exportación | Responsabilidad                |
| ----------- | ------------------------------ |
| list        | Cobros del turno autorizado.   |
| create      | Registro idempotente de cobro. |

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ recorded: boolean; replayed: boolean; id?: never; } | { recorded: boolean; id: string; replayed: boolean; }>`.

## src/modules/payments/payments.repository.ts

Lista cobros del turno sin datos de autenticación.

[Abrir fuente](../src/modules/payments/payments.repository.ts)

| Exportación   | Responsabilidad                                          |
| ------------- | -------------------------------------------------------- |
| listPayments  | Lista cobros del turno sin datos de autenticación.       |
| findPayment   | Busca un reintento de cobro por clave global.            |
| insertPayment | Inserta cobro bajo lock del turno; service valida saldo. |

### listPayments

```ts
export function listPayments(id: string, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### findPayment

```ts
export async function findPayment(key: string, executor: Executor);
```

- @param key - Clave estable del recurso o estado que se actualiza.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<import("mysql2").RowDataPacket | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertPayment

```ts
export async function insertPayment(
  id: string,
  actorId: string,
  v: {
    amountCents: number;
    method: string;
    reference?: string | null | undefined;
    idempotencyKey: string;
  },
  executor: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/payments/payments.routes.ts

Rutas anidadas que conservan appointment id por mergeParams.

[Abrir fuente](../src/modules/payments/payments.routes.ts)

| Exportación          | Responsabilidad                                              |
| -------------------- | ------------------------------------------------------------ |
| createPaymentsRoutes | Rutas anidadas que conservan appointment id por mergeParams. |

### createPaymentsRoutes

```ts
export function createPaymentsRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### getPayments

```ts
export async function getPayments(actor: Actor, id: string);
```

- @param actor - Actor autenticado por el middleware; determina rol y propiedad.
- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.

### recordPayment

```ts
export async function recordPayment(
  actor: Actor,
  id: string,
  input: z.infer<typeof paymentSchema>,
);
```

- @param actor Administrador o empleado del equipo con canRecordPayments vigente.
- @param id Turno cuyo saldo se bloquea antes de insertar.
- @param input Centavos, medio, referencia y clave de idempotencia de la misma intención.
- @returns replayed true para un reintento idéntico; una alta nueva incluye id.
- @throws AppError PAYMENT_PERMISSION, PAYMENT_STATE, OVERPAYMENT o IDEMPOTENCY_CONFLICT.

## src/modules/reports/reportAggregation.ts

Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas.

[Abrir fuente](../src/modules/reports/reportAggregation.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| aggregateReport | Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas. |

### aggregateReport

```ts
export function aggregateReport(
  range: ReportRange,
  work: RowDataPacket[],
  payments: RowDataPacket[],
);
```

- @param range - Período UTC calculado desde el calendario del negocio.
- @param work - Lavados completados del período usados para agregar actividad.
- @param payments - Cobros registrados en el período, expresados en centavos.
- @returns `{ days: Map<string, Day>; employees: Map<string, Employee>; }`.

## src/modules/reports/reportWeeks.ts

Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales.

[Abrir fuente](../src/modules/reports/reportWeeks.ts)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| reportWeeks | Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales. |

### reportWeeks

```ts
export function reportWeeks(days: Day[]);
```

- @param days Días del período ya contabilizados en la zona del negocio.
- @returns Semanas de lunes a domingo recortadas al período solicitado, sin duplicar ingresos.

## src/modules/reports/reports.controller.ts

Reporte administrativo.

[Abrir fuente](../src/modules/reports/reports.controller.ts)

| Exportación | Responsabilidad             |
| ----------- | --------------------------- |
| business    | Reporte administrativo.     |
| personal    | Resumen propio de empleado. |

### business

```ts
export function business(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con period, from, to, currencyCode, totalWashes, revenueCents, days, services, employees.

### personal

```ts
export function personal(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ date: string; completed: number; pending: number; }>`.

## src/modules/reports/reports.repository.ts

Trabajos finalizados en el intervalo UTC derivado del calendario local.

[Abrir fuente](../src/modules/reports/reports.repository.ts)

| Exportación     | Responsabilidad                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| completedWork   | Trabajos finalizados en el intervalo UTC derivado del calendario local.              |
| revenue         | Ingresos contabilizados por momento real del pago, sin multiplicarlos por servicios. |
| popularServices | Servicios contratados por fecha de atención, excluyendo cancelados.                  |
| employeeSummary | Cuenta la jornada compartida por estado y fecha, sin revelar ingresos del negocio.   |

### completedWork

```ts
export function completedWork(from: string, to: string);
```

- @param from - Límite inicial del período o estado de origen, según su tipo.
- @param to - Límite final o estado destino, según su tipo.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### revenue

```ts
export function revenue(from: string, to: string);
```

- @param from - Límite inicial del período o estado de origen, según su tipo.
- @param to - Límite final o estado destino, según su tipo.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### popularServices

```ts
export function popularServices(from: string, to: string);
```

- @param from - Límite inicial del período o estado de origen, según su tipo.
- @param to - Límite final o estado destino, según su tipo.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### employeeSummary

```ts
export function employeeSummary(from: string, to: string);
```

- @param from - Límite inicial del período o estado de origen, según su tipo.
- @param to - Límite final o estado destino, según su tipo.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/reports/reports.routes.ts

Reportes de ingresos solo admin; resumen de jornada solo empleado.

[Abrir fuente](../src/modules/reports/reports.routes.ts)

| Exportación         | Responsabilidad                                                    |
| ------------------- | ------------------------------------------------------------------ |
| createReportsRoutes | Reportes de ingresos solo admin; resumen de jornada solo empleado. |

### createReportsRoutes

```ts
export function createReportsRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### businessReport

```ts
export async function businessReport(input: z.infer<typeof reportSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns Promesa de un objeto con period, from, to, currencyCode, totalWashes, revenueCents, days, services, employees.

### personalReport

```ts
export async function personalReport(_id: string, input: z.infer<typeof reportSchema>);
```

- @param _id Identidad autenticada conservada por compatibilidad; no restringe la jornada compartida.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ date: string; completed: number; pending: number; }>`.

## src/modules/reports/reports.window.ts

Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio.

[Abrir fuente](../src/modules/reports/reports.window.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| reportWindow | Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio. |
| ReportRange  | Ventana de calendario común al resumen personal y al reporte del negocio.     |

### reportWindow

```ts
export async function reportWindow(input: z.infer<typeof reportSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns Promesa de un objeto con settings, start, end, from, to.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/services/catalogRules.ts

El lavado de moto y el catálogo de los demás vehículos no se mezclan.

[Abrir fuente](../src/modules/services/catalogRules.ts)

| Exportación         | Responsabilidad                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| supportsService     | El lavado de moto y el catálogo de los demás vehículos no se mezclan.          |
| assertWashSelection | Protege la cotización y la reserva de combinaciones que no ofrece el catálogo. |

### supportsService

```ts
export function supportsService(typeCode: string, serviceCode: string);
```

- @param typeCode Código de la categoría que se quiere cotizar.
- @param serviceCode Código estable del servicio.
- @returns Si el servicio pertenece al catálogo de esa categoría.

### assertWashSelection

```ts
export function assertWashSelection(codes: string[]);
```

- @param codes Códigos de los renglones que seleccionó el cliente.
- @returns Cuando hay como máximo un lavado base y los extras son compatibles.
- @throws AppError Si se combinan dos bases o se pide cera sin exterior.

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

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }[]>`.

### get

```ts
export function get(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.

### edit

```ts
export function edit(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.

### remove

```ts
export function remove(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ deleted: boolean; }>`.

### price

```ts
export function price(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ updated: boolean; }>`.

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

### listServices

```ts
export function listServices(includeInactive: boolean);
```

- @param includeInactive - Incluye inactivos únicamente en la consulta que lo permite.
- @returns `Promise<Service[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### findService

```ts
export async function findService(id: string, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<Service | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### listPrices

```ts
export function listPrices();
```

- @returns `Promise<RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertService

```ts
export async function insertService(v: {
  code: string;
  name: string;
  description: string;
  durationMinutes: number;
  isActive: boolean;
});
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateService

```ts
export async function updateService(
  id: string,
  v: {
    code: string;
    name: string;
    description: string;
    durationMinutes: number;
    isActive: boolean;
  },
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### removeService

```ts
export function removeService(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### savePrice

```ts
export function savePrice(id: string, typeId: string, cents: number, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param typeId - Tipo de vehículo para resolver su tarifa vigente.
- @param cents - Importe entero en centavos ARS.
- @param executor - Transacción del tipo de vehículo si se guardan varias tarifas juntas.
- @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/services/services.routes.ts

Catálogo autenticado y escritura administrativa.

[Abrir fuente](../src/modules/services/services.routes.ts)

| Exportación          | Responsabilidad                                  |
| -------------------- | ------------------------------------------------ |
| createServicesRoutes | Catálogo autenticado y escritura administrativa. |

### createServicesRoutes

```ts
export function createServicesRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### catalog

```ts
export async function catalog(admin: boolean);
```

- @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }[]>`.

### createService

```ts
export async function createService(input: z.infer<typeof serviceSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.

### editService

```ts
export async function editService(id: string, input: z.infer<typeof servicePatchSchema>);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### deleteService

```ts
export async function deleteService(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<{ deleted: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### setPrice

```ts
export async function setPrice(id: string, typeId: string, cents: number);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param typeId - Tipo de vehículo para resolver su tarifa vigente.
- @param cents - Importe entero en centavos ARS.
- @returns `Promise<{ updated: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### getService

```ts
export async function getService(id: string, admin: boolean);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
- @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/settings/settings.controller.ts

Consulta configuración del negocio.

[Abrir fuente](../src/modules/settings/settings.controller.ts)

| Exportación | Responsabilidad                               |
| ----------- | --------------------------------------------- |
| get         | Consulta configuración del negocio.           |
| save        | Guarda configuración administrativa validada. |

### get

```ts
export function get();
```

- @returns Promesa de un objeto con hours, currencyCode, timeZone, cancellationNoticeMinutes, simultaneousCapacity, slotStepMinutes, constructor.

### save

```ts
export function save(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns Promesa de un objeto con hours, currencyCode, timeZone, cancellationNoticeMinutes, simultaneousCapacity, slotStepMinutes, constructor.

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

### readSettings

```ts
export async function readSettings(executor?: Executor, lock = false);
```

- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
- @returns `Promise<Settings | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### readHours

```ts
export function readHours(executor?: Executor);
```

- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<BusinessHour[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateSettings

```ts
export async function updateSettings(
  input: {
    timeZone: string;
    cancellationNoticeMinutes: number;
    simultaneousCapacity: number;
    slotStepMinutes: number;
  },
  executor: Executor,
);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateHours

```ts
export async function updateHours(
  hours: { weekday: number; opensAt: string; closesAt: string }[],
  executor: Executor,
);
```

- @param hours - Días y horarios de atención en la zona del negocio.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/settings/settings.routes.ts

Todos pueden conocer horarios; solo admin puede editarlos.

[Abrir fuente](../src/modules/settings/settings.routes.ts)

| Exportación          | Responsabilidad                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------ |
| createSettingsRoutes | Todos pueden conocer horarios; solo admin puede editarlos.                                 |
| createBusinessRoutes | Horarios y política de cancelación legibles por todos, fuera de las rutas administrativas. |

### createSettingsRoutes

```ts
export function createSettingsRoutes();
```

- @returns `import("express-serve-static-core").Router`.

### createBusinessRoutes

```ts
export function createBusinessRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### getSettings

```ts
export async function getSettings();
```

- @returns `Promise<{ hours: repo.BusinessHour[]; currencyCode: string; timeZone: string; cancellationNoticeMinutes: number; simultaneousCapacity: number; slotStepMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### saveSettings

```ts
export async function saveSettings(input: z.infer<typeof settingsSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ hours: repo.BusinessHour[]; currencyCode: string; timeZone: string; cancellationNoticeMinutes: number; simultaneousCapacity: number; slotStepMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.

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

### lockAdminGuard

```ts
export async function lockAdminGuard(executor: Executor);
```

- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### countActiveAdmins

```ts
export async function countActiveAdmins(executor: Executor);
```

- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<number>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### setRole

```ts
export async function setRole(id: string, role: Role, executor: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param role - Rol permitido del catálogo de seguridad.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### setAccount

```ts
export async function setAccount(
  id: string,
  email: string,
  active: boolean,
  canPay: boolean,
  deleted: boolean,
  executor: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param email - Correo normalizado utilizado para localizar la identidad.
- @param active - Estado de activación lógica del recurso.
- @param canPay - Permiso vigente para ofrecer el registro de cobros.
- @param deleted - Solicita baja lógica además de desactivar la cuenta.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### setPassword

```ts
export async function setPassword(id: string, hash: string, executor: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param hash - Hash del token; evita persistir su valor legible.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/users/admin.service.ts

Impide autoexclusión y pérdida del último admin bajo lock común.

[Abrir fuente](../src/modules/users/admin.service.ts)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| changeRole  | Impide autoexclusión y pérdida del último admin bajo lock común.               |
| editAccount | Edita/desactiva o elimina lógicamente preservando invariantes administrativas. |

### changeRole

```ts
export async function changeRole(current: Actor, id: string, role: Role);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param role - Rol permitido del catálogo de seguridad.
- @returns `Promise<import("../../types/domain.js").User>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### editAccount

```ts
export async function editAccount(
  current: Actor,
  id: string,
  input: z.infer<typeof adminPatchSchema>,
  deleted = false,
);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param input - Entrada validada por el esquema del caso de uso.
- @param deleted - Solicita baja lógica además de desactivar la cuenta.
- @returns `Promise<{ updated: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

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

### me

```ts
export function me(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("../../types/domain.js").User>`.

### editMe

```ts
export function editMe(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("../../types/domain.js").User>`.

### password

```ts
export function password(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ passwordChanged: boolean; requiresLogin: boolean; }>`.

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ items: import("../../types/domain.js").User[]; total: number; page: number; limit: number; }>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("../../types/domain.js").User>`.

### get

```ts
export function get(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("../../types/domain.js").User>`.

### edit

```ts
export function edit(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ updated: boolean; }>`.

### role

```ts
export function role(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("../../types/domain.js").User>`.

### remove

```ts
export function remove(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ updated: boolean; }>`.

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

### findUser

```ts
export async function findUser(id: string, executor?: Executor, lock = false);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
- @returns `Promise<Identity | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### findByEmail

```ts
export async function findByEmail(email: string, executor?: Executor);
```

- @param email - Correo normalizado utilizado para localizar la identidad.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<Identity | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertUser

```ts
export async function insertUser(
  input: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string | null | undefined;
  },
  hash: string | null,
  role: Role,
  executor?: Executor,
);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @param hash - Hash del token; evita persistir su valor legible.
- @param role - Rol permitido del catálogo de seguridad.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### listUsers

```ts
export async function listUsers(
  search: string,
  role: string | undefined,
  page: number,
  limit: number,
);
```

- @param search - Texto de búsqueda que se envía como parámetro SQL.
- @param role - Rol permitido del catálogo de seguridad.
- @param page - Número de página desde uno.
- @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
- @returns `Promise<{ items: Identity[]; total: number; page: number; limit: number; }>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateProfile

```ts
export async function updateProfile(
  id: string,
  input: {
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarUrl: string | null;
  },
  executor?: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param input - Entrada validada por el esquema del caso de uso.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### revokeUserSessions

```ts
export async function revokeUserSessions(id: string, executor: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/users/users.routes.ts

Perfil para todos; gestión de cuentas exclusivamente administrativa.

[Abrir fuente](../src/modules/users/users.routes.ts)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| createUsersRoutes | Perfil para todos; gestión de cuentas exclusivamente administrativa. |

### createUsersRoutes

```ts
export function createUsersRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### getProfile

```ts
export async function getProfile(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<import("../../types/domain.js").User>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### updateOwnProfile

```ts
export async function updateOwnProfile(current: Actor, input: z.infer<typeof profileSchema>);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<import("../../types/domain.js").User>`.

### createUser

```ts
export async function createUser(input: z.infer<typeof createUserSchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<import("../../types/domain.js").User>`.

### listUsers

```ts
export async function listUsers(input: z.infer<typeof usersQuerySchema>);
```

- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ items: import("../../types/domain.js").User[]; total: number; page: number; limit: number; }>`.

### changePassword

```ts
export async function changePassword(
  current: Actor,
  input: z.infer<typeof passwordChangeSchema>,
);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<{ passwordChanged: boolean; requiresLogin: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/modules/users/users.types.ts

Registro interno de identidad. passwordHash nunca se serializa.

[Abrir fuente](../src/modules/users/users.types.ts)

| Exportación | Responsabilidad                                                          |
| ----------- | ------------------------------------------------------------------------ |
| Identity    | Registro interno de identidad. passwordHash nunca se serializa.          |
| publicUser  | Convierte el registro privado en un perfil público de campos explícitos. |

### publicUser

```ts
export function publicUser(row: Identity): User;
```

- @param row - Fila de persistencia que se proyecta al dominio o a la respuesta pública.
- @returns `User`.

## src/modules/vehicleTypes/vehicleTypes.controller.ts

Catálogo de tipos.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.controller.ts)

| Exportación | Responsabilidad         |
| ----------- | ----------------------- |
| list        | Catálogo de tipos.      |
| create      | Alta administrativa.    |
| edit        | Edición administrativa. |
| remove      | Baja administrativa.    |

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ isActive: boolean; constructor: { name: "RowDataPacket"; }; }[]>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.

### edit

```ts
export function edit(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.

### remove

```ts
export function remove(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ deleted: boolean; }>`.

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

### findType

```ts
export async function findType(id: string, executor?: Executor);
```

- @param id Identificador del tipo.
- @param executor Conexión de la operación que necesita una lectura consistente.
- @returns Tipo, si existe.

### listTypes

```ts
export function listTypes(admin: boolean);
```

- @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
- @returns `Promise<import("mysql2").RowDataPacket[]>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertType

```ts
export async function insertType(
  v: { code: string; name: string; isActive: boolean },
  executor?: Executor,
);
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Transacción de categoría y tarifas.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateType

```ts
export function updateType(
  id: string,
  v: { code: string; name: string; isActive: boolean },
  executor?: Executor,
);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Transacción de categoría y tarifas.
- @returns `Promise<import("mysql2").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### deactivateType

```ts
export function deactivateType(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<import("mysql2").ResultSetHeader>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/vehicleTypes/vehicleTypes.routes.ts

Tipos visibles para todos, administrables solo por admin.

[Abrir fuente](../src/modules/vehicleTypes/vehicleTypes.routes.ts)

| Exportación              | Responsabilidad                                           |
| ------------------------ | --------------------------------------------------------- |
| createVehicleTypesRoutes | Tipos visibles para todos, administrables solo por admin. |

### createVehicleTypesRoutes

```ts
export function createVehicleTypesRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

### listTypes

```ts
export async function listTypes(admin: boolean);
```

- @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
- @returns `Promise<{ isActive: boolean; constructor: { name: "RowDataPacket"; }; }[]>`.

### createType

```ts
export function createType({ prices, ...type }: VehicleTypeInput);
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.

### editType

```ts
export function editType(id: string, { prices, ...type }: VehicleTypeInput);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### deleteType

```ts
export async function deleteType(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<{ deleted: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

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

### list

```ts
export function list(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ items: import("./vehicles.repository.js").Vehicle[]; page: number; limit: number; total: number; }>`.

### get

```ts
export function get(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("./vehicles.repository.js").Vehicle>`.

### create

```ts
export function create(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("./vehicles.repository.js").Vehicle>`.

### edit

```ts
export function edit(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<import("./vehicles.repository.js").Vehicle>`.

### remove

```ts
export function remove(r: Request);
```

- @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
- @returns `Promise<{ deleted: boolean; }>`.

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

### findVehicle

```ts
export async function findVehicle(id: string, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<Vehicle | undefined>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### listVehicles

```ts
export async function listVehicles(
  ownerId: string | undefined,
  page: number,
  limit: number,
  search: string,
);
```

- @param ownerId - Titular del vehículo, comprobado contra actor y reserva.
- @param page - Número de página desde uno.
- @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
- @param search - Texto de búsqueda que se envía como parámetro SQL.
- @returns `Promise<{ items: Vehicle[]; page: number; limit: number; total: number; }>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### insertVehicle

```ts
export async function insertVehicle(
  v: Pick<Vehicle, 'ownerId' | 'vehicleTypeId' | 'plate' | 'brand' | 'model' | 'color'>,
  executor?: Executor,
);
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Conexión de la reserva cuando se vincula en la misma transacción.
- @returns `Promise<string>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### updateVehicle

```ts
export async function updateVehicle(id: string, v: Vehicle, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<void>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### removeVehicle

```ts
export async function removeVehicle(id: string, executor?: Executor);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<boolean>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

### isVehicleTypeActive

```ts
export async function isVehicleTypeActive(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<boolean>`.
- @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.

## src/modules/vehicles/vehicles.routes.ts

Vehículos: clientes propietarios y administración; empleados excluidos.

[Abrir fuente](../src/modules/vehicles/vehicles.routes.ts)

| Exportación          | Responsabilidad                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| createVehiclesRoutes | Vehículos: clientes propietarios y administración; empleados excluidos. |

### createVehiclesRoutes

```ts
export function createVehiclesRoutes();
```

- @returns `import("express-serve-static-core").Router`.

## src/modules/vehicles/vehicles.schema.ts

Filtros validados; el servicio ignora ownerId para actores que no son administradores.

[Abrir fuente](../src/modules/vehicles/vehicles.schema.ts)

| Exportación        | Responsabilidad                                                                        |
| ------------------ | -------------------------------------------------------------------------------------- |
| vehicleQuerySchema | Filtros validados; el servicio ignora ownerId para actores que no son administradores. |
| vehicleSchema      | Formulario de vehículo: el cliente no puede seleccionar un dueño ajeno.                |
| vehiclePatchSchema | Edición parcial, siempre validada como vehículo completo al combinarse en el servicio. |

## src/modules/vehicles/vehicles.service.ts

Delimita el listado por identidad antes de consultar SQL.

[Abrir fuente](../src/modules/vehicles/vehicles.service.ts)

| Exportación   | Responsabilidad                                                              |
| ------------- | ---------------------------------------------------------------------------- |
| listVehicles  | Delimita el listado por identidad antes de consultar SQL.                    |
| getVehicle    | Accede solo a un vehículo propio o administrado; oculta recursos ajenos.     |
| createVehicle | Crea vehículo y asigna al cliente autenticado, salvo gestión administrativa. |
| editVehicle   | Edita los campos permitidos y valida el resultado completo.                  |
| deleteVehicle | Rechaza baja de vehículos con trabajos aún pendientes.                       |

### listVehicles

```ts
export function listVehicles(current: Actor, query: z.infer<typeof vehicleQuerySchema>);
```

- @param current Cuenta autenticada; solo Administración puede filtrar otro titular.
- @param query Búsqueda, paginación y titular opcional ya validados por Zod.
- @returns Página de vehículos visibles; ownerId nunca amplía el alcance de un cliente.

### getVehicle

```ts
export async function getVehicle(current: Actor, id: string, executor?: Executor);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<repository.Vehicle>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### createVehicle

```ts
export async function createVehicle(current: Actor, input: z.infer<typeof vehicleSchema>);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<repository.Vehicle>`.

### editVehicle

```ts
export async function editVehicle(
  current: Actor,
  id: string,
  input: z.infer<typeof vehiclePatchSchema>,
);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param id - Identificador del recurso dentro del proyecto actual.
- @param input - Entrada validada por el esquema del caso de uso.
- @returns `Promise<repository.Vehicle>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### deleteVehicle

```ts
export async function deleteVehicle(current: Actor, id: string);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param id - Identificador del recurso dentro del proyecto actual.
- @returns `Promise<{ deleted: boolean; }>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/routes.ts

Compone módulos autónomos bajo /api/v1 sin lógica de negocio.

[Abrir fuente](../src/routes.ts)

| Exportación     | Responsabilidad                                               |
| --------------- | ------------------------------------------------------------- |
| createApiRoutes | Compone módulos autónomos bajo /api/v1 sin lógica de negocio. |

### createApiRoutes

```ts
export function createApiRoutes();
```

- @returns `import("express-serve-static-core").Router`.

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

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/types/express.d.ts)

## src/utils/db.ts

Ejecutor SQL utilizado exclusivamente por repositories e infraestructura.

[Abrir fuente](../src/utils/db.ts)

| Exportación | Responsabilidad                                                                            |
| ----------- | ------------------------------------------------------------------------------------------ |
| Executor    | Ejecutor SQL utilizado exclusivamente por repositories e infraestructura.                  |
| db          | Obtiene infraestructura configurada. @throws AppError 503 cuando falta la base.            |
| rows        | Consulta parametrizada con filas tipadas. @throws Error del driver, manejado centralmente. |
| execute     | Escritura parametrizada. Nunca interpolar valores de usuarios dentro de sql.               |

### db

```ts
export function db(): Pool;
```

- @returns `Pool`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### rows

```ts
export async function rows<T extends RowDataPacket>(
  sql: string,
  values: unknown[] = [],
  executor: Executor = db(),
): Promise<T[]>;
```

- @param sql - Plantilla SQL; los valores del usuario van exclusivamente en placeholders.
- @param values - Valores del formulario o parámetros que se serializan para la operación.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<T[]>`.

### execute

```ts
export async function execute(sql: string, values: unknown[] = [], executor: Executor = db());
```

- @param sql - Plantilla SQL; los valores del usuario van exclusivamente en placeholders.
- @param values - Valores del formulario o parámetros que se serializan para la operación.
- @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
- @returns `Promise<ResultSetHeader>`.

## src/utils/http.ts

Adapta un controller async al sobre REST estándar.

[Abrir fuente](../src/utils/http.ts)

| Exportación | Responsabilidad                                                       |
| ----------- | --------------------------------------------------------------------- |
| endpoint    | Adapta un controller async al sobre REST estándar.                    |
| actor       | Extrae actor autenticado. @throws AppError 401 si falta sesión.       |
| paramId     | Valida un identificador decimal positivo sin perder precisión BIGINT. |

### endpoint

```ts
export function endpoint(
  handler: (request: Request) => Promise<unknown>,
  status = 200,
): RequestHandler;
```

- @param handler - Controlador que devuelve datos o rechaza con un error del caso de uso.
- @param status - Estado solicitado; el servicio comprueba si la transición está permitida.
- @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.

### actor

```ts
export function actor(request: Request): Actor;
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @returns `Actor`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

### paramId

```ts
export function paramId(request: Request, name = 'id'): string;
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @param name - Nombre del campo o etiqueta según el contrato declarado.
- @returns `string`.

## src/utils/pagination.ts

Paginación limitada y búsqueda opcional para listas administrativas.

[Abrir fuente](../src/utils/pagination.ts)

| Exportación      | Responsabilidad                                                      |
| ---------------- | -------------------------------------------------------------------- |
| paginationSchema | Paginación limitada y búsqueda opcional para listas administrativas. |
| pageResult       | Construye metadatos de una lista.                                    |

### pageResult

```ts
export function pageResult<T>(items: T[], total: number, page: number, limit: number);
```

- @param items - Renglones tipados que conservan precio, nombre y duración del contrato.
- @param total - Cantidad total de registros, independiente del tamaño de página.
- @param page - Número de página desde uno.
- @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
- @returns `{ items: T[]; total: number; page: number; limit: number; }`.

## src/utils/password.ts

Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar.

[Abrir fuente](../src/utils/password.ts)

| Exportación     | Responsabilidad                                                   |
| --------------- | ----------------------------------------------------------------- |
| passwordSchema  | Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar. |
| hashPassword    | Hashea con costo 12.                                              |
| comparePassword | Compara sin exponer el hash al frontend.                          |

### hashPassword

```ts
export function hashPassword(password: string): Promise<string>;
```

- @param password - Contraseña validada de entre 12 caracteres y 72 bytes UTF-8.
- @returns Hash bcrypt; nunca contraseña legible.

### comparePassword

```ts
export function comparePassword(password: string, hash: string): Promise<boolean>;
```

- @param password - Contraseña de la cuenta, usada solo para comprobar su propiedad.
- @param hash - Hash bcrypt almacenado de la cuenta que se autentica.
- @returns `Promise<boolean>`.

## src/utils/transaction.ts

Ejecuta el caso de uso en una conexión y siempre libera el recurso.

[Abrir fuente](../src/utils/transaction.ts)

| Exportación | Responsabilidad                                                     |
| ----------- | ------------------------------------------------------------------- |
| transaction | Ejecuta el caso de uso en una conexión y siempre libera el recurso. |

### transaction

```ts
export async function transaction<T>(
  operation: (connection: PoolConnection) => Promise<T>,
): Promise<T>;
```

- @param operation Trabajo cuyas escrituras deben reutilizar la conexión recibida.
- @returns Resultado de operation después del commit.
- @throws Error Conserva el fallo de la operación o del driver después del rollback.

## database/inTransaction.ts

Confirma DML exitoso o revierte ante fallos. No usar para DDL MySQL.

[Abrir fuente](../database/inTransaction.ts)

| Exportación   | Responsabilidad                                                      |
| ------------- | -------------------------------------------------------------------- |
| inTransaction | Confirma DML exitoso o revierte ante fallos. No usar para DDL MySQL. |

### inTransaction

```ts
export async function inTransaction(connection: PoolConnection, task: () => Promise<void>);
```

- @param connection - Conexión prestada; el llamador sigue siendo responsable de liberarla.
- @param task - Escrituras DML que comparten esta conexión; no usar DDL con commit implícito.
- @returns Promesa sin valor después del commit; ante error hace rollback y propaga el fallo.

## database/migrate.ts

Aplica archivos ordenados. DDL MySQL hace commit implícito y no permite rollback general.

[Abrir fuente](../database/migrate.ts)

## database/migration.repository.ts

Serializa migraciones por base para evitar dos arranques modificando el esquema a la vez.

[Abrir fuente](../database/migration.repository.ts)

| Exportación          | Responsabilidad                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------- |
| lockMigrations       | Serializa migraciones por base para evitar dos arranques modificando el esquema a la vez. |
| ensureMigrationTable | Crea el registro de migraciones, independiente de las tablas de negocio.                  |
| applyMigration       | Ejecuta una migración nueva o comprueba que su contenido no cambió tras aplicarla.        |

### lockMigrations

```ts
export async function lockMigrations(connection: PoolConnection): Promise<string>;
```

- @param connection - Conexión del migrador; el lock queda ligado a esta sesión SQL.
- @returns Clave del lock obtenido, necesaria para RELEASE_LOCK al terminar.

### ensureMigrationTable

```ts
export async function ensureMigrationTable(connection: PoolConnection): Promise<void>;
```

- @param connection - Conexión del migrador protegida por el lock de esquema.
- @returns Promesa sin valor cuando el registro de checksums está disponible; el DDL puede hacer commit implícito.

### applyMigration

```ts
export async function applyMigration(connection: PoolConnection, name: string, sql: string);
```

- @param connection - Conexión que conserva el lock del migrador.
- @param name - Nombre ordenable del archivo SQL; identifica la versión aplicada.
- @param sql - Contenido original inmutable; se valida su checksum antes de adaptar el dialecto.
- @returns Promesa sin valor tras verificar una versión existente o registrar la nueva; un DDL parcial exige revisión manual.

## database/migrationChecksum.ts

Usa LF para que el SQL nuevo se ejecute y registre igual en Windows y Linux.

[Abrir fuente](../database/migrationChecksum.ts)

| Exportación              | Responsabilidad                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| canonicalSql             | Usa LF para que el SQL nuevo se ejecute y registre igual en Windows y Linux.                 |
| migrationChecksum        | Calcula la identidad canónica de una migración nueva.                                        |
| matchesMigrationChecksum | Conserva compatibilidad con registros históricos calculados con CRLF, sin aceptar ediciones. |

### canonicalSql

```ts
export function canonicalSql(sql: string): string;
```

- @param sql - Contenido del archivo de migración versionado.
- @returns SQL con saltos LF; no cambia ningún otro carácter.

### migrationChecksum

```ts
export function migrationChecksum(sql: string): string;
```

- @param sql - Contenido del archivo de migración versionado.
- @returns SHA-256 hexadecimal del SQL con saltos LF.

### matchesMigrationChecksum

```ts
export function matchesMigrationChecksum(sql: string, expected: string): boolean;
```

- @param sql - SQL actual, que debe conservar exactamente el contenido histórico.
- @param expected - Checksum almacenado al aplicar la migración.
- @returns Verdadero solo si coincide la representación LF o la histórica CRLF del mismo SQL.

## database/requireDatabase.ts

Obtiene el pool configurado. @throws Error si falta DATABASE_URL.

[Abrir fuente](../database/requireDatabase.ts)

| Exportación     | Responsabilidad                                                   |
| --------------- | ----------------------------------------------------------------- |
| requireDatabase | Obtiene el pool configurado. @throws Error si falta DATABASE_URL. |

### requireDatabase

```ts
export function requireDatabase();
```

- @returns Pool configurado con la conexión y TLS del entorno; falla si DATABASE_URL no está definido.

## database/retireLegacyViews.ts

Solo alias de la transición; nunca elimina tablas ni filas de negocio.

[Abrir fuente](../database/retireLegacyViews.ts)

## database/runWithDatabase.ts

Presta conexión a una tarea y cierra el pool incluso si falla la adquisición.

[Abrir fuente](../database/runWithDatabase.ts)

| Exportación     | Responsabilidad                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| runWithDatabase | Presta conexión a una tarea y cierra el pool incluso si falla la adquisición. |

### runWithDatabase

```ts
export async function runWithDatabase(task: (connection: PoolConnection) => Promise<void>);
```

- @param task - Operación de migración o semilla que usa la conexión prestada, sin conservarla después.
- @returns Promesa sin valor; siempre libera la conexión y cierra el pool del comando.

## database/seed.ts

Inserta catálogos, configuración y administrador sin sobrescribir registros existentes.

[Abrir fuente](../database/seed.ts)

## database/seeds/seedAdmin.repository.ts

Crea solo el administrador inicial. Nunca promueve cuentas existentes ni resetea claves.

[Abrir fuente](../database/seeds/seedAdmin.repository.ts)

| Exportación | Responsabilidad                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| seedAdmin   | Crea solo el administrador inicial. Nunca promueve cuentas existentes ni resetea claves. |

### seedAdmin

```ts
export async function seedAdmin(connection: PoolConnection, email: string, password: string);
```

- @param connection - Conexión de las semillas en la base de instalación.
- @param email - Correo del administrador inicial, validado desde SEED_ADMIN_EMAIL.
- @param password - Contraseña inicial validada; solo se guarda su hash y no reemplaza la existente.
- @returns Promesa sin valor; crea la cuenta inicial si falta y conserva cuentas ya existentes.

## database/seeds/seedConfig.ts

Lee configuración semilla validada.

[Abrir fuente](../database/seeds/seedConfig.ts)

| Exportación    | Responsabilidad                     |
| -------------- | ----------------------------------- |
| readSeedConfig | Lee configuración semilla validada. |

### readSeedConfig

```ts
export function readSeedConfig();
```

- @returns Configuración tipada de administrador y negocio.
- @throws ZodError si las variables no cumplen los límites documentados.

## database/seeds/seedSchema.ts

Esquema de datos iniciales; valida límites de bcrypt y valores de agenda.

[Abrir fuente](../database/seeds/seedSchema.ts)

| Exportación | Responsabilidad                                                           |
| ----------- | ------------------------------------------------------------------------- |
| seedSchema  | Esquema de datos iniciales; valida límites de bcrypt y valores de agenda. |

## database/seeds/seedSettings.repository.ts

Inserta configuración inicial sin sobrescribir cambios posteriores del administrador.

[Abrir fuente](../database/seeds/seedSettings.repository.ts)

| Exportación  | Responsabilidad                                                                       |
| ------------ | ------------------------------------------------------------------------------------- |
| seedSettings | Inserta configuración inicial sin sobrescribir cambios posteriores del administrador. |

### seedSettings

```ts
export async function seedSettings(
  connection: PoolConnection,
  config: ReturnType<typeof readSeedConfig>,
);
```

- @param connection - Conexión de la instalación inicial.
- @param config - Moneda, zona, capacidad y días/horas validados de BUSINESS_*; no sobrescribe edición administrativa.
- @returns Promesa sin valor tras insertar únicamente la configuración y horarios ausentes.

## database/splitSqlStatements.ts

Separa bloques delimitados con statement-breakpoint.

[Abrir fuente](../database/splitSqlStatements.ts)

| Exportación        | Responsabilidad                                      |
| ------------------ | ---------------------------------------------------- |
| splitSqlStatements | Separa bloques delimitados con statement-breakpoint. |

### splitSqlStatements

```ts
export function splitSqlStatements(sql: string): string[];
```

- @param sql Archivo de migración o semilla.
- @returns Sentencias no vacías, sin romper puntos y coma dentro de cadenas.

## database/sqlDialect.ts

Detecta el motor real; nunca interpreta MySQL como si fuera MariaDB.

[Abrir fuente](../database/sqlDialect.ts)

| Exportación  | Responsabilidad                                                                   |
| ------------ | --------------------------------------------------------------------------------- |
| isMariaDb    | Detecta el motor real; nunca interpreta MySQL como si fuera MariaDB.              |
| migrationSql | Conserva archivos/checksums históricos y adapta solo la sintaxis de su ejecución. |

### isMariaDb

```ts
export async function isMariaDb(connection: PoolConnection);
```

- @param connection Conexión que ejecutará las migraciones.
- @returns Si el servidor se identifica como MariaDB.

### migrationSql

```ts
export function migrationSql(sql: string, mariaDb: boolean);
```

- @param sql Sentencia histórica; los nuevos DDL se escriben para ambos motores.
- @param mariaDb Motor comprobado en la misma conexión.
- @returns SQL equivalente, con restricciones CHECK igualmente activas.

## database/withMigrationLock.ts

Ejecuta una tarea bajo lock de esquema y libera el lock si la tarea falla.

[Abrir fuente](../database/withMigrationLock.ts)

| Exportación       | Responsabilidad                                                            |
| ----------------- | -------------------------------------------------------------------------- |
| withMigrationLock | Ejecuta una tarea bajo lock de esquema y libera el lock si la tarea falla. |

### withMigrationLock

```ts
export async function withMigrationLock(connection: PoolConnection, task: () => Promise<void>);
```

- @param connection - Conexión de sesión que adquiere y libera el lock.
- @param task - Tarea de esquema ejecutada una vez adquirido el bloqueo de esta base.
- @returns Promesa sin valor; libera el lock incluso si task falla y propaga ese error.

## scripts/audit-source.mjs

Punto de entrada del backend: comparte reglas con frontend y revisa también database/.

[Abrir fuente](../scripts/audit-source.mjs)

## scripts/document-source.mjs

Genera documentación desde AST usando las herramientas comunes del repositorio.

[Abrir fuente](../scripts/document-source.mjs)

## scripts/exportSchemas.ts

Esquemas de entrada OpenAPI obtenidos de las mismas validaciones que ejecuta Express.

[Abrir fuente](../scripts/exportSchemas.ts)

## tests/admin-panel.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/admin-panel.integration.ts)

## tests/admin-rules.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/admin-rules.test.ts)

## tests/agenda.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/agenda.integration.ts)

## tests/availability-reason.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/availability-reason.test.ts)

## tests/booking.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/booking.integration.ts)

## tests/cancellation.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/cancellation.integration.ts)

## tests/client-employee.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/client-employee.integration.ts)

## tests/database.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/database.integration.ts)

## tests/env.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/env.test.ts)

## tests/health.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/health.test.ts)

## tests/maintenance.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/maintenance.test.ts)

## tests/management.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/management.integration.ts)

## tests/migrationChecksum.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/migrationChecksum.test.ts)

## tests/oauth-link.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/oauth-link.integration.ts)

## tests/oauth.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/oauth.integration.ts)

## tests/operations.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/operations.integration.ts)

## tests/recovery.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/recovery.integration.ts)

## tests/recovery.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/recovery.test.ts)

## tests/schedule.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/schedule.test.ts)

## tests/security.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/security.integration.ts)

## tests/social-providers.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/social-providers.test.ts)

## tests/sql.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/sql.test.ts)

## tests/support/context.ts

Sesión tipada de un usuario de pruebas.

[Abrir fuente](../tests/support/context.ts)

| Exportación    | Responsabilidad                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| TestSession    | Sesión tipada de un usuario de pruebas.                                                 |
| app            | App real, repositories reales; no se simula MySQL.                                      |
| testPassword   | Contraseña exclusiva de fixtures locales.                                               |
| api            | Request autenticado del contrato público.                                               |
| atBusinessTime | Fija la hora de negocio sin alterar la validez del JWT.                                 |
| verifyWash     | Completa el flujo del empleado y del administrador con una hora comercial válida.       |
| login          | Login de un fixture o del administrador semilla.                                        |
| client         | Cuenta cliente nueva para aislar permisos y propiedad.                                  |
| admin          | Sesión administrativa del seed local.                                                   |
| employee       | Crea empleado desde la API administrativa.                                              |
| vehicle        | Registra un vehículo propio para la aceptación.                                         |
| future         | Fecha futura hábil para usar horarios de atención sin depender de la hora de ejecución. |
| firstSlot      | Cotiza y devuelve el primer horario libre.                                              |

### api

```ts
export function api(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  path: string,
  token?: string,
  body?: unknown,
);
```

### atBusinessTime

```ts
export async function atBusinessTime<T>(instant: string, run: () => PromiseLike<T>);
```

### verifyWash

```ts
export async function verifyWash(employee: string, admin: string, id: string, instant: string);
```

### login

```ts
export async function login(email: string, password = testPassword): Promise<TestSession>;
```

### client

```ts
export async function client(): Promise<TestSession>;
```

### admin

```ts
export function admin();
```

### employee

```ts
export async function employee(token: string, canPay = false);
```

### vehicle

```ts
export async function vehicle(token: string);
```

### future

```ts
export function future(offset: number);
```

### firstSlot

```ts
export async function firstSlot(token: string, vehicleId: string, date: string);
```

## tests/team-agenda.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/team-agenda.integration.ts)

## tests/vehicle-later.integration.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/vehicle-later.integration.ts)

## eslint.config.ts

Punto de entrada o configuración del proyecto; consultar su declaración y los comandos de la guía de instalación.

[Abrir fuente](../eslint.config.ts)
