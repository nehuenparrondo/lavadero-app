# Guía para leer y mantener la app

## Arquitectura y lectura inicial

src/app/_layout monta proveedores y RootNavigation. Las rutas de src/app delegan
en screens; cada pantalla compone organismos y consume hooks. Los servicios de
api/services encapsulan HTTP. El [mapa completo](source-map.md) permite recorrer
todos los archivos; el [catálogo de componentes](components.md) incluye props y ejemplos.

| Capa                  | Responsabilidad                         | Evitar                                         |
| --------------------- | --------------------------------------- | ---------------------------------------------- |
| app / navigation      | Rutas, grupos y guardas de sesión       | Consultas de negocio en layouts                |
| screens               | Composición de una experiencia          | SQL, HTTP directo o reglas contables           |
| organisms             | Una tarea visual completa               | Copiar estado que ya controla un hook          |
| molecules             | Campos, tarjetas, indicadores y layouts | Permisos concedidos por la apariencia          |
| atoms                 | Texto, botones, entrada, íconos, carga  | Dependencia del dominio o de la red            |
| hooks                 | Consulta, selección, filtros y acciones | Secretos de proveedores o precios de confianza |
| api/services          | Contrato HTTP y serialización           | Conocer componentes o rutas visuales           |
| theme / types / utils | Vocabulario, tokens y transformaciones  | Imports del repositorio backend                |

## Sesión y separación de roles

AuthContext publica una única sesión en memoria y su fase restoring.
useSessionRestore restaura el refresh y descarta el resultado después del desmontaje.
sessionActions persiste antes de publicar al aceptar acceso. Al cerrar sesión elimina
primero el estado local, luego intenta revocar en el backend; un fallo remoto no
devuelve la sesión local, aunque la revocación remota pueda esperar al vencimiento.

api/client añade el access y comparte una sola renovación entre peticiones concurrentes.
Reintenta cada 401 una sola vez. renew comprueba que el refresh original siga siendo
el actual antes de publicar; una respuesta tardía no puede restaurar la sesión cerrada.
El transporte público de autenticación no lleva ese interceptor para evitar recursión.
En nativo el refresh usa SecureStore; en web sessionStorage conserva el refresh dentro
del almacenamiento del navegador. No hay secretos OAuth en el cliente.

RootNavigation conserva montado el navegador y usa /loading durante la restauración.
Sus guardas separan cliente, empleado, administración y reserva asistida.
WorkspaceFrame adapta navegación/presentación; no concede permisos.
El servidor vuelve a comprobar rol, propiedad y asignación en todas las operaciones.

## Portadas y sistema visual

Cliente: HomeScreen compone saludo, BookingInvitation, ClientQuickActions y ClientVisitList.
useHome ordena las próximas tres visitas de la lista autorizada.
Empleado: EmployeeAgendaScreen tiene composición propia, resumen por fecha, filtros,
trabajos asignados e historial. useAgendaResources consulta el resumen solo en la agenda.
Administrador: DashboardScreen reúne reporte diario, solicitudes globales pendientes y
actividad semanal. Los recursos y su recarga se coordinan en useDashboard.

La paleta central define superficies, azul de acción, navegación oscura y acento.
No copiar colores de marca en pantallas nuevas. Los gráficos incluyen cifras textuales,
sin fabricar ingresos, porcentajes de crecimiento o datos para decorar estados vacíos.
Los valores no disponibles se representan con un guion; error/carga no significan cero.

useWorkspaceLayout ajusta breakpoints por ancho y escala de fuente:
dos columnas desde 720 puntos efectivos y barra lateral desde 1100.
En móvil cliente/equipo tienen pestañas inferiores; administración tiene menú completo.
roleNavigation es el catálogo común del menú administrativo y la barra lateral.
Los tabs móviles declaran también los nombres reales de sus archivos de ruta.
Screen ofrece áreas seguras y una sola región desplazable. No bloquear orientación.

AppIcon usa trazos SVG locales sobre una grilla común; WashIllustration es decorativa.
No necesita fuentes descargadas ni imágenes externas. React Native SVG se instala con
la versión compatible de Expo. Cada build nativo debe incluir esa dependencia.
El tema sigue el sistema o la preferencia persistida y todas las superficies usan
la misma paleta. Mantener nombres accesibles, foco y áreas táctiles al modificar botones.

## Lecturas, errores y actualización

