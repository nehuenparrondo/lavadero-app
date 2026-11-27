# Manual de uso de Lavadero

Guía vigente al **27 de noviembre de 2026**, centrada en Administración y Empleado. Los nombres en **negrita** son controles de la aplicación.

[Abrir Lavadero](https://lavadero-app-2558.onrender.com) · [Administrador](#administrador) · [Empleado](#empleado) · [Cliente](#cliente) · [Ayuda](#ayuda)

## Antes de empezar

1. Abrí la aplicación e ingresá con tu correo y contraseña o con Google, Discord o GitHub.
2. La cuenta determina qué pantallas aparecen. Un registro público nuevo crea un Cliente; Administración crea las cuentas de empleados.
3. En computadora usá el menú lateral. En teléfono, Administración abre el menú de la cabecera; Empleado y Cliente tienen navegación inferior.

La sesión se conserva al cerrar y volver a abrir. Las pestañas del mismo navegador y sitio comparten la cuenta: para probar roles distintos a la vez, usá perfiles de navegador distintos. En una computadora compartida, terminá con **Mi perfil → botón rojo de salir → confirmar**.

El nombre o la inicial del usuario abre **Mi perfil**. El botón flotante inferior derecho cambia el modo claro/oscuro. **Volver arriba** aparece cuando hace falta por el desplazamiento. Las listas se actualizan automáticamente mientras están visibles y al regresar; no hace falta recargar la página.

La atención configurada es de **lunes a sábado, de 09:30 a 21:30, hora de Argentina**. El lavado completo, incluidos extras, debe entrar en la jornada. Por ejemplo, uno de 40 minutos puede comenzar como máximo a las 20:50. Si Administración modifica horarios o días, la disponibilidad sigue esa configuración.

## Administrador

### 1. Organizar el día desde Resumen

Al entrar verás **Resumen**. Revisá:

| Apartado                | Para qué sirve                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Lavados pendientes      | Solicitudes sin iniciar de **hoy y próximos días**; aparecen primero las creadas más recientemente. El contador usa el mismo criterio. |
| Lavados finalizados     | Trabajos cerrados de la jornada.                                                                                                       |
| Ingresos registrados    | Cobros registrados hoy. Reservar un turno todavía no cuenta como ingreso.                                                              |
| Ingresos por semana     | Compara los cobros por semanas del mes.                                                                                                |
| Servicios más pedidos   | Muestra las cantidades de servicios contratados en el período.                                                                         |
| Reclamos y devoluciones | Permite abrir los mensajes pendientes de respuesta.                                                                                    |

Tocá una tarjeta de turno para ver cliente, fecha, vehículo, servicios, responsable, observaciones y saldo. Los turnos anteriores no se borran: se consultan desde **Turnos**, fuera de **Nuevas solicitudes**.

### 2. Registrar un auto que llegó sin turno

1. Abrí **Auto sin turno**.
2. Escribí la **Patente** y elegí el **Tipo de vehículo**. No hace falta que tenga cuenta ni que el auto esté en el garaje.
3. Elegí el lavado y, si corresponde, los extras. Podés desplegar **Agregar contacto u observaciones (opcional)** para anotar nombre, teléfono, marca, modelo, color o indicaciones.
4. Revisá el importe, la duración y el primer lugar disponible de hoy.
5. Tocá **Registrar auto sin turno**. Esperá **Ingreso confirmado**; desde allí podés **Ver turno** o **Registrar otro auto**.

**Ejemplo:** llega un Auto para exterior. Cargás su patente, elegís Auto y Exterior, revisás $15.000 y confirmás. El sistema busca lugar sin desplazar reservas existentes. Fuera de la jornada o sin lugar suficiente no permite registrar la llegada.

### 3. Consultar turnos y guardar al responsable

1. Abrí **Turnos** y elegí **Hoy**, **Todas las fechas** o **Nuevas solicitudes**.
2. Buscá por patente; al buscarla, la consulta no queda limitada a la fecha elegida. **Más filtros** permite acotar por cliente, empleado o estado.
3. Abrí el turno. Si admite reasignación, en **Empleado responsable** elegí un empleado activo y tocá **Guardar responsable**.
4. Esperá **Responsable guardado** y comprobá **Responsable actual**. También podés guardar al empleado que ya figuraba asignado, incluido Empleado 1.

La asignación inicial es automática cuando hay un empleado libre. Todo el equipo ve la agenda compartida; trabajar sobre el auto requiere ser su responsable. Si el empleado elegido está ocupado, la aplicación avisa y conserva la asignación anterior.

Las reservas nuevas se confirman automáticamente. **Confirmar turno** aparece para pendientes anteriores. Si dice que faltan datos del vehículo, **el cliente titular debe completarlos desde su cuenta**; Administración no tiene que volver a elegir su categoría ni cargar ese formulario.

### 4. Cancelar o dejar observaciones

Para cancelar, abrí el turno, tocá **Cancelar turno**, escribí un motivo concreto y confirmá. **El motivo es obligatorio**: por ejemplo, «Corte de agua en el local». El cliente recibe el aviso y el motivo en su Inicio. La cancelación y su autor quedan guardados.

Para una indicación sobre el trabajo, escribí en **Nueva observación** y tocá **Agregar observación**. Comprobá que aparezca en la lista. Las observaciones conservan texto, autor y fecha; no reemplazan el motivo de una cancelación.

### 5. Administrar clientes y empleados

1. Abrí **Usuarios → Agregar usuario**.
2. Completá identidad, correo, contraseña inicial y rol **Cliente** o **Empleado**. El formulario no crea administradores.
3. Para corregir una cuenta, buscala y tocá **Editar**. Su rol se conserva.
4. Para habilitar cobros a un empleado, editá su cuenta y poné **Permitir registro de cobros (empleado)** en **Sí**. Esto habilita su circuito de cobro y cierre directo.

También podés desactivar una cuenta o confirmar su eliminación desde el panel. Estas acciones conservan el historial del negocio. No se puede eliminar o desactivar la propia cuenta administrativa desde ese editor.

### 6. Registrar asistencia

Cuando veas llegar al empleado, abrí **Asistencia**, verificá que estés en **hoy** y pulsá **Fichar llegada** junto a su nombre. Solo se registra durante un día y horario laboral, para un empleado activo. La hora la decide el servidor; no se permiten fichajes retroactivos ni futuros. Repetir la acción no cambia la primera llegada.

Podés elegir otra fecha para consultar asistencias anteriores, sin modificarlas.

### 7. Mantener vehículos, servicios y precios

**Vehículos** permite buscar autos, registrar uno para un cliente y gestionar categorías con sus tarifas. Esto es independiente del ingreso rápido de un auto sin turno.

En **Servicios y precios** podés crear, editar o dar de baja servicios y ajustar su precio por categoría. Revisá el mensaje de guardado. Los próximos turnos usan el catálogo actualizado; los ya reservados conservan lo contratado.

Tarifas de referencia de la última actualización, en pesos argentinos:

| Categoría  | Interior | Exterior |
| ---------- | -------: | -------: |
| Auto       |  $15.000 |  $15.000 |
| Camioneta  |  $20.000 |  $20.000 |
| Utilitario |  $17.000 |  $17.000 |

Se elige **un solo lavado base**: interior, exterior o completo. El encerado agrega $15.000 a exterior o completo; tapizados agrega $20.000. La moto ofrece únicamente **Lavado**, por $15.000. El formulario presenta las combinaciones permitidas y el total vigente.

En **Configuración** se administran días, horarios, capacidad y anticipación de cancelación. Un cambio se aplica a las validaciones del servidor; no altera por sí solo las fechas o importes de reservas anteriores.

### 8. Cobros, revisión y reclamos

En el detalle de un turno en proceso o finalizado, **Registrar cobro** permite ingresar importe en pesos, medio **Efectivo** o **Transferencia** y una referencia opcional. No registres un monto mayor al saldo. Este registro deja constancia del dinero recibido; no realiza una transferencia bancaria.

El responsable habilitado puede finalizar directamente después de cobrar el total: no necesita aprobación administrativa. Si un empleado sin permiso de cobros envía un parte a verificación, abrilo desde **Verificar lavados**, compará el trabajo y elegí **Confirmar lavado realizado** o **Devolver al empleado**, indicando qué debe corregir. La aprobación respeta el horario laboral.

En **Reclamos y devoluciones**, abrí el mensaje pendiente, leé el texto y escribí la respuesta. El cliente puede consultarla desde su cuenta. Una devolución de un lavado incluye el responsable y la descripción de lo realizado; un reclamo general puede no estar ligado a un turno.

En **Reportes**, elegí el período. Los cobros se agrupan por la fecha en que fueron registrados; los trabajos finalizados usan la fecha de fin agendada. Por eso ambos totales pueden corresponder a visitas diferentes.

## Empleado

### 1. Encontrar el auto

Abrí **Mi agenda**: muestra únicamente los lavados pendientes de **hoy**, incluidos los que están en proceso. Tocá el turno para ver horario, patente, marca/modelo, color, servicios e indicaciones. Una reserva puede aparecer como vehículo pendiente hasta que el cliente complete sus datos.

Para buscar una patente o consultar otra fecha, entrá a **Historial**. Ese apartado permite consultar turnos de cualquier fecha; no reemplaza la agenda de hoy. Ver un turno de otro integrante no te convierte en su responsable.

### 2. Comenzar y describir el trabajo

1. Abrí el turno que te corresponde y revisá los servicios contratados y las observaciones.
2. Tocá **Comenzar lavado**. Si faltan los datos del vehículo o está asignado a otro empleado, pedí que se resuelva antes de continuar.
3. Podés agregar observaciones del trabajo desde el detalle. Escribí información útil y comprobá que quede en la lista.

### 3. Registrar el cobro y finalizar

Si Administración habilitó tu cuenta para cobrar:

1. Con el lavado en proceso, tocá **Registrar cobro**.
2. Ingresá el dinero recibido **en pesos**, elegí Efectivo o Transferencia, agregá referencia si corresponde y guardá.
3. Revisá **Abonado** y **Saldo**. Un pago parcial se guarda, pero todavía no habilita el cierre.
4. Cuando el saldo esté cubierto, completá **Trabajo realizado** y tocá **Finalizar lavado**.
5. Verificá **Finalizado**. Sale de los pendientes de hoy y conserva tu nombre, descripción y cobros. No necesita otra aprobación del administrador.

**Ejemplo:** el exterior de un Auto cuesta $15.000. Registrás $15.000, el saldo queda en cero, describís «Lavado exterior y secado» y finalizás durante la jornada.

Si tu cuenta no tiene permiso para cobrar, el detalle ofrece **Enviar a verificación**: describí lo realizado y envialo. Administración revisa ese parte. Pedí al administrador la habilitación si necesitás usar el circuito de cobro y cierre directo.

No se permite finalizar fuera del horario laboral, en un día cerrado, sin cobro completo en el circuito directo o si no sos el responsable. Cambiar el reloj del teléfono no modifica esas condiciones.

## Cliente

Este recorrido ayuda al equipo a orientar a quien pide un turno:

1. En **Reservar mi lavado**, elegí categoría, lavado, extras y una fecha. La fecha no viene seleccionada.
2. Elegí una hora libre con la rueda y tocá **Guardar**. Se agrega a **Tu reserva**: arriba a la derecha en escritorio o debajo del formulario en teléfono.
3. Revisá el resumen y tocá **Confirmar reserva**. **Guardar no ocupa el horario**; la confirmación del servidor sí. Si otro cliente lo ocupó antes, elegí otro.
4. Con el turno confirmado, completá patente, marca, modelo y color, o vinculá un vehículo propio de la misma categoría. No hace falta cargar el garaje antes de reservar.
5. Consultá **Mis turnos → Próximos** para hoy y días futuros. **Pasados** conserva fechas anteriores y trabajos cerrados/cancelados. El tacho de **Tus turnos activos**, con confirmación, limpia tarjetas elegibles del Inicio; no cancela reservas ni borra cobros o historial.
6. Los reclamos se envían desde **Reclamos** y llegan a Administración. Desde un lavado finalizado podés ver el comprobante y enviar una devolución sobre el trabajo.

Si Administración cancela, el motivo aparece en Inicio. **Entendido** guarda su lectura. La cancelación propia del cliente requiere superar la anticipación configurada; actualmente son más de 120 minutos.

## Ayuda

| Situación                                        | Qué revisar                                                                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No aparecen horarios                             | Elegí fecha, categoría y servicios; puede ser un día cerrado, estar completo o no quedar tiempo para toda la duración.                                                                   |
| El turno no aparece en Mi agenda                 | Confirmá que sea hoy. Para otra fecha, usá Historial.                                                                                                                                    |
| Un turno antiguo no figura en Lavados pendientes | Es el comportamiento esperado; buscá en Turnos fuera de Nuevas solicitudes.                                                                                                              |
| No permite guardar un responsable                | Debe ser un empleado activo y libre; el turno debe admitir reasignaciones. El responsable actual sí puede guardarse otra vez.                                                            |
| No aparece Registrar cobro                       | Administración debe habilitar el permiso y el turno debe estar en un estado que admita pagos.                                                                                            |
| No permite finalizar                             | Revisá responsable, cobro total, descripción y horario laboral. Leé el mensaje concreto de la pantalla.                                                                                  |
| El servidor tarda en responder                   | El plan gratuito puede tardar en iniciar. Esperá y usá Reintentar si aparece; comprobá el resultado antes de repetir una operación.                                                      |
| Olvidé la contraseña                             | Usá el enlace de recuperación del acceso. En esta demostración el mensaje llega a **Mailtrap Sandbox**, no a una casilla real; el responsable de la demostración debe abrir esa bandeja. |
| No veo los datos en el gestor                    | La web publicada usa producción y el desarrollo escolar usa otra base. Consultá la [guía del gestor](tools/database-admin/USO.md).                                                       |

Este manual describe la aplicación web actual. Un APK anterior puede conservar una interfaz anterior: debe reconstruirse desde esta fuente para incluir cambios de pantallas. Para instalar o ejecutar el proyecto, ver [README](README.md); para entender el código, ver [la guía técnica](docs/README.md).
