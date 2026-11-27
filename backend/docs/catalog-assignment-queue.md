# Tarifas, responsables y lavados pendientes

## Tarifas compartidas

| Tipo       |    Interior |    Exterior |
| ---------- | ----------: | ----------: |
| Auto       | $15.000 ARS | $15.000 ARS |
| Camioneta  | $20.000 ARS | $20.000 ARS |
| Utilitario | $17.000 ARS | $17.000 ARS |

`tarifas_servicio` es el catálogo único que devuelve `GET /api/v1/services` a cliente, empleado y administrador. La cotización, la reserva y los ingresos presenciales consultan estas mismas filas. Los importes se guardan en centavos: $15.000 equivale a `1500000`. El código estable `suv` identifica la categoría que en producción se llama Utilitario.

La migración `020_equal_interior_exterior_prices.sql` actualiza únicamente las seis combinaciones de la tabla, bajo el bloqueo de configuración compartido con las reservas. No cambia completos, adicionales, otras categorías ni los importes históricos de `servicios_turno`. Una reserva anterior conserva el precio contratado. La migración queda registrada con checksum y no vuelve a imponer los precios en cada arranque; el administrador puede editarlos después.

## Guardar responsable

La selección muestra el responsable actual y permite guardar cualquier empleado activo, incluso cuando ya estaba asignado. En ese caso el servidor responde correctamente sin modificar la versión del turno. La interfaz confirma **Responsable guardado** y consulta otra vez el detalle.

`PATCH /api/v1/appointments/:id/assignment` sigue siendo exclusivo del administrador. Verifica que el turno admita reasignación y que el usuario elegido sea un empleado activo. Una reasignación efectiva conserva los controles de superposición, vehículo y capacidad bajo transacción. Un cliente, un empleado inactivo o uno ocupado no se convierte en responsable por repetir la solicitud.

## Pendientes desde hoy

`GET /api/v1/appointments?queue=requested` combina estados `pending`/`confirmed` con `starts_at` mayor o igual al inicio de hoy en la zona horaria del negocio. Incluye todos los horarios de hoy, aunque ya hayan pasado, y los próximos días. La lista y su contador comparten el mismo filtro; se mantienen primero las solicitudes más recientes.

`agendaScope.repository.ts` convierte la medianoche local a UTC para consultar SQL. No toma la fecha del teléfono ni recorta a la hora actual. La agenda general y el historial conservan los turnos anteriores; no se elimina ningún registro. La bandeja sigue restringida a Administración.

## Comprobación reproducible

En una base exclusiva de pruebas, migrada y sembrada, ejecutar `npm run test:admin-updates`. Comprueba las seis tarifas para los tres roles, sus cotizaciones y una reserva persistida; las asignaciones a tres empleados, guardado repetido, usuario inválido, empleado inactivo y conflicto real; y lista/contador/historial al cruzar la medianoche argentina. También conserva la prueba del orden por solicitud y sus permisos. `npm test` cubre por separado el límite entre día UTC y día local.
