# modules/appointments

Agenda y contratos históricos. Compartir el lock de settings para reservar/asignar/cambiar estado; no confiar en precios del cliente.

## Archivos y responsabilidades

| Archivo                                                                  | Responsabilidad                                                                                                            |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| [agendaScope.repository.ts](agendaScope.repository.ts)                   | Define próximas visitas por día local y separa la jornada actual del historial.                                            |
| [appointments.access.ts](appointments.access.ts)                         | Oculta turnos de otros clientes; el equipo comparte la agenda operativa.                                                   |
| [appointments.controller.ts](appointments.controller.ts)                 | Lista por rol y filtros.                                                                                                   |
| [appointments.filters.repository.ts](appointments.filters.repository.ts) | Construye únicamente predicados cerrados; los datos siempre viajan como parámetros.                                        |
| [appointments.repository.ts](appointments.repository.ts)                 | Busca un turno sin revelar datos fuera del servicio autorizado.                                                            |
| [appointments.routes.ts](appointments.routes.ts)                         | Turnos con controles adicionales de propiedad/asignación dentro de cada servicio.                                          |
| [appointments.schema.ts](appointments.schema.ts)                         | Valores únicos y acotados evitan consultas y totales ambiguos.                                                             |
| [appointments.service.ts](appointments.service.ts)                       | Lista turnos propios para clientes y agenda compartida para el equipo y admite filtros administrativos sin ampliar acceso. |
| [appointments.types.ts](appointments.types.ts)                           | Flujo compartido por rutas y reglas del módulo.                                                                            |
| [appointments.write.repository.ts](appointments.write.repository.ts)     | Inserta turno pendiente. El llamador mantiene lock de agenda y snapshot de precios.                                        |
| [attachVehicle.service.ts](attachVehicle.service.ts)                     | Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda.                                      |
| [availability.reason.ts](availability.reason.ts)                         | Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado.                                               |
| [availability.service.ts](availability.service.ts)                       | Genera opciones de inicio respetando duración completa, capacidad y vehículo.                                              |
| [booking.service.ts](booking.service.ts)                                 | Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda.                                               |
| [bookingQuote.service.ts](bookingQuote.service.ts)                       | Cotiza desde el tipo seleccionado o desde un vehículo ya registrado.                                                       |
| [bookingSlot.service.ts](bookingSlot.service.ts)                         | Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.                                             |
| [cancellation.repository.ts](cancellation.repository.ts)                 | Aviso propio pendiente de lectura; el motivo proviene del turno cancelado.                                                 |
| [cancellation.routes.ts](cancellation.routes.ts)                         | Registra antes de /:id los avisos del cliente y su confirmación de lectura.                                                |
| [cancellation.service.ts](cancellation.service.ts)                       | Guarda el motivo validado dentro de la misma transacción del cambio de estado.                                             |
| [clientEmployee.routes.ts](clientEmployee.routes.ts)                     | Monta limpieza visual privada y cierre cobrado con permisos distintos.                                                     |
| [homeClear.service.ts](homeClear.service.ts)                             | Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros.                                             |
| [intervals.ts](intervals.ts)                                             | Convierte filas SQL UTC al formato único del cálculo de capacidad.                                                         |
| [mutation.service.ts](mutation.service.ts)                               | Cambia estado con permisos, horario de finalización, plazo de cancelación y bloqueo de agenda.                             |
| [notes.repository.ts](notes.repository.ts)                               | Lee notas atribuidas a su autor, después de autorizar el turno en service.                                                 |
| [paidFinish.service.ts](paidFinish.service.ts)                           | Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables.                                 |
| [responsibility.repository.ts](responsibility.repository.ts)             | Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación.                                |
| [schedule.ts](schedule.ts)                                               | Interpreta un DATETIME de MySQL como UTC sin depender de la zona del servidor.                                             |
| [teamCapacity.ts](teamCapacity.ts)                                       | Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado.                                   |
| [transitions.ts](transitions.ts)                                         | Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service.                         |
| [vehicleDetail.service.ts](vehicleDetail.service.ts)                     | El titular agrega observaciones al turno confirmado, sin cambiar lo contratado.                                            |
| [walkIn.repository.ts](walkIn.repository.ts)                             | Busca un reintento para no duplicar un ingreso al reenviar la solicitud.                                                   |
| [walkIn.routes.ts](walkIn.routes.ts)                                     | Monta el alta presencial antes de las rutas con parámetro id.                                                              |
| [walkIn.schema.ts](walkIn.schema.ts)                                     | Alta presencial mínima; el servidor decide horario, importes y responsable.                                                |
| [walkIn.service.ts](walkIn.service.ts)                                   | Registra llegada, contrato y observaciones atómicamente; nunca crea cuentas ficticias.                                     |
| [walkIn.slot.ts](walkIn.slot.ts)                                         | Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes.                                           |
| [wash.repository.ts](wash.repository.ts)                                 | El parte guarda el responsable real, su declaración y la decisión administrativa.                                          |
| [wash.service.ts](wash.service.ts)                                       | Solo el responsable registra la finalización física, durante el horario de trabajo.                                        |
| [work.routes.ts](work.routes.ts)                                         | Cambios del auto, envío del responsable y decisión exclusiva de Administración.                                            |
| [work.schema.ts](work.schema.ts)                                         | Datos adicionales del auto ingresados después de confirmar.                                                                |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
