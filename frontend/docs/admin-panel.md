# Cambios del panel administrativo

La estructura de navegación se conserva. **Auto sin turno** reemplaza la reserva asistida del tablero y tiene acceso propio en el menú. Pide patente, categoría y servicios; contacto y observaciones se despliegan solo si hacen falta. La cotización visible es una estimación del primer cupo de hoy. La confirmación muestra el horario y precio que el servidor guardó realmente. “Registrar otro auto” crea una nueva clave y limpia los datos personales; evita duplicar un ingreso al reintentar por un problema de conexión.

`WalkInScreen` compone tres organismos (`WalkInVehicle`, `WalkInServices`, `WalkInConfirmation`). Los hooks separan selección, consulta y acciones de guardado. Las pantallas no hacen solicitudes HTTP directamente. El formulario no exige cuenta ni selección de vehículo del garaje, y el equipo recibe patente y observaciones guardadas. Los autos presenciales se identifican como “Sin turno” en sus tarjetas.

**Usuarios** ofrece “Agregar usuario”, con Cliente y Empleado como únicas opciones. Al editar no hay selector de rol ni contraseña inicial. El permiso de cobros se ofrece únicamente a empleados. La creación de administrador también se rechaza en el servidor. El formulario valida que las opciones elegidas pertenezcan a las opciones mostradas.

**Servicios y precios** muestra acciones explícitas “Editar servicio”, “Editar precios” y “Eliminar servicio”. La confirmación de baja recuerda que se conserva el historial. El editor de categorías de vehículos continúa en Configuración.

**Asistencia** muestra la explicación oficial cuando no se puede fichar. Los botones se deshabilitan en días cerrados, fuera de horario y al consultar fechas históricas. El servidor vuelve a comprobar todo al guardar, aunque el horario cambie mientras la pantalla está abierta.

**Resumen y Reportes** usan `RevenueByWeek` y `PopularServices`, apoyados en la barra común `ProgressBar`. Ingresos se agrupan por semana y demanda de servicios muestra cantidades. Los ceros son barras vacías y siempre se presenta el valor en texto. El mes es la selección inicial para comparar semanas. No se muestra rendimiento del equipo.

El perfil administrativo ya no incluye el apartado Apariencia. El botón flotante de claro/oscuro permanece. En Turnos se retiró el acceso rápido “Por verificar”; el circuito de revisión de lavados sigue disponible desde su bandeja y el detalle, para que Administración pueda comprobar lo realizado.

La actualización automática no borra datos en edición ni modifica el formulario al recibir otros registros. No se agregaron dependencias nativas: se mantiene compatibilidad de módulos con Expo Go. La validación automática incluye tipos, lint, pruebas y límites de modularidad; las comprobaciones visuales usan escritorio y ancho de iPhone con datos de desarrollo.
