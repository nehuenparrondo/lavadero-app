# Agenda compartida y controles de pantalla

La decisión del usuario del 2 de noviembre de 2026 reemplaza la asignación exclusiva del enunciado original: **cada reserva pertenece automáticamente a la agenda de todo el equipo**. No se requiere que el administrador elija un empleado ni que haya una sesión abierta en el momento de reservar.

- La nueva reserva queda confirmada dentro de la misma transacción que comprueba horario, titular, servicios y capacidad física.
- Todos los empleados activos autenticados ven la misma agenda, incluyendo turnos pendientes anteriores, para la fecha local elegida. Quitar el filtro permite consultar todas las fechas.
- El cliente no recibe employeeId ni employeeName en listas, detalles o comprobantes. La interfaz no muestra asignaciones.
- Al comenzar un lavado, se registra el actor como responsable interno para el informe administrativo. Ese dato no limita el acceso del resto del equipo: otro empleado puede colaborar y finalizar. Historial de estados y notas conservan sus autores.
- El bloqueo transaccional y la máquina de estados evitan que dos empleados comiencen el mismo turno simultáneamente. Los cobros siguen exigiendo permiso explícito y conservan saldo e idempotencia.
- El resumen del empleado corresponde a la jornada del equipo, sin ingresos ni datos de cuentas. El reporte administrativo conserva la atribución al responsable que inició el lavado.
- Las agendas se revalidan cada 30 segundos mientras la ruta está enfocada y la app o pestaña visible. También al regresar. No hay consultas periódicas en segundo plano. La recarga silenciosa conserva únicamente datos de los mismos filtros; errores y cambios de fecha descartan resultados anteriores.
- El botón de tema está abajo a la derecha en pantallas y diálogos. Volver arriba aparece a su lado solo en contenido largo después de desplazarse; actúa sobre la región propia, no sobre otra pantalla. Ambos respetan áreas seguras y no tapan el último formulario.
- Nombre/avatar de cabecera y barra lateral abren el perfil del rol actual; el móvil muestra un avatar compacto. La preferencia de tema se guarda localmente y el perfil permite volver al modo automático del dispositivo.

## Verificación reproducible

`npm run check` en ambos proyectos. La aceptación contra MySQL real incorpora `tests/team-agenda.integration.ts` junto con `tests/management.integration.ts`, seguridad, reservas, OAuth y vinculación. Verifica agenda compartida por fecha, privacidad del cliente, roles sin permiso de cobro, concurrencia de inicio, colaboración y compatibilidad con turnos pendientes anteriores. Las pruebas destructivas usan exclusivamente una base local descartable.

La recarga de enlaces compartidos entre roles usa un destino con grupo explícito para conservar Perfil, Reportes y otras pantallas autorizadas. Ver [shared-verification.md](shared-verification.md).
