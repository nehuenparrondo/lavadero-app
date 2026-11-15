# Uso de cliente y empleado

## Calendario y reserva

Una reserva nueva comienza sin fecha. Abrir el calendario o recorrer meses no asigna un día; es necesario tocar una fecha para consultar los horarios y luego elegir una hora libre antes de confirmar.

El calendario usa siete columnas flexibles, muestra solo las semanas necesarias y tiene controles de mes con íconos. El diálogo compacto dispone de cierre en su cabecera, ancho adaptable y desplazamiento interno cuando la altura es reducida. Sus botones quedan por encima de la página y los controles flotantes ocupan el espacio reservado inferior. Se comprueban anchos de 320 y 390 puntos y horizontal de 844 puntos, incluyendo colisiones entre días y que la página de fondo no tape los objetivos táctiles.

## Inicio y Mis turnos

El pequeño tacho junto a **Tus turnos activos** abre una confirmación. Limpiar oculta las tarjetas del Inicio; las reservas siguen vigentes en Mis turnos y el lavadero conserva su historial. El servidor guarda la elección por cuenta y sobrevive a recargas o cambios de dispositivo. Una nueva reserva vuelve a mostrarse.

**Próximos** muestra visitas confirmadas de hoy en adelante, todavía no terminadas. Los pendientes de fechas anteriores quedan disponibles en Pasados. La zona del negocio se aplica en el servidor, aunque el dispositivo tenga otra fecha.

## Mi agenda y Mi historial

Mi agenda del empleado contiene únicamente **Hoy**, con lavados pendientes de ese día y sin selectores de otras fechas. Mi historial conserva todas las fechas y la búsqueda por patente. Los lavados cerrados salen automáticamente de Hoy.

Un empleado con permiso de cobros inicia su lavado, registra el importe completo y ve el formulario **Trabajo realizado** con **Finalizar lavado**. Al guardar queda Finalizado directamente, con descripción y autor; no requiere que Administración lo apruebe. Un cobro parcial mantiene el saldo y todavía no habilita el cierre. El servidor vuelve a comprobar permiso, responsabilidad, pago y horario laboral.

## Reclamos

El cliente escribe en Atención al cliente y pulsa Enviar reclamo. El mensaje queda guardado y aparece en Pendientes del administrador. El resumen administrativo muestra la cantidad abierta y abre la bandeja. La actualización automática permite recibir nuevos casos sin un botón Actualizar. La respuesta administrativa regresa a la bandeja privada del cliente.

## Organización

Los componentes visuales delegan la escritura a hooks y servicios. `useHomeClear` coordina confirmación y recarga; `ClientVisitHeader` contiene el tacho y diálogo. `EmployeePaidFinish` separa la finalización cobrada del circuito anterior. `useAgendaList` aplica la pantalla Hoy o historial; `AdminComplaintShortcut` hace visible la bandeja desde el resumen. Se mantienen los límites de tamaño y documentación del código y no se agregan dependencias nativas.
