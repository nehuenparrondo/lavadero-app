# Correcciones de agenda y controles — Lavadero 1.2.0

## Comportamiento solicitado

Cada reserva nueva queda confirmada automáticamente y disponible para todos los empleados activos. No depende de que el administrador asigne una persona ni de que haya una sesión abierta al reservar. El cliente no recibe ni ve datos de asignación.

La agenda del equipo mantiene la fecha local elegida (Argentina). Al abrirla muestra hoy; para una reserva de otro día hay que elegir ese día o quitar el filtro. Incluye los turnos pendientes anteriores. La lista se actualiza al volver a la app y cada 30 segundos mientras la agenda está visible. Hay además una acción Actualizar agenda. No hay consultas periódicas con la app oculta.

Al comenzar un lavado se registra quién lo inició para el historial interno del administrador. El resto del equipo mantiene acceso operativo y puede colaborar. Dos intentos simultáneos de comenzar el mismo turno producen un único inicio válido. Los cobros siguen requiriendo autorización, saldo disponible e idempotencia.

El botón claro/oscuro está flotante abajo a la derecha en pantallas, formularios, acceso, espera y diálogos. Volver arriba aparece junto a él únicamente después de desplazarse en contenido largo. Desplaza la región correcta y desaparece al volver al inicio. La preferencia persiste localmente; Perfil permite seguir la apariencia del dispositivo.

Nombre y avatar del encabezado y de la barra lateral abren el perfil del rol actual. En teléfono se usa un avatar compacto. Se corrigieron también la carga del detalle sin controles, los nombres largos del perfil móvil y la recarga de enlaces compartidos entre roles: el retorno especifica el grupo correcto, evitando volver al inicio de otro rol.

## Pruebas realizadas

- 54 pruebas aprobadas: 16 unitarias/HTTP del servidor, 23 de aceptación con MySQL real local descartable y 15 frontend.
- Aceptación: alta y edición de perfil, vehículo, categorías, servicios y tarifas; configuración; reportes diarios/semanales/mensuales; reserva/capacidad; agenda compartida por fecha; concurrencia; historial; notas; pagos parciales en efectivo y transferencia; idempotencia; saldo; comprobante; roles, propiedad, sesiones y OAuth con proveedores simulados.
- En la web publicada se ingresó con los tres roles y se probaron ambos accesos al perfil. También se revisaron el avatar y menú administrativo en ancho de teléfono, tema claro/oscuro, su persistencia, el diálogo de cancelación y volver arriba.
- Reserva ficticia número 5: cliente Demo, vehículo DE123MO, sábado 7 de noviembre de 2026 a las 09:30, lavado exterior de 35 minutos. Quedó confirmada automáticamente y apareció en la agenda del empleado sin pulsar Actualizar ni recargar. El cliente no vio asignaciones. Se canceló al terminar con motivo explícito de QA y no registra pagos.
- Se verificaron 23 consultas de producción entre los tres roles y la disponibilidad configurada de Google, GitHub y Discord. No se repitieron los consentimientos externos: el flujo OAuth no cambió desde la verificación real documentada de 1.1.1.
- El turno existente número 4 no se modificó. Ahora es visible para el equipo por la nueva regla de agenda compartida.
- Tipos estrictos, lint, auditoría de modularidad y TSDoc, contrato OpenAPI, exportaciones web/Android y Expo Doctor 20/20 aprobados.

## Evidencia y alcance

Ver la evidencia de verificacion-1.2.0.json en la entrega y las imágenes controles-flotantes-1.2.png, agenda-compartida-1.2.png y perfil-movil-1.2.png. Los recibos de prueba local no representan dinero real. Las capturas de teléfono son pruebas web con viewport de 390 × 844; no acreditan ejecución instalada en iPhone ni Android.

La demora inicial de Render Free al despertar sigue dependiendo del alojamiento. La app conserva su aviso propio y su conexión inicial compartida. No se contrataron planes pagos ni se instaló un pinger de mantenimiento.
