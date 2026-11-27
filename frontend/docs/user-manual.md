# Manual de usuario — Lavadero

La misma app muestra una experiencia distinta según el rol asignado por el servidor.
Las capturas provienen de la versión web conectada a la API publicada. Se revisaron
anchos de teléfono y paisaje; no son capturas de un teléfono físico.

## Reserva y administración actuales

La disponibilidad se elige con una rueda de horarios libres. Después de elegir una hora, tocá **Guardar** para agregarla a **Tu reserva**. En escritorio se muestra el resumen de arriba a la derecha; en teléfono la pantalla te lleva al resumen debajo del formulario. Revisá fecha, hora, servicios y precio, y tocá **Confirmar reserva** para crear el turno. Guardar solo prepara el resumen: el horario queda reservado después de confirmar y recibir la respuesta del servidor. Si cambiás la fecha, el tipo, los servicios o la hora, volvé a guardar el horario.

Las agendas y bandejas se actualizan automáticamente. Las capturas siguientes corresponden a las versiones anteriores del selector; las imágenes posteriores se conservan como referencia de los recorridos.

![Rueda de horarios disponibles](images/redesign-wheel-final.png)

![Solicitudes nuevas en Administración](images/redesign-admin-final.png)

![Filtros de turnos](images/redesign-filters-final.png)

## Interfaz actual

La portada de cada rol tiene una composición propia y comparte el mismo sistema
visual. En escritorio se usa la barra lateral; en teléfono Cliente/Empleado usan
pestañas inferiores y Administración usa el botón de menú de la cabecera.

![Inicio del cliente](images/diseno-cliente-escritorio.png)

![Agenda del empleado](images/diseno-empleado-escritorio.png)

![Tablero administrativo](images/diseno-admin-escritorio.png)

Las capturas funcionales de los recorridos siguientes provienen también de las
pruebas anteriores. Sus controles conservan la función; la apariencia vigente
se muestra en estas portadas. Ver REDISENO-Y-DOCUMENTACION.md para la revisión actual.

## Acceso e instalación

Abrí https://lavadero-app-2558.onrender.com o instalá el APK Android de la entrega.
En Android abrí el archivo descargado y seguí la autorización de instalación que
muestre el dispositivo. El APK funciona sin la computadora ni Metro.
Las credenciales iniciales están en el archivo privado de acceso, separado del código.

Para una cuenta nueva elegí **Creá tu cuenta**, completá nombre, apellido, email,
teléfono opcional y contraseña. La cuenta se crea como Cliente. El Administrador puede crear cuentas de Cliente o Empleado; la edición no permite cambiar el rol. No existe elección pública de rol.
Google, Discord y GitHub abren el navegador del sistema en una compilación nativa actualizada; en web se usa la misma pestaña. Revisá el consentimiento,
autorizá y volvé a la app. Si el correo ya tiene una cuenta con contraseña, confirmala una vez para vincular el mismo perfil. No uses Expo Go para evaluar ese retorno.

![Ingreso y tema oscuro](images/login-publicado.png)

La sesión permanece al cerrar y volver a abrir, para Cliente, Empleado y Administrador. Se renueva mientras se usa la aplicación y vence tras 30 días sin renovación o cuando el servidor la revoca. **Cerrar sesión** elimina el acceso guardado; en web cierra también las otras pestañas del mismo navegador y sitio. En equipos compartidos, cerrá sesión al terminar. El modo privado o borrar datos del navegador puede eliminar esta persistencia.

## Cliente

### Vehículos y servicios

Entrá a **Vehículos → Agregar vehículo**. Completá patente única, marca, modelo,
color y tipo. Podés corregir datos desde Editar. Para eliminar, confirmá la baja;
si el vehículo tiene un turno activo, antes debés cancelarlo o finalizarlo.
El borrado conserva el historial. La patente sigue reservada por trazabilidad.

![Vehículos del cliente](images/cliente-vehiculos.png)

En **Servicios** elegí el tipo de vehículo y consultá descripción, duración y precio.
Los ejemplos duran 30, 35 o 40 minutos; contratar varios suma sus duraciones.
Las tarifas vigentes se consultan por servicio y tipo de vehículo. El administrador las puede cambiar en **Servicios y precios**. Las reservas existentes conservan el precio pactado.

### Reserva y cancelación