useRemoteData serializa filtros para identificar la consulta. sequence impide que
una respuesta de un filtro anterior o de un consumidor desmontado publique su resultado.
Es cancelación lógica: no aborta necesariamente HTTP. Conserva datos previos durante
actualización; no mostrar esos datos como un resultado confirmado de la nueva consulta.
enabled impide pedir disponibilidad antes de contar con la selección mínima.

usePagedList reinicia página al cambiar filtros. CollectionState distingue carga
inicial, error con reintento y lista vacía. No usar un array vacío como sustituto de
un error de red. useAppointments recarga lista y resumen personal juntos.
El resumen se oculta mientras carga o falla para no atribuir cifras a otra fecha.

useAction captura errores y devuelve undefined al fallar. Solo navegar, cerrar
diálogo o renovar claves después de recibir un resultado distinto de undefined.
useEntityManager conserva fetchError aparte del error de guardado. Así una mutación
fallida no elimina una colección ya cargada ni oculta el formulario que debe corregirse.

## Reserva y cobro

useBookingSelection invalida slot al cambiar titular, vehículo, servicios o fecha.
Cambiar titular también limpia vehículo/servicios; cambiar vehículo limpia servicios.
useBookingResources ofrece vehículos del titular y servicios con tarifa para su tipo.
La cotización de availability viene del backend; la UI solo presenta total y duración.
useBookingSubmit no envía precio como fuente de verdad. Si pierde el horario,
limpia la selección de inicio y vuelve a consultar disponibilidad.

useAppointmentFlags conserva la selección administrativa y la apertura de diálogos; useAppointmentDetail calcula canCancel y canPay para los controles. Las mutaciones siempre
se envían al backend. El detalle usa el importe solo si la proyección lo incluye:
ausencia por falta de permiso no es un precio de cero.
useAppointmentPayment mantiene su UUID de idempotencia entre reintentos y lo renueva
después de confirmar. pesosToCents transforma la entrada monetaria sin usar cálculos
decimales de pantalla como saldo contable. El servidor vuelve a comprobar saldo/permiso.

## OAuth en web y nativo

Los archivos .web seleccionan el retorno de navegador. La solicitud temporal conserva
state, verifier y momento en sessionStorage de la misma pestaña. pendingOAuth valida
forma, coincidencia, reloj y vencimiento antes del canje. No omitir state ni PKCE.
Nativo usa AuthSession y el retorno lavadero://oauth de una compilación propia.
Expo Go no permite validar este retorno OAuth; consultar la guía de iPhone/instalación.

useSocialExchange comparte el canje y la confirmación de una cuenta local.
OAUTH_LINK_REQUIRED abre la contraseña local; no se vincula solo por coincidir el correo.
La contraseña permanece en el formulario mientras se envía y no se persiste como perfil.
SocialLogins muestra carga al consultar proveedores y permite reintentar un fallo.

## Formularios, unidades y mantenimiento

EntityForm usa React Hook Form y esquemas generados desde definiciones; el backend
valida otra vez. Los DTOs son independientes del backend y documentan campos sensibles
o unidades. La API transporta centavos ARS e instantes UTC; format los presenta en
pesos y zona de Buenos Aires. El formato monetario de resumen redondea visualmente
sin modificar los centavos guardados. No convertir ese texto de vuelta a dinero.

Para cambiar una pantalla, modificar el hook si cambia comportamiento, la molécula
si cambia una pieza reusable y theme si cambia el sistema visual. Extraer por
responsabilidad, no solamente para acortar líneas. Evitar dependencias circulares,
incluidas referencias de tipos desde el dominio hacia componentes.

Ejecutar npm run check antes de entregar y exportar web/Android cuando cambia UI
o una dependencia nativa. La auditoría limita src a 149 líneas por archivo y 30
por cuerpo de función, exige TSDoc público y prohíbe HTTP directo en screens/components.
Probar las tres experiencias en móvil y escritorio, incluido menú, formulario, error,
estado vacío y tema oscuro. Una exportación no equivale a ejecución en teléfono.

## Actualizar documentación

npm run docs:source regenera el mapa y las tablas por carpeta a partir del TSDoc.
npm run docs:components regenera props y ejemplos. Corregir primero los comentarios
en su fuente y luego regenerar. La explicación de invariantes y decisiones de esta
guía se mantiene a mano cuando cambia un caso de uso.
