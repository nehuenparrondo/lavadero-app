# Cómo funciona Lavadero

Para aprender a operar las pantallas, usar el [manual de usuario de main](../../MANUAL-DE-USUARIO.md). Esta guía relaciona esos recorridos con el código y los datos actuales.

## Un proyecto, dos aplicaciones y una API

`main/frontend` contiene la interfaz Expo/React Native. `main/backend` contiene Express, las reglas y el acceso a MariaDB. Render publica la [web](https://lavadero-app-2558.onrender.com) y la [API](https://lavadero-api-48m4.onrender.com) desde el [repositorio único](https://github.com/nehuenparrondo/lavadero-app).

Web y APK consultan los mismos registros cuando apuntan a la misma API. La API publicada usa `nehuenlavadero_prod`; el desarrollo escolar usa `nehuenlavadero_dev`. No se sincronizan ambas bases. El [gestor de producción](https://nehuenlavadero.alwaysdata.net/gestor-produccion/) permite consultar los datos publicados; la [guía de gestores](../../tools/database-admin/USO.md) explica cómo distinguirlos.

MariaDB está en alwaysdata. El backend recibe `DATABASE_URL` y la configuración TLS desde su entorno privado; `src/config/database.ts` abre la conexión. La estructura actual tiene 27 tablas en español y 20 migraciones. [Modelo y diccionario](database.md).

## Acceso y permisos

`auth.service.ts` registra siempre Cliente y compara contraseñas bcrypt al ingresar. `session.service.ts` emite JWT de acceso y rota una credencial de renovación cuyo hash se guarda en SQL. El frontend conserva esa renovación para restaurar la sesión; el backend comprueba cuenta activa, familia de sesión y permisos en cada solicitud.

Google, Discord y GitHub usan adaptadores OAuth del backend, estado de un uso y PKCE. El navegador no recibe el secreto del proveedor. Una coincidencia de correo con una cuenta local requiere acreditar esa cuenta antes de vincularla. La recuperación usa un enlace de un uso y Mailtrap Sandbox: los correos quedan en la bandeja de pruebas, no llegan a casillas reales. [Identidad y seguridad](security-recovery.md), [sesión persistente](../../docs/social-session.md).

## Reserva y vehículo

1. El cliente elige categoría, lavado, extras, fecha y hora. Guardar mueve el horario al resumen; aún no reserva.
2. Confirmar envía la selección a `POST /api/v1/appointments`. `booking.service.ts` recotiza bajo bloqueo y comprueba jornada, duración, capacidad, inicio único y titular.
3. El servidor guarda el turno confirmado, los servicios contratados y la asignación automática posible. Los importes se calculan en centavos ARS, no se aceptan desde la pantalla.
4. El cliente completa el vehículo después mediante `attachVehicle.service.ts`; conserva la categoría contratada. Administración consulta esos datos, no completa el formulario del cliente.

Una disponibilidad anterior puede quedar ocupada antes de confirmar: la API responde un conflicto y la pantalla vuelve a consultar. Los horarios actuales son 09:30–21:30, en Argentina; los extras cuentan en la duración. Las tarifas interior/exterior son Auto $15.000, Camioneta $20.000 y Utilitario $17.000. Los turnos anteriores conservan su contrato. [Horarios](business-hours.md), [tarifas y pendientes](catalog-assignment-queue.md).

## Administración y trabajo

Auto sin turno guarda datos presenciales sin exigir una cuenta ni vehículo de garaje. La bandeja de pendientes muestra hoy y próximos días; la agenda general conserva el pasado. Guardar al responsable activo actual es idempotente: devuelve éxito sin aumentar la versión. Una reasignación real vuelve a comprobar la ocupación.

Todo el equipo consulta los turnos de hoy; solo su responsable puede iniciarlos. El empleado habilitado registra cobros y, con el saldo cubierto y una descripción, finaliza mediante `paidFinish.service.ts` dentro de la jornada. El envío a revisión continúa disponible para empleados sin permiso de cobros y partes anteriores. `wash.service.ts` comprueba el parte exacto que Administración inspecciona; no se aprueba automáticamente un parte distinto.

`payments.service.ts` registra dinero recibido, no mueve fondos. Bloquea el turno, controla saldo y recuerda una clave de idempotencia para que un reintento no duplique el cobro. Los reportes cuentan ingresos por la fecha real del pago, trabajos cerrados por su fin agendado y servicios por inicio del turno.

Cancelar exige un motivo guardado con su autor. El cliente recibe el aviso en Inicio. Las observaciones se guardan en `notas_turno`; los reclamos y respuestas en `mensajes_cliente`; el parte del trabajo en `partes_lavado`. La devolución vincula responsable y trabajo realizado. Asistencia registra la llegada observada por Administración, solo hoy y durante una jornada abierta.

## Cómo se refleja un cambio

Un hook envía el comando, espera confirmación y vuelve a consultar los recursos. React publica el estado recibido. El sondeo visible y la consulta al regresar incorporan cambios de otros usuarios cada 10–15 segundos; no es una conexión en tiempo real ni exige pulsar Actualizar. El backend vuelve a validar aunque el botón ya estuviera habilitado.

Para localizar cualquier archivo, seguir [arquitectura](../../docs/architecture.md), [mapa backend](source-map.md), [mapa frontend](../../frontend/docs/source-map.md) y [contrato HTTP](../API.md). Esas referencias describen responsabilidades, parámetros, resultados y errores sin copiar las dependencias ni exponer secretos.