En Inicio elegí **Reservar mi lavado**. Seleccioná el tipo de vehículo, el lavado y los extras que quieras, y luego la fecha y el horario disponible con la rueda. Arrastrá la rueda o usá Anterior/Siguiente; la fila central indica la hora elegida. La app muestra el total en pesos argentinos y la duración estimada antes de confirmar. Atención inicial: lunes a sábado 09:30–16:30, un auto a la vez.
Elegí un solo lavado base. El encerado cuesta $15.000 y se combina con exterior o completo. La limpieza de tapizados cuesta $20.000 y también se puede pedir por separado. Para moto solo se ofrece **Lavado** por $15.000, con una duración inicial de 35 minutos.

La grilla propone inicios cada 5 minutos; no implica que cada lavado dure 5 minutos.

![Cotización y horarios](images/cliente-reserva.png)

El turno queda **Confirmado** automáticamente y ocupa el horario desde ese momento. En el detalle pulsá **Agregar vehículo al turno** y cargá los datos, o vinculá uno ya registrado del mismo tipo. La agenda muestra la reserva aunque falte vincular el vehículo. Abrí el detalle para ver el empleado asignado y guardar una descripción del vehículo antes de que comience el trabajo. Si todavía no hay un empleado libre, el turno aparece **Por asignar**.
En **Mis turnos** consultá Próximos/Pasados y abrí una tarjeta para ver su detalle.
La cancelación propia está disponible en Pendiente/Confirmado con más de 120 minutos
de anticipación, salvo que el Administrador cambie esa política.
El lavado base y los extras tienen botones de tamaño uniforme. Para quitar un servicio seleccionado, tocá su botón otra vez. La cera y los tapizados son extras; no se pueden combinar dos lavados base.

La app actualiza los horarios cada 10 segundos mientras la pantalla de reserva está visible y al volver a ella. Si alguien confirma el mismo horario antes que vos, la app te avisa y vuelve a consultar las opciones. Solo se acepta una reserva para cada hora de inicio.

### Comprobante

Cuando Administración verifica el trabajo aparecen **Ver comprobante** y el formulario de devolución. En **Reclamos y respuestas** podés mandar un reclamo general y consultar la respuesta. Muestra servicios contratados,
precio histórico y cobros registrados. Es comprobante del servicio, no factura fiscal.
También podés consultar las observaciones del trabajo y el saldo.

![Comprobante de lavado](images/cliente-comprobante.png)

## Empleado

**Mi agenda** abre la fecha actual; cambiá el filtro para otra jornada.
Aparecen todos los turnos del equipo, con vehículo, color, servicios y horario. Buscá por patente para consultar cualquier fecha, o elegí un día para ver la jornada. La agenda se actualiza automáticamente cada 15 segundos mientras está visible, sin pulsar botones.
El resumen de jornada distingue finalizados y pendientes. **Historial** muestra trabajos
cerrados. No se ofrecen usuarios, configuración ni reportes de ingresos del negocio.

![Agenda compartida](images/agenda-compartida-1.2.png)

El responsable abre el detalle y pulsa **Comenzar lavado**. Si está habilitado para cobrar, registra el total, describe qué hizo y pulsa **Finalizar lavado** durante el horario laboral: queda finalizado directamente. Los empleados sin permiso de cobros conservan **Enviar a verificación**, y Administración puede aprobar o devolver esos partes. Siempre queda registrado el responsable y su descripción.

![Trabajo y observaciones](images/empleado-trabajo.png)

Si un Administrador habilitó tus cobros, aparece **Registrar cobro** durante el trabajo
o al finalizar. Indicá importe en pesos, efectivo/transferencia y referencia opcional.
La app impide superar el saldo y el servidor evita duplicados al reintentar un envío.
Esto registra un pago realizado fuera de la app: no envía ni transfiere dinero.

La pantalla se adapta al girar el dispositivo:

![Vista horizontal](images/empleado-paisaje.png)

## Administrador

Abrí el menú **☰** para ir a Tablero, Turnos, Usuarios, Servicios y precios,
Reportes, Configuración y Perfil. Desde el tablero también administrás vehículos.

### Usuarios y catálogo

En **Usuarios** buscá por nombre/email o filtrá por rol. Podés crear, editar,
activar/desactivar y habilitar cobros a empleados. Al crear elegís Cliente o Empleado; al editar no se cambia el rol ni se ofrece Administrador. La eliminación es lógica.
Cambiar datos administrativos o contraseña puede cerrar sesiones del usuario.
No podés eliminarte, desactivarte ni quitarte el rol; siempre queda un admin activo.

