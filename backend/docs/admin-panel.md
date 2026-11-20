# Panel administrativo: ingresos presenciales y controles

## Auto sin turno

`POST /api/v1/appointments/walk-in` es exclusivo de Administración. Requiere `requestId` UUID, patente, tipo de vehículo y servicios. Nombre, teléfono, marca, modelo, color y observaciones son opcionales. Las tarifas y duraciones provienen del catálogo: un solo lavado base, encerado únicamente con exterior/completo y opciones de moto limitadas a su lavado.

El servidor toma el reloj oficial en `America/Argentina/Buenos_Aires` y exige estar dentro de un día y horario de atención. Calcula el primer inicio libre de hoy en la grilla del negocio, con duración completa antes del cierre. Conserva el bloqueo de `configuracion_negocio` durante cálculo e inserción, compartido con las reservas normales: dos ingresos concurrentes ocupan espacios distintos, y una reserva de cliente no puede tomar ese mismo cupo. Si no queda lugar, rechaza todo con `DAY_FULL`.

La patente se normaliza. Si ya tiene un turno activo hoy, o un lavado en proceso/revisión, se rechaza el duplicado. Una patente registrada conserva su vehículo y titular, sin modificar el garaje. Una patente nueva se documenta en `ingresos_sin_turno`; no crea un usuario ficticio ni un vehículo de garaje. `turnos.client_id` admite null para este caso. La ausencia de garaje no bloquea el trabajo del empleado porque `isWalkIn` identifica el ingreso documentado.

La migración **016** agrega `ingresos_sin_turno`, con patente, descripción básica, contacto opcional, UUID único, fecha y FK al turno. Precios y duración histórica siguen en `servicios_turno`; observaciones en `notas_turno`, con el administrador como autor. Todo se guarda en la misma transacción. Reenviar el mismo UUID devuelve el turno original; para otro auto se debe usar un UUID nuevo.

El turno se confirma y aparece en la agenda compartida, con búsqueda por patente. Mantiene asignación automática y reasignación administrativa, parte del empleado, cierre directo tras cobrar o revisión compatible de partes anteriores, pagos idempotentes y comprobante. Los ingresos sin cuenta son visibles al equipo autorizado; ningún cliente puede acceder a ellos. Cuando la patente pertenece a un cliente registrado, ese cliente conserva acceso a su turno y a los avisos de cancelación.

Archivos: `walkIn.schema.ts`, `walkIn.routes.ts`, `walkIn.service.ts`, `walkIn.slot.ts` y `walkIn.repository.ts`, dentro de `src/modules/appointments/`. El módulo de consulta usa LEFT JOIN para conservar tanto reservas con titular como ingresos presenciales.

## Cancelaciones

El motivo sigue siendo obligatorio, sin aceptar espacios vacíos y con máximo de 500 caracteres. La validación se aplica también al cambio genérico de estado: no se puede eludir enviando `status=cancelled`. El rechazo revierte estado e historial. Autor y motivo se guardan; el cliente registrado recibe el aviso en Inicio, con lectura persistente. Ver [cancelaciones](cancellation-notices.md).

## Usuarios y servicios

El alta administrativa acepta únicamente `client` o `employee`, con contraseña inicial hasheada. El esquema de edición rechaza `role`. La interfaz no ofrece cambios de rol ni creación de administradores. Se conservan las protecciones que impiden desactivar o eliminar la propia cuenta administrativa. El endpoint histórico de cambio de rol sigue separado del editor; no se usa en el panel.

Servicios permiten crear, editar descripción/nombre/duración/disponibilidad, editar precios por categoría y eliminar mediante baja lógica. Sus códigos base permanecen estables. Los turnos guardados conservan el nombre, precio y duración contratados aunque el servicio se edite o elimine después. Las categorías de vehículos mantienen su editor independiente.

## Asistencia

`attendance.window.ts` calcula el día y permiso con el reloj del servidor y los horarios vigentes. `GET /attendance` incluye `canRecord` y `recordReason`, para explicar el estado de los botones. `POST /attendance/:id/arrival` revalida bajo transacción: fecha igual a hoy, empleado activo, día abierto y hora entre apertura incluida y cierre excluido. No admite fichajes futuros ni retroactivos. Dos solicitudes simultáneas conservan un único primer registro; no reemplazan su autor ni hora.

## Gráficos semanales

El reporte agrega `weeks`, agrupando días locales de lunes a domingo. Los extremos se recortan al período consultado. Semanas sin cobros conservan cero; no se inventan ingresos ni metas. La suma en centavos de las semanas coincide con el total del reporte. Los cobros se cuentan por su fecha real de pago; servicios más pedidos, por fecha del turno y excluyendo cancelados. Las barras comparan cada valor con el máximo de la serie. El tablero muestra las semanas del mes; Reportes permite elegir período y fecha. Se retiró la sección visual de rendimiento del equipo, conservando los registros operativos.

## Verificación

`tests/admin-rules.test.ts` verifica límites horarios, domingo, zona argentina, roles y semanas que cruzan de año. `tests/admin-panel.integration.ts` usa MariaDB descartable y la API real para comprobar ingresos, concurrencia, UUID, patente, titular, cancelaciones, notas, trabajo/revisión/pagos y asistencia. Las pruebas completas requieren una base de QA vacía para aislar los casos que reservan la primera hora de un día. Nunca se usan reservas productivas como fixtures.
