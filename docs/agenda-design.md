# Reserva y agenda actualizadas automáticamente

Las tres experiencias comparten tarjetas, tipografía y controles de selección. Los grupos calculan columnas según su ancho real y mantienen el mismo ancho y altura mínima por opción. El nombre del servicio se separa de su precio y duración.

La reserva tiene dos pasos: categoría/servicios y fecha/horario. El resumen muestra la cotización enviada por el servidor y el botón final. Se elige como máximo un lavado; encerado y tapizados son adicionales independientes. Se eliminó la opción «Sin lavado base». Tocar nuevamente un lavado seleccionado lo desmarca, por lo que tapizados sigue disponible por separado. La moto conserva exclusivamente Lavado $15.000.

`TimeWheel` muestra cinco filas y centra la selección con ajuste de desplazamiento. Usa gestos táctiles en iPhone/Android y rueda del mouse en web; las filas y botones anterior/siguiente permiten elegir sin arrastrar. Siempre recibe los horarios libres de la API y nunca genera horas por su cuenta. Una selección ocupada o vencida no se puede confirmar.

`Screen` consulta cambios cada 15 segundos mientras está visible y al regresar a la ruta o aplicación. La disponibilidad se consulta cada 10 segundos. Las pantallas usan `revalidate` para conservar los datos y formularios del mismo filtro mientras llega la respuesta. No hay botones de actualizar ni recarga al tirar del contenido. Las acciones de guardar vuelven a consultar inmediatamente. Las consultas se suspenden al salir o pasar a segundo plano y no se solapan.

La agenda del equipo muestra búsqueda por patente y accesos a Hoy/Todas las fechas. Administración agrega Nuevas solicitudes/Por verificar y un panel de filtros avanzados con búsqueda de cliente y empleado. Un acceso rápido limpia los filtros incompatibles anteriores; cambiar un filtro reinicia la paginación.

El tablero administrativo consulta `queue=requested`: turnos pendientes o confirmados, sin fecha implícita, ordenados por creación descendente. El enlace abre esa misma bandeja. Al comenzar un lavado deja de pertenecer a nuevas solicitudes y conserva su seguimiento en la agenda.

La consulta automática muestra cambios en esos intervalos; no es una conexión instantánea por WebSocket. El servidor vuelve a comprobar el horario, capacidad y permisos dentro de la transacción al confirmar cualquier operación.