![Administración de usuarios](images/admin-usuarios.png)

En **Servicios y precios** creá o editá nombre, descripción, duración y disponibilidad.
Usá Precios para definir la tarifa de cada tipo de vehículo. No cambian reservas ya
contratadas. Los tipos se gestionan desde Configuración.

### Turnos, pagos y reportes

En **Turnos** filtrá fecha, estado, cliente y empleado. Podés crear una reserva para
un cliente que llama por teléfono. La reserva se confirma automáticamente para todo el equipo. La app asigna automáticamente a un empleado activo disponible. Podés reasignar antes del inicio. En **Resumen → Verificar lavados** revisá el parte, inspeccioná el auto y confirmá el trabajo en horario de atención o devolvelo con un motivo.
Podés corregir estados, rechazar/cancelar y registrar observaciones o pagos.

![Asignación de empleado](images/admin-asignacion.png)

En **Reportes** elegí día, semana o mes y fecha de referencia. Consultá lavados,
ingresos por semana y servicios pedidos con barras de cantidad. Los ingresos se cuentan por fecha real de
registro del pago; los trabajos por su fecha de atención, por eso pueden diferir.

### Configuración y perfil

La configuración guarda días abiertos, apertura/cierre, capacidad, anticipación para
cancelar y separación de horarios ofrecidos. Los cambios rigen para nuevas reservas;
las existentes conservan su fecha y valores contratados.

![Configuración del negocio](images/admin-configuracion.png)

Cada rol dispone de Perfil para nombre, apellido, teléfono y foto mediante enlace HTTPS.
Las cuentas con contraseña local pueden cambiarla indicando la actual. Los tres perfiles usan únicamente el botón flotante para alternar Claro/Oscuro; ya no muestran el apartado Apariencia. Para salir, tocá el ícono de puerta con flecha arriba a la derecha, junto a **Mi perfil**. Elegí **Sí, cerrar sesión** para borrar el acceso guardado o **Seguir en mi cuenta** para conservarlo. Cerrar el diálogo también conserva la sesión. En web, confirmar la salida cierra las otras pestañas del mismo sitio y perfil del navegador.

![Perfil y tema claro](images/perfil-claro.png)

## Demostración y problemas frecuentes

La base incluye Cliente Demo y Empleado Demo, un Toyota Etios DE123MO y un turno/pago
identificados como demostración. El cobro de referencia **DEMO - SIN MOVIMIENTO DE DINERO**
es ficticio. Esos registros permiten evaluar los flujos; no son operaciones del negocio.

- Render Free puede tardar al despertar. Esperá la primera carga y usá Reintentar.
- Sin horarios: revisá fecha, día abierto y duración; varios servicios pueden exceder la jornada.
- Sesión vencida: volvé a ingresar. Cambios de rol/contraseña revocan permisos anteriores.
- Permiso insuficiente o recurso ajeno: ingresá con la cuenta/rol correspondiente.
- Un proveedor social puede tardar en aplicar su configuración; el estado exacto figura en entrega.

## Si usás iPhone

Abrí la versión web en Safari. El APK entregado es para Android; Expo Go no valida el retorno OAuth con scheme propio. Ver PROBAR-EN-IPHONE.md en la entrega o docs/iphone-expo-go.md en el repositorio.

## Controles comunes — versión 1.2.0

El botón de tema flota abajo a la derecha en todas las vistas y diálogos. A su lado aparece Volver arriba solo después de desplazarse en páginas largas. La preferencia se conserva y Perfil permite seguir el sistema.

Tocá tu nombre/avatar arriba a la derecha o abajo a la izquierda en la barra lateral para abrir tu perfil. En teléfono se muestra un avatar compacto en el encabezado.

![Controles flotantes](images/controles-flotantes-1.2.png)

![Perfil móvil](images/perfil-movil-1.2.png)

## Atención y asistencia

- En **Reclamos y devoluciones** ves el mensaje, el turno, el responsable y lo que hizo cuando corresponda. **Responder** envía la respuesta al cliente y cierra el caso.
- En **Asistencia** pulsá **Fichar llegada** cuando veas llegar al empleado. Se guarda la primera hora del día y quién hizo el fichaje. Usá la fecha para consultar el historial.
- El personal se registra desde el ingreso. En **Usuarios** buscá su cuenta y editá el rol a **Empleado**. El empleado vuelve a iniciar sesión para entrar a su agenda.

### Tipos de vehículo y tarifas

En **Vehículos**, Administración puede registrar un vehículo para un cliente y crear un tipo con sus tarifas por servicio desde **Agregar tipo y tarifas**. Las tarifas se aplican a los próximos turnos de ese tipo. En **Editar** se pueden ajustar los importes.

## Bandejas y actualización automática

En Administración, **Lavados pendientes** muestra las solicitudes recién creadas en primer lugar, aunque sean para otro día. Abrí Nuevas solicitudes para ver la bandeja completa. Usá Hoy o Todas las fechas y la búsqueda por patente para cambiar de recorrido. Más filtros permite buscar cliente, empleado y estado sin listas enormes.

Las pantallas con datos consultan automáticamente mientras están visibles y al volver a ellas; ya no hay botones Actualizar. Los formularios abiertos conservan lo que estás escribiendo. La reserva consulta cada 10 segundos y las agendas cada 15.

## Cancelaciones y observaciones

Si el lavadero cancela tu reserva, Inicio muestra **Tu turno fue cancelado**, la fecha, el vehículo y el motivo completo. El aviso aparece automáticamente mientras usás Inicio y al volver a la pantalla. **Ver turno** abre el detalle sin descartarlo; **Entendido** guarda que lo leíste. El motivo sigue disponible en el detalle aunque cierres sesión.

Al cancelar, escribí un motivo concreto: es obligatorio y admite hasta 500 caracteres. Las observaciones del trabajo se escriben en un campo de varias líneas, con contador de hasta 2000 caracteres, y se muestran con autor y fecha después de guardarlas. La actualización automática no borra un borrador cuando otra persona agrega una observación.

Se mantiene la estructura y navegación por rol. Se mejoraron las superficies, botones, campos de entrada y mensajes en los temas claro y oscuro.

### Auto sin turno y asistencia laboral

En el menú o el resumen administrativo abrí **Auto sin turno**. Cargá patente, tipo y servicios. Si hace falta, desplegá contacto y observaciones. Registrá la llegada: aparece la confirmación con horario y precio. No exige que el auto esté en el garaje ni que el cliente tenga cuenta; los datos se guardan y el equipo lo encuentra por patente. El sistema respeta las reservas existentes, evita duplicados y busca lugar para hoy dentro de la jornada. **Registrar otro auto** limpia los datos del cliente anterior.

Para cancelar es obligatorio escribir un motivo; queda guardado y el cliente registrado recibe el aviso en Inicio. En **Asistencia**, fichá cuando veas llegar al empleado, solo en día y hora laboral. Fuera de horario los botones están deshabilitados y se muestra la explicación. Las fechas anteriores permiten consultar los fichajes.

En cada servicio usá **Editar servicio**, **Editar precios** o **Eliminar servicio**. La baja conserva los datos de los turnos anteriores. Los gráficos del resumen comparan semanas del mes; en Reportes podés elegir otro período. Después de registrar el cobro, el empleado puede finalizar directamente el lavado durante el horario laboral; no necesita aprobación posterior.

## Cliente y empleado: agenda y cierre actualizados

Para reservar, elegí una fecha en el calendario y una hora libre; no viene seleccionado el día de hoy. El calendario se adapta a pantallas chicas y horizontales y tiene el cierre arriba.

El tacho junto a Tus turnos activos limpia las tarjetas del Inicio después de confirmar. Las reservas conservan su vigencia en Mis turnos. Próximos muestra solo confirmados de hoy o de días futuros; los anteriores se consultan en Pasados.

Mi agenda del empleado muestra únicamente los pendientes de Hoy. Mi historial conserva todas las fechas y el buscador por patente. Tras cobrar el total, el responsable describe el trabajo y pulsa Finalizar lavado: queda Finalizado directamente y sale de Hoy, sin aprobación administrativa. El sistema comprueba el horario laboral y conserva quién hizo el trabajo.

Al enviar un reclamo llega a Pendientes del administrador. El resumen muestra el contador de casos abiertos y un acceso directo; la bandeja se actualiza sola. La respuesta vuelve al cliente.
